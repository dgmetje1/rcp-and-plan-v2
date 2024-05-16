import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const errorHandler: ErrorRequestHandler = (
  err: Error & { status?: number },
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.status(err.status || 500).send({ message: "Something went wrong", stack: err.stack });
};
