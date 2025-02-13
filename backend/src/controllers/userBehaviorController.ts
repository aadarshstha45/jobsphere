import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/requireAuth";
import UserBehavior from "../models/userBehavior";
import { APIResponse } from "../utils/response";
import { Status } from "../utils/response/type";

const createUserBehavior = async (req: Request, res: Response) => {
  const id = (req as AuthenticatedRequest).user?.id;
  const { action } = req.body;
  try {
    // Check if the action already exists for the user
    const existingBehavior = await UserBehavior.findOne({
      where: { userId: id, action, jobId: req.body.jobId },
    });
    if (existingBehavior) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 400,
        message: "Action already exists for this user",
      });
    }

    const userBehavior = await UserBehavior.create({
      ...req.body,

      userId: id ?? null,
    });

    // Return success response
    return APIResponse({
      res,
      data: userBehavior,
      status: Status.SUCCESS,
      statusCode: 201,
      message: "User behavior created successfully",
    });
  } catch (error) {
    return APIResponse({
      res,
      status: Status.FAILURE,
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { createUserBehavior };
