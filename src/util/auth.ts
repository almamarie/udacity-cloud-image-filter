import { Request, Response, NextFunction } from "express";
import { config } from "./config";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const image_url = req.query.image_url as string;
  console.log(req.query.image_url);
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({ message: "No authorization header." });
  }

  const token_bearer = req.headers.authorization.split(" ");
  if (token_bearer.length != 2) {
    return res.status(401).send({ message: "Malformed token." });
  }

  console.log(config.dev.AUTH_URL);

  try {
    const response = await fetch(config.dev.AUTH_URL, {
      method: "GET",
      headers: { Authorization: req.headers.authorization },
    });
    const data = await response.json();

    console.log(req.headers.authorization);
    if (!data.auth) {
      return res
        .status(401)
        .send({ auth: false, message: "Failed to authenticate." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send({ auth: false, message: "Failed to authenticate." });
  }
  return next();
}
