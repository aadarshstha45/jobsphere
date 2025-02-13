import jwt, { JwtPayload } from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import Token from "../models/token";
import User from "../models/user";
import { APIResponse } from "../utils/response";
import { Status } from "../utils/response/type";

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthenticatedRequest extends Request {
  user?: any | null;
}

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return APIResponse({
      res,
      statusCode: 401,
      status: Status.FAILURE,
      error: "Authorization token is required.",
    });
  }
  const token = authorization.split(" ")[1];
  const validToken = await Token.findOne({
    where: {
      token,
    },
  });

  if (!validToken) {
    return APIResponse({
      res,
      statusCode: 401,
      status: Status.FAILURE,
      error: "You are not authorized to access this resource.",
    });
  }

  try {
    if (JWT_SECRET) {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const { id } = decodedToken as JwtPayload;
      if (!id) {
        return APIResponse({
          res,
          statusCode: 401,
          status: Status.FAILURE,
          error: "You are not authorized to access this resource.",
        });
      }
      const user = await User.findByPk(id);
      req.user = user?.toJSON();
      next();
    } else {
      return null;
    }
  } catch (error) {
    return APIResponse({
      res,
      statusCode: 401,
      status: Status.FAILURE,
      error: error.message as string,
    });
  }
};
