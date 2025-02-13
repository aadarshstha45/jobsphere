import { Request, Response } from "express";
import { Op } from "sequelize";
import connection from "../database";
import { AuthenticatedRequest } from "../middlewares/requireAuth";
import { BookMarkedJobs, Company, Job } from "../models";
import Category from "../models/category";
import extractFieldErrors from "../utils/fieldErrors";
import { getFullPath } from "../utils/imagePath";
import { APIResponse } from "../utils/response";
import { Status } from "../utils/response/type";

const createJob = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = req.body;
    const id = req.user?.id;

    const company = await Company.findOne({
      where: {
        userId: id,
      },
    });

    const companyId = company?.getDataValue("id");

    const job = await Job.create({
      ...data,
      postedBy: companyId,
    });
    return APIResponse({
      res,
      data: job,
      statusCode: 201,
      message: "Job created successfully.",
      status: Status.SUCCESS,
    });
  } catch (error) {
    const fieldErrors = extractFieldErrors(error);
    return APIResponse({
      res,
      statusCode: 500,
      message: "Internal server error",
      status: Status.FAILURE,
      error: Object.keys(fieldErrors).length ? fieldErrors : error.message,
    });
  }
};

const getCompanyJobs = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user;
  const { status } = req.query;
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.perPage as string) || 10;

  const company = await Company.findOne({
    where: {
      userId: id,
    },
  });

  const companyId = company?.getDataValue("id");

  try {
    const data = await Job.findAndCountAll({
      where: {
        postedBy: companyId,
        ...(status !== undefined
          ? {
              isActive:
                status === "active"
                  ? true
                  : status === "inactive"
                  ? false
                  : null,
            }
          : {}),
      },
      attributes: [
        "id",
        "title",
        "salaryType",
        "minSalary",
        "maxSalary",
        "jobType",
        "expiryDate",
        "isActive",
      ],
      include: {
        model: Category,
        as: "category",
      },
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [["updatedAt", "DESC"]],
    });
    if (data.count === 0) {
      return APIResponse({
        res,
        statusCode: 404,
        error: "No Jobs Found.",
        status: Status.FAILURE,
      });
    }

    const totalPages = Math.ceil(data.count / perPage); // Total number of pages
    const firstPage = `/api/sample-crud?page=1&perPage=${perPage}`;
    const lastPage = `/api/sample-crud?page=${Math.ceil(
      data.count / perPage
    )}&perPage=${perPage}`;

    return APIResponse({
      res,
      data,
      statusCode: 200,
      message: "Jobs fetched successfully",
      status: Status.SUCCESS,
      pagination: {
        totalRecords: data.count,
        totalPages,
        currentPage: page,
        perPage,
        firstPage,
        lastPage,
      },
    });
  } catch (error) {
    return APIResponse({
      res,
      statusCode: 500,
      message: "Internal server error",
      status: Status.FAILURE,
      error: error.message,
    });
  }
};

const getJobById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as AuthenticatedRequest).user?.id;
  try {
    const data: any = await Job.findByPk(id, {
      include: [
        {
          model: Company,
          as: "company",
        },
        {
          model: Category,
          as: "category",
          where: { isActive: true },
          attributes: { exclude: ["createdAt", "updatedAt"] },
          required: false,
        },
      ],
      attributes: { exclude: ["companyId", "categoryId", "userId"] },
    });

    if (!data) {
      return APIResponse({
        res,
        statusCode: 404,
        error: "No Job Found.",
        status: Status.FAILURE,
      });
    }

    if (userId) {
      const isBookmarked = (await BookMarkedJobs.findOne({
        where: {
          userId: userId,
          jobId: id,
        },
      }))
        ? true
        : false;
      data.dataValues.isBookmarked = isBookmarked;
    }

    return APIResponse({
      res,
      data,
      statusCode: 200,
      message: "Job fetched successfully.",
      status: Status.SUCCESS,
    });
  } catch (error) {
    return APIResponse({
      res,
      statusCode: 500,
      message: "Internal server error.",
      status: Status.FAILURE,
      error: error.message,
    });
  }
};

