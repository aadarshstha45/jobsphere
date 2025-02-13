import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/requireAuth";
import { Application, BookMarkedJobs, User } from "../models";
import JobSeeker from "../models/jobseeker";
import extractFieldErrors from "../utils/fieldErrors";
import { APIResponse } from "../utils/response";
import { Status } from "../utils/response/type";
import { socialMediasURLS } from "../utils/socialMedia";

const getUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.user;
    let includeModel = [];

    if (req.user.userType === "jobseeker") {
      includeModel = [
        {
          model: JobSeeker,
          required: false,
        },
      ];
    }
    const user: any = await User.findByPk(id, {
      include: includeModel,
    });
    if (!user) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 404,
        error: "User not found",
      });
    }
    const jobSeeker = user.jobseeker.toJSON();
    const socialMedia = socialMediasURLS(jobSeeker);
    // Destructure user data and use the rest operator to exclude social media links
    const { facebook, twitter, instagram, youtube, linkedin, ...userData } =
      jobSeeker;

    return APIResponse({
      res,
      status: Status.SUCCESS,
      statusCode: 200,
      data: {
        ...user.toJSON(),
        jobseeker: {
          ...userData,
          socialMedia,
        },
      },
      message: "User fetched successfully",
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

const getJobseekerStats = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user;

  try {
    const jobseeker = await JobSeeker.findOne({
      where: {
        userId: id,
      },
    });

    const jobseekerId = jobseeker.getDataValue("id");

    const applications = await Application.count({
      where: { jobseekerId },
    });
    const savedJobs = await BookMarkedJobs.count({
      where: { userId: id },
    });

    return APIResponse({
      res,
      data: {
        applications,
        savedJobs,
      },
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Jobseeker stats fetched successfully",
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

const updateJobseeker = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user;
  const transaction = await User.sequelize.transaction();
  let profilePicture = req.file ? req.file.path : null;

  try {
    const jobseeker: any = await JobSeeker.findOne({
      where: {
        userId: id,
      },
    });
    if (!jobseeker) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 404,
        error: "Jobseeker not found",
      });
    }

    if (req.body.name) {
      await User.update(
        {
          name: req.body.name,
        },
        {
          where: {
            id,
          },
          transaction,
        }
      );
    }

    let data = null;
    if (profilePicture) {
      data = await jobseeker.update(
        {
          ...req.body,
          profilePicture,
        },
        { transaction }
      );
    } else {
      data = await jobseeker.update(
        {
          ...req.body,
        },
        { transaction }
      );
    }
    await transaction.commit();
    return APIResponse({
      res,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Company updated successfully",
      data,
    });
  } catch (error) {
    const fieldErrors = extractFieldErrors(error);

    APIResponse({
      res,
      status: Status.FAILURE,
      statusCode: 500,
      message: "Internal server error",
      error: fieldErrors ?? error.message,
    });
  }
};

export { getJobseekerStats, getUser, updateJobseeker };
