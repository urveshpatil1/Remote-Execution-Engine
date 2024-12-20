import { Router, Request, Response } from "express";
import { authenticateJwt } from "../middlewares/auth";
import { PrismaClient } from "@prisma/client";

const problemsRouter = Router();
const prisma = new PrismaClient();

/* GET - Problems */
problemsRouter.get(
  "/problems",
  authenticateJwt,
  //   validate(ProblemsSchema),
  async (req: Request, res: Response) => {
    /* Page starts from 0 */
    const { page, pageSize } = req.query;

    if (page && pageSize && Number(pageSize) > 0) {
      let queryOptions = {
        skip: Number(page) * Number(pageSize),
        take: Number(pageSize),
      };
      /* If page is 0 then skip will be 0, this is because DataGrid sets 1st page as 0 */
      if (page && Number(page) === 0 && pageSize && Number(pageSize) > 0) {
        queryOptions = {
          skip: 0,
          take: Number(pageSize),
        };
      }
      try {
        const totalProblems = await prisma.problems.count();

        const problemsList = await prisma.problems.findMany(queryOptions);
        if (problemsList && problemsList.length > 0) {
          res
            .status(200)
            .json({ message: "Data fetched successfully", totalProblems, data: problemsList });
        } else {
          res.status(404).json({ message: "No problems found" });
        }
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
);

/* GET - Problems by id */
problemsRouter.get("/problem/:id", authenticateJwt, async (req: Request, res: Response) => {
  const problemId = req.params.id;
  const problem = await prisma.problems.findFirst({ where: { id: problemId } });
  if (!problem) {
    return res.status(404).json({ error: "problem not found" });
  }

  res.status(200).json(problem);
});

/* POST - Submissions */

/* ADMIN - create questions */
// adminRouter.post('/admin/questions')

export default problemsRouter;