const getAllJobs = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.perPage as string) || 10;
  const sort = req.query.sort as string;
  const categoryId = req.query.categoryId as string;
  const companyId = req.query.companyId as string;
  const id = (req as AuthenticatedRequest).user?.id;
  try {
    const data: any = await Job.findAndCountAll({
      where: {
        isActive: true,
        ...(categoryId && { categoryId }),
        ...(companyId && { postedBy: companyId }),
      },
      include: [
        {
          model: Company,
          as: "company",
          attributes: ["id", "name", "logo", "location", "website"],
        },
        {
          model: Category,
          as: "category",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      limit: perPage,
      offset: (page - 1) * perPage,
      order:
        sort === "latest"
          ? [["createdAt", "DESC"]]
          : sort === "oldest"
          ? [["createdAt", "ASC"]]
          : sort === "salary_desc"
          ? [["minSalary", "DESC"]]
          : sort === "salary_asc"
          ? [["minSalary", "ASC"]]
          : connection.random(),
    });

    if (data.count === 0) {
      return APIResponse({
        res,
        statusCode: 404,
        error: "No Jobs Found.",
        status: Status.FAILURE,
      });
    }

    if (id) {
      const jobs = data.rows;
      for (const job of jobs) {
        const isBookmarked = (await BookMarkedJobs.findOne({
          where: {
            userId: id, // Assuming req.user.id contains the authenticated user's ID
            jobId: job.id,
          },
        }))
          ? true
          : false;

        job.dataValues.isBookmarked = isBookmarked;
      }
    }

    const totalPages = Math.ceil(data.count / perPage); // Total number of pages
    const firstPage = `/api/sample-crud?page=1&perPage=${perPage}`;
    const lastPage = `/api/sample-crud?page=${Math.ceil(
      data.count / perPage
    )}&perPage=${perPage}`;

    return APIResponse({
      res,
      data,
      statusCode: 200,
      message: "Jobs fetched successfully",
      status: Status.SUCCESS,
      pagination: {
        totalRecords: data.count,
        totalPages,
        currentPage: page,
        perPage,
        firstPage,
        lastPage,
      },
    });
  } catch (error) {
    APIResponse({
      res,
      status: Status.FAILURE,
      statusCode: 500,
      message: "Internal server error",
      error: error,
    });
  }
};

const getJobsByCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.query;
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.perPage as string) || 10;
  const sort = req.query.sort as string;
  const id = (req as AuthenticatedRequest).user?.id;

  try {
    const data: any = await Job.findAndCountAll({
      where: {
        isActive: true,
        categoryId,
      },
      include: [
        {
          model: Company,
          as: "company",
          attributes: ["id", "name", "logo", "location", "website"],
        },
        {
          model: Category,
          as: "category",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      limit: perPage,
      offset: (page - 1) * perPage,
      order:
        sort === "latest"
          ? [["createdAt", "DESC"]]
          : sort === "oldest"
          ? [["createdAt", "ASC"]]
          : sort === "salary_desc"
          ? [["minSalary", "DESC"]]
          : sort === "salary_asc"
          ? [["minSalary", "ASC"]]
          : connection.random(),
    });

    if (data.count === 0) {
      return APIResponse({
        res,
        statusCode: 404,
        error: "No Jobs Found.",
        status: Status.FAILURE,
      });
    }

    if (id) {
      const jobs = data.rows;
      for (const job of jobs) {
        const isBookmarked = (await BookMarkedJobs.findOne({
          where: {
            userId: id, // Assuming req.user.id contains the authenticated user's ID
            jobId: job.id,
          },
        }))
          ? true
          : false;

        job.dataValues.isBookmarked = isBookmarked;
      }
    }

    const totalPages = Math.ceil(data.count / perPage); // Total number of pages
    const firstPage = `/api/sample-crud?page=1&perPage=${perPage}`;
    const lastPage = `/api/sample-crud?page=${Math.ceil(
      data.count / perPage
    )}&perPage=${perPage}`;

    return APIResponse({
      res,
      data,
      statusCode: 200,
      message: "Jobs fetched successfully",
      status: Status.SUCCESS,
      pagination: {
        totalRecords: data.count,
        totalPages,
        currentPage: page,
        perPage,
        firstPage,
        lastPage,
      },
    });
  } catch (error) {
    return APIResponse({
      res,
      statusCode: 500,
      message: "Internal server error",
      status: Status.FAILURE,
      error: error.message,
    });
  }
};

const getRecentJobs = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user;
  const company = await Company.findOne({
    where: {
      userId: id,
    },
  });

  const companyId = company?.getDataValue("id");
  try {
    const data: any = await Job.findAndCountAll({
      where: {
        isActive: true,
        postedBy: companyId,
      },
      attributes: [
        "id",
        "title",
        "minSalary",
        "maxSalary",
        "jobType",
        "expiryDate",
        "createdAt",
        "isActive",
        "postedBy",
      ],
      limit: 5,
      order: [["createdAt", "DESC"]],
    });
    if (data.count === 0) {
      return APIResponse({
        res,
        statusCode: 404,
        error: "No Jobs Found.",
        status: Status.FAILURE,
      });
    }

    return APIResponse({
      res,
      data,
      statusCode: 200,
      message: "Jobs fetched successfully",
      status: Status.SUCCESS,
    });
  } catch (error) {
    return APIResponse({
      res,
      statusCode: 500,
      message: "Internal server error",
      status: Status.FAILURE,
      error: error.message,
    });
  }
};

