import { Router, Request, Response } from "express";
import { authenticateJwt } from "../middlewares/auth";
import validate from "../middlewares/validation";
import { SubmissionCreateSchema } from "../schema";
import { PrismaClient } from "@prisma/client";
import DockerManagerService from "../helper/docker.helper";
import { extractOutput } from "../utils";

const submissionRouter = Router();
const prisma = new PrismaClient();

/* this function is used to start a docker container and execute code in that and then stop the container */
const dockerHelper = async (submission: string, language: string) => {
  const containerName = `container-${language}`;
  const imageName = "node:20-alpine";
  const portBindings = { "3000/tcp": [{ HostPort: "8000" }] };

  const dockerService = new DockerManagerService();

  try {
    await dockerService.createContainer(imageName, containerName, portBindings);
    await dockerService.startContainer();

    const result = await dockerService.executeNodeScript(submission);
    const finalOutput = extractOutput(result);

    return finalOutput;
  } catch (error) {
    console.error("Error in Docker", error);
  } finally {
    /* Docker container will stop when there is nothing left in queue to execute  */ 
    // await dockerService.stopContainer();
  }
};

submissionRouter.post(
  "/submit",
  authenticateJwt,
  validate(SubmissionCreateSchema),
  async (req: Request, res: Response) => {
    const { problemId, submission, language } = req.body;

    const problemFound = await prisma.problems.findUnique({ where: { id: problemId } });
    if (problemFound) {
      try {
        const result = await dockerHelper(submission, language);
        return res.status(200).json({ message: "AC", result });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
      }
    } else {
      return res.status(404).json({ message: "Problem not found" });
    }
  }
);

export default submissionRouter;
