import { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    next();
  } catch (exception: unknown) {
    // eslint-disable-next-line no-console
    console.error(exception);
    res.status(500).send({});
  }
};
