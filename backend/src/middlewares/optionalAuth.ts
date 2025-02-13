import { NextFunction, Request, Response } from "express";
import { requireAuth } from "../middlewares";

const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    return requireAuth(req, res, next);
  }
  next();
};

export { optionalAuth };
