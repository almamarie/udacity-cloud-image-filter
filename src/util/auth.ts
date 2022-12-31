import { Request, Response, NextFunction, response } from "express";
import { execPath } from "process";
import { config } from "./config";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({ message: "No authorization headers." });
  }

  const token_bearer = req.headers.authorization.split(" ");
  if (token_bearer.length != 2) {
    return res.status(401).send({ message: "Malformed token." });
  }

  try {
    const response = await fetch(config.dev.AUTH_URL, {
      method: "GET",
      headers: { Authorization: req.headers.authorization },
    });
    const data = await response.json();

    if (!data.auth) {
      return res
        .status(401)
        .send({ auth: false, message: "Failed to authenticate." });
    }
  } catch (error) {
    return res
      .status(401)
      .send({ auth: false, message: "Failed to authenticate." });
  }
  return next();
  // return jwt.verify(token, config.jwt.secret, (err, decoded) => {
  //   if (err) {
  //     return res
  //       .status(500)
  //       .send({ auth: false, message: "Failed to authenticate." });
  //   }
  //   return next();
  // });
}
