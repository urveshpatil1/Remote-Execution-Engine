import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

/* This is the secret used to verify the jwt token */
const SECRET_KEY = "s3cr3tk3333y";

/* This middleware is used to verify the jwt token */
const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err: jwt.VerifyErrors | null, user: any) => {
      if (err) {
        return res.status(403).send({ message: 'Invalid token' });
      }
      next();
    });
  } else {
    res.status(401).send({ message: "Unauthorized!" });
  }
};

export { authenticateJwt, SECRET_KEY };
