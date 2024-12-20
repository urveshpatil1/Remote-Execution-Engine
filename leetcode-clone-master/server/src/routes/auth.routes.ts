import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import validate from "../middlewares/validation";
import { SignInSchema, SignUpSchema } from "../schema";
import { generateJwt } from "../utils";

const authRouter = Router();
const prisma = new PrismaClient();

/* Signup */
authRouter.post("/signup", validate(SignUpSchema), async (req: Request, res: Response) => {
  let { email, password, name, role } = req.body;
  let userFound = await prisma.user.findUnique({ where: { email } });

  if (userFound) {
    return res.status(403).json({ message: "User already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserObj = {
      email,
      password: hashedPassword,
      name,
      role,
    };
    await prisma.user.create({ data: newUserObj });

    res.status(200).send({ message: "User created successfully" });
  }
});

/* Signin */
authRouter.post("/signin", validate(SignInSchema), async (req: Request, res: Response) => {
  let { email, password } = req.body;

  let userFound = await prisma.user.findUnique({ where: { email } });
  if (userFound) {
    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if (passwordMatch) {
      const token = generateJwt({ email, password });
      const userData = {
        name: userFound.name,
        email: userFound.email,
        role: userFound.role,
      }
      res.status(200).json({ message: "Login successful", user: userData, token });
    } else {
      res.status(403).json({ message: "Invalid username or password" });
    }
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

export default authRouter;