const getRelatedJobs = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const job: any = await Job.findByPk(id);
    if (!job) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 404,
        error: "Job not found.",
      });
    }

    // Build conditions for related jobs
    const whereCondition: any = {
      id: { [Op.ne]: id }, // Exclude the current job
      jobType: job.jobType, // Match job type
      isActive: true, // Only include active jobs
    };

    // Include company-related filters
    const company = job.company;
    if (company) {
      if (company.organizationType) {
        whereCondition["$company.organizationType$"] = company.organizationType;
      }
      if (company.industryType) {
        whereCondition["$company.industryType$"] = company.industryType;
      }
    }

    if (job.education) {
      whereCondition.education = job.education;
    }
    if (job.experience) {
      whereCondition.experience = job.experience;
    }
    if (job.jobLevel) {
      whereCondition.jobLevel = job.jobLevel;
    }

    // Find related jobs
    const relatedJobs = await Job.findAndCountAll({
      where: whereCondition,
      limit: 6, // Limit to 6 related jobs
      order: connection.random(), // Randomize the order of related jobs
      include: [
        {
          model: Company,
          as: "company",
        },
      ],
    });

    const jobs = {
      ...relatedJobs,
      rows: relatedJobs.rows.map((job: any) => {
        if (job.company && job.company.logo) {
          job.company.logo = getFullPath(job.company.logo);
        }
        return job;
      }),
    };

    return APIResponse({
      res,
      data: jobs,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Related jobs fetched successfully.",
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

const updateJob = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;

  try {
    const data: any = await Job.findByPk(id);
    if (!data) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 404,
        error: "Job not found",
      });
    }

    if (data.postedBy !== userId) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 403,
        error: "You are not authorized to update this job.",
      });
    }

    let expiry: null;

    await data.update(req.body);
    return APIResponse({
      res,
      data,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Job updated successfully",
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

const updateJobStatus = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    const data: any = await Job.findByPk(id);
    if (!data) {
      return res.status(404).send({
        errors: "Job not found",
      });
    }

    if (data.postedBy !== userId) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 403,
        error: "You are not authorized to update this job.",
      });
    }

    await data.update({
      isActive,
      expiryDate: new Date(),
    });
    return APIResponse({
      res,
      data,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Job status updated successfully",
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

const deleteJob = async (req: AuthenticatedRequest, res: Response) => {
  const userID = req.user?.id;

  const { id } = req.params;

  try {
    const data: any = await Job.findByPk(id, {
      attributes: ["id", "title", "postedBy"],
    });
    if (!data) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 404,
        error: "Job Not Found.",
      });
    }

    if (data.postedBy !== userID) {
      return APIResponse({
        res,
        status: Status.FAILURE,
        statusCode: 403,
        error: "You are not authorized to delete this job.",
      });
    }
    await data.destroy();
    return APIResponse({
      res,
      data,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Job deleted successfully",
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

export {
  createJob,
  deleteJob,
  getAllJobs,
  getCompanyJobs,
  getJobById,
  getJobsByCategory,
  getRecentJobs,
  getRelatedJobs,
  updateJob,
  updateJobStatus,
};
