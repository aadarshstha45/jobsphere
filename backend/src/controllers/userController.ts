import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/requireAuth";
import { Application, Company, Job, Token, User } from "../models";
import JobSeeker from "../models/jobseeker";
import extractFieldErrors from "../utils/fieldErrors";
import { APIResponse } from "../utils/response";
import { Status } from "../utils/response/type";
import { createToken } from "../utils/token";
const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, userType } = req.body;
    let type = null;
    if (userType === "jobseeker") {
      type = "jobseeker";
    } else if (userType === "employer") {
      type = "employer";
    }

    const user = await User.create({
      email,
      password,
      name,
      userType: type,
    });
    const { id } = await user.get();
    const token = await createToken(id!);
    let data = null;
    if (type === "employer") {
      const { location, website } = req.body;
      data = await Company.create({
        name,
        location,
        website,
        userId: id,
      });
    } else {
      data = await JobSeeker.create({
        userId: id,
      });
    }
    return APIResponse({
      res,
      data: user,
      status: Status.SUCCESS,
      statusCode: 201,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    const fieldErrors = extractFieldErrors(error);
    return APIResponse({
      res,
      statusCode: 500,
      message: "Internal server error",
      status: Status.FAILURE,
      error: fieldErrors ?? error,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: any = await User.findOne({ where: { email } });

    if (!user) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 404,
        error: "Invalid Credentials",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 401,
        error: "Invalid Credentials",
      });
    }

    const token = await createToken(user.id!);
    return APIResponse({
      res,
      data: user,
      status: Status.SUCCESS,
      statusCode: 200,
      token,
      message: "User logged in successfully",
    });
  } catch (error) {
    const fieldErrors = extractFieldErrors(error);

    return APIResponse({
      res,
      statusCode: 500,
      message: "Internal server error",
      status: Status.FAILURE,
      error: fieldErrors ?? error.message,
    });
  }
};

const changePassword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;

    const user: any = await User.findOne({ where: { id } });
    if (!user) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 404,
        error: "User not found",
      });
    }

    if (user.password !== oldPassword) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 401,
        error: {
          oldPassword: ["Current  password did not match."],
        },
      });
    }

    if (oldPassword === newPassword) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 401,
        error: {
          newPassword: ["New password can not be same as old password."],
        },
      });
    }

    await user.update({ password: newPassword });

    return APIResponse({
      res,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Password changed successfully",
    });
  } catch (error) {
    const fieldErrors = extractFieldErrors(error);

    return APIResponse({
      res,
      status: Status.FAILURE,
      statusCode: 500,
      message: "Internal server error",
      error: fieldErrors ?? (error.message as string),
    });
  }
};

const logoutUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.user;
    const token = await Token.findOne({
      where: { userId: id, token: authorization.split(" ")[1] },
    });

    await token.destroy();
    return APIResponse({
      res,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Logout Successful",
    });
  } catch (error) {
    APIResponse({
      res,
      status: Status.FAILURE,
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const dataCount = async (req: Request, res: Response) => {
  try {
    const jobseekerCount = await User.count({
      where: { userType: "jobseeker" },
    });
    const employerCount = await User.count({
      where: { userType: "employer" },
    });
    const jobCount = await Job.count({
      where: { isActive: true },
    });
    const applicationCount = await Application.count();
    return APIResponse({
      res,
      status: Status.SUCCESS,
      statusCode: 200,
      data: { jobseekerCount, employerCount, jobCount, applicationCount },
      message: "Data count fetched successfully",
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

export { changePassword, dataCount, loginUser, logoutUser, registerUser };
