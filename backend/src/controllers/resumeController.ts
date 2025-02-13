import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/requireAuth";
import JobSeeker from "../models/jobseeker";
import Resume from "../models/resume";
import extractFieldErrors from "../utils/fieldErrors";
import { APIResponse } from "../utils/response";
import { Status } from "../utils/response/type";

const createResume = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user;
  try {
    const jobSeeker = await JobSeeker.findOne({
      where: {
        userId: id,
      },
      attributes: ["id"],
    });
    const jobseekerId = jobSeeker.getDataValue("id");

    const resume = req.file ? req.file.path : req.body.resume ?? null;

    // Check the count of resumes for the job seeker
    const resumeCount = await Resume.count({
      where: {
        jobseekerId,
      },
    });

    if (resumeCount >= 5) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 400,
        error: "You can only add up to 5 resumes.",
      });
    }

    const data = await Resume.create({
      title: req.body.title,
      resume,
      jobseekerId,
    });
    return APIResponse({
      res,
      data,
      status: Status.SUCCESS,
      statusCode: 201, // Add the statusCode property
      message: "Resume added successfully.",
    });
  } catch (error) {
    const fieldErrors = extractFieldErrors(error);
    return APIResponse({
      res,
      status: Status.FAILURE,
      statusCode: 500,
      error: fieldErrors ?? error,
    });
  }
};

const getResume = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user;
  try {
    const jobseeker = await JobSeeker.findOne({
      where: {
        userId: id,
      },
      attributes: ["id"],
    });

    const jobseekerId = jobseeker.getDataValue("id");

    const data = await Resume.findAndCountAll({
      where: {
        jobseekerId,
      },
    });

    if (!data) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 404,
        error: "No resume found.",
      });
    }

    return APIResponse({
      res,
      data,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Resume fetched successfully.",
    });
  } catch (error) {
    return APIResponse({
      res,
      status: Status.FAILURE,
      statusCode: 500,
      error: error.message,
    });
  }
};

const getResumeById = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user;
  try {
    const jobseeker = await JobSeeker.findOne({
      where: {
        userId: id,
      },
      attributes: ["id"],
    });

    const jobseekerId = jobseeker.getDataValue("id");

    const data = await Resume.findOne({
      where: {
        id: req.params.id,
        jobseekerId,
      },
    });
    if (!data) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 404,
        error: "Resume not found.",
      });
    }

    return APIResponse({
      res,
      data,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Resume fetched successfully.",
    });
  } catch (error) {
    return APIResponse({
      res,
      status: Status.FAILURE,
      statusCode: 500,
      error: error.message,
    });
  }
};

const updateResume = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user;
  try {
    const jobseeker = await JobSeeker.findOne({
      where: {
        userId: id,
      },
      attributes: ["id"],
    });

    const jobseekerId = jobseeker.getDataValue("id");

    const resume = await Resume.findOne({
      where: {
        id: req.params.id,
        jobseekerId,
      },
    });

    if (!resume) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 404,
        error: "Resume not found.",
      });
    }
    const updatedResume = req.file ? req.file.path : req.body.resume ?? null;
    await resume.update({
      title: req.body.title,
      resume: updatedResume,
    });

    return APIResponse({
      res,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Resume updated successfully.",
    });
  } catch (error) {
    const fieldErrors = extractFieldErrors(error);

    return APIResponse({
      res,
      status: Status.FAILURE,
      statusCode: 500,
      error: fieldErrors ?? error.message,
    });
  }
};

const deleteResume = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user;
  try {
    const jobseeker = await JobSeeker.findOne({
      where: {
        userId: id,
      },
      attributes: ["id"],
    });

    const jobseekerId = jobseeker.getDataValue("id");

    const resume = await Resume.findOne({
      where: {
        id: req.params.id,
        jobseekerId,
      },
    });

    if (!resume) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 404,
        error: "Resume not found.",
      });
    }

    await resume.destroy();

    return APIResponse({
      res,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Resume deleted successfully.",
    });
  } catch (error) {
    return APIResponse({
      res,
      status: Status.FAILURE,
      statusCode: 500,
      error: error.message,
    });
  }
};

export { createResume, deleteResume, getResume, getResumeById, updateResume };
