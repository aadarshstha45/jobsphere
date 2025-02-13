import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/requireAuth";
import { Application, Company, Job, User } from "../models";
import Category from "../models/category";
import IndustryType from "../models/industry";
import JobSeeker from "../models/jobseeker";
import extractFieldErrors from "../utils/fieldErrors";
import removeEmptyValues from "../utils/removeNullValues";
import { APIResponse } from "../utils/response";
import { Status } from "../utils/response/type";
import { socialMediasURLS } from "../utils/socialMedia";

const getCompanyDetail = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user;

  try {
    const company: any = await Company.findOne({
      where: {
        userId: id,
      },
      include: [
        {
          model: User,
          foreignKey: "userId",
          attributes: { exclude: ["password"] },
        },
        {
          model: IndustryType,
          as: "industry",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });

    if (!company) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 404,
        message: "Company not found",
      });
    }

    const socialMedia = socialMediasURLS(company.toJSON());

    const jobCount = await Job.count({
      where: {
        postedBy: id,
        isActive: true,
      },
    });

    // Convert company to JSON and remove null or empty values
    const { facebook, twitter, instagram, youtube, linkedin, ...companyData } =
      removeEmptyValues(company.toJSON());

    const data = {
      ...companyData,
      socialMedia,
      jobCount,
    };
    return APIResponse({
      res,
      data,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Company details retrieved successfully",
    });
  } catch (err) {
    return APIResponse({
      res,
      status: Status.FAILURE,
      statusCode: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const getAllApplications = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user;

  const { page, perPage } = req.query;

  try {
    const company = await Company.findOne({
      where: {
        userId: id,
      },
    });
    if (!company) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 404,
        message: "Company not found",
      });
    }
    const applications = await Application.findAndCountAll({
      where: {
        companyId: id,
      },
      include: [
        {
          model: Job,
          as: "job",
          attributes: ["id", "title"],
        },
        {
          model: JobSeeker,
          attributes: ["id"],
          include: [
            {
              model: User,
              attributes: ["id", "email"],
            },
          ],
        },
      ],
      limit: perPage ? Number(perPage) : 10,
      offset: page ? (+page - 1) * (Number(perPage) ?? 10) : 0,
      order: [["createdAt", "DESC"]],
    });

    if (applications.count === 0) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 404,
        message: "No applications found",
      });
    }

    const firstPage = `/api/company/application?page=1&perPage=${perPage}`;
    const lastPage = `/api/company/application?page=${Math.ceil(
      applications.count / (perPage ? +perPage : 10)
    )}&perPage=${perPage}`;

    return APIResponse({
      res,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Applications retrieved successfully",
      data: applications,
      pagination: {
        firstPage,
        lastPage,
        totalRecords: applications.count,
        totalPages: Math.ceil(applications.count / (perPage ? +perPage : 10)),
        currentPage: page ? +page : 1,
        perPage: perPage ? +perPage : 10,
      },
    });
  } catch (err) {
    return APIResponse({
      res,
      status: Status.FAILURE,
      statusCode: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const getCompanies = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const data = await Company.findAndCountAll({
      limit: limit ? +limit : 10,
      offset: page ? (+page - 1) * +limit : 0,
      include: {
        model: Job,
        where: { isActive: true },
        attributes: { exclude: ["updatedAt"] },
        required: false,
      },
    });
    if (data.count === 0) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 404,
        message: "No companies found",
      });
    }
    const count = data.count;
    const totalPages = Math.ceil(count / (limit ? +limit : 10));
    const firstPage = `/api/company?page=1&limit=${limit}`;
    const lastPage = `/api/company?page=${totalPages}&limit=${limit}`;
    return APIResponse({
      res,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Companies retrieved successfully",
      data,
      pagination: {
        totalRecords: count,
        totalPages,
        currentPage: page ? +page : 1,
        perPage: limit ? +limit : 10,
        firstPage,
        lastPage,
      },
    });
  } catch (err) {
    return APIResponse({
      res,
      status: Status.FAILURE,
      statusCode: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const getCompanyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Company.findByPk(id, {
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
        {
          model: Job,
          where: { isActive: true },
          attributes: { exclude: ["updatedAt"] },
          required: false,
        },
      ],
    });

    return APIResponse({
      res,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Companies retrieved successfully",
      data,
    });
  } catch (err) {
    return APIResponse({
      res,
      status: Status.FAILURE,
      statusCode: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const updateCompany = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user;

  let logo = req.file ? req.file.path : null;

  try {
    const company: any = await Company.findOne({
      where: {
        userId: id,
      },
    });
    if (!company) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 404,
        error: "Company not found",
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
        }
      );
    }

    let data = null;
    if (logo) {
      data = await company.update({
        ...req.body,
        logo,
      });
    } else {
      data = await company.update({
        ...req.body,
      });
    }

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

const getCompanyJobById = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  try {
    const job = await Job.findOne({
      where: {
        id,
        postedBy: req.user?.id,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    if (!job) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 404,
        message: "Job not found",
      });
    }
    return APIResponse({
      res,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Job retrieved successfully",
      data: job,
    });
  } catch (err) {
    return APIResponse({
      res,
      status: Status.FAILURE,
      statusCode: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export {
  getAllApplications,
  getCompanies,
  getCompanyById,
  getCompanyDetail,
  getCompanyJobById,
  updateCompany,
};
