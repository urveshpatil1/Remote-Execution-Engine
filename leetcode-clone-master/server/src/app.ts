import express, { Express, Router } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import bodyParser from "body-parser";
import problemsRouter from "./routes/problem.routes";
import submissionRouter from "./routes/submission.routes";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

const mainRouter: Router = Router();
mainRouter.use("/", authRouter);
mainRouter.use("/", problemsRouter);
mainRouter.use("/", submissionRouter);

app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
