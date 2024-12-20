import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middlewares/auth";

/* This function is used to generate a jwt token */
export function generateJwt(user: { email: string; password: string }) {
  const payload = { email: user.email, password: user.password };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

/**
 * The function `extractOutput` takes a string as input, decodes it from binary to UTF-8, removes any
 * non-printable ASCII characters, and returns the trimmed output.
 */
export function extractOutput(result: string) {
  const decodedResult = Buffer.from(result, "binary").toString("utf-8");

  const finalOutput = decodedResult.replace(/[^\x20-\x7E]/g, "");
  return finalOutput.trim();
}
