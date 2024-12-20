import Docker, { Container } from "dockerode";

/* 
  The DockerManagerService class provides methods to create, start, execute scripts, and stop Docker
  containers. 
*/
class DockerManagerService {
  private docker: Docker;
  private container: Container | null;
  constructor() {
    this.docker = new Docker();
    this.container = null;
  }

  /**
   * The function `pullImage` is a private asynchronous function that pulls a Docker image using the
   * Docker API and returns a promise that resolves when the image is successfully pulled.
   */
  private async pullImage(imageName: string) {
    return new Promise<void>((resolve, reject) => {
      this.docker.pull(imageName, (err: any, stream: any) => {
        if (err) {
          console.error("Error pulling the image:", err);
          reject(err);
          return;
        }
        this.docker.modem.followProgress(stream, (err: any, output: any) => {
          if (err) {
            console.error("Error pulling the image:", err);
            reject(err);
          } else {
            console.log("Image pulled successfully:", imageName);
            resolve();
          }
        });
      });
    });
  }

  /**
   * The function checks if a container with a given name exists and returns true if it does, false
   * otherwise.
   */
  async containerExists(containerName: string) {
    try {
      /* If container exists, return true */
      await this.docker.getContainer(containerName).inspect();
      return true;
    } catch (error: any) {
      if (error.statusCode === 404) {
        return false;
      } else {
        throw error;
      }
    }
  }

  /**
   * The `createContainer` function creates a Docker container with the specified image name, container
   * name, and port bindings, and logs the success or failure of the operation.
   */
  async createContainer(
    imageName: string,
    containerName: string,
    port: { [key: string]: { [key: string]: string }[] }
  ) {
    try {
      const containerAlreadyExists = await this.containerExists(containerName);
      if (containerAlreadyExists) {
        console.log(
          "Container already exists, executing within existing container:",
          containerName
        );
        this.container = this.docker.getContainer(containerName);
      } else {
        await this.pullImage(imageName);
        const container = await this.docker.createContainer({
          name: containerName,
          Image: imageName,
          AttachStdin: false,
          AttachStdout: true,
          AttachStderr: true,
          Tty: true,
          ExposedPorts: { "3000/tcp": {} },
          HostConfig: {
            PortBindings: port,
          },
        });
        this.container = container;
        console.log("Container created successfully:", containerName);
      }
    } catch (error) {
      console.error("Error creating container:", error);
    }
  }

  async startContainer() {
    if (this.container) {
      const containerInfo = await this.container.inspect();
      if (containerInfo.State.Running) {
        console.log("Container is already running.");
      } else {
        console.log("Starting container...");
        await this.container.start();
        console.log("Container started successfully.");
      }
    } else {
      throw new Error("Container not created. Call createContainer() first.");
    }
  }

  async executeNodeScript(script: string): Promise<string> {
    if (this.container) {
      const exec = await this.container.exec({
        Cmd: ["node", "-e", script],
        AttachStdout: true,
        AttachStderr: true,
      });

      const execStream = await exec.start({ hijack: true });

      let finalResult = "";

      // Log the output of the command
      execStream.on("data", (chunk) => {
        finalResult += chunk;
      });

      // Wait for the command to complete
      await new Promise((resolve) => execStream.on("end", resolve));

      return finalResult;
    } else {
      throw new Error("Container not created. Call createContainer() first.");
    }
  }

  async stopContainer() {
    if (this.container) {
      await this.container.stop();
    } else {
      throw new Error("Container not created. Call createContainer() first.");
    }
  }
}

export default DockerManagerService;
