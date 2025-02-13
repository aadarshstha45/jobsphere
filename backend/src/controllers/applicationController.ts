import { Response } from "express";
import connection from "../database";
import { AuthenticatedRequest } from "../middlewares/requireAuth";
import { Application, Company, Job, User } from "../models";
import ApplicationMessage from "../models/applicationMessage";
import JobSeeker from "../models/jobseeker";
import Resume from "../models/resume";
import removeEmptyValues from "../utils/removeNullValues";
import { APIResponse } from "../utils/response";
import { Status } from "../utils/response/type";
import { socialMediasURLS } from "../utils/socialMedia";

const createApplication = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user;
  try {
    const jobseeker = await JobSeeker.findOne({
      where: {
        userId: id,
      },
      attributes: ["id"],
    });
    const jobseekerId = jobseeker.getDataValue("id");

    const data = await Application.create({
      ...req.body,
      jobseekerId,
    });

    return APIResponse({
      res,
      data,
      status: Status.SUCCESS,
      statusCode: 201,
      message: "Application created successfully.",
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

const getApplications = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user;
  try {
    const jobseeker = await JobSeeker.findOne({
      where: {
        userId: id,
      },
      attributes: ["id"],
    });

    const company = await Company.findOne({
      where: {
        userId: id,
      },
      attributes: ["id"],
    });

    const userId = jobseeker
      ? jobseeker.getDataValue("id")
      : company.getDataValue("id");

    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;
    const sort = req.query.sort as string;

    const data = await Application.findAndCountAll({
      where: { companyId: userId },
      include: [
        {
          model: JobSeeker,
          attributes: ["id"],
          include: [{ model: User, attributes: ["id", "name", "email"] }],
        },
        { model: Job, attributes: ["id", "title", "jobType"] },
        {
          model: Resume,
          attributes: {
            exclude: ["createdAt", "updatedAt", "jobseekerId"],
          },
        },
      ],
      attributes: { exclude: ["jobseekerId", "companyId", "resumeId"] },
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

    const totalPages = Math.ceil(data.count / perPage); // Total number of pages
    const firstPage = `/api/sample-crud?page=1&perPage=${perPage}`;
    const lastPage = `/api/sample-crud?page=${Math.ceil(
      data.count / perPage
    )}&perPage=${perPage}`;

    if (data.count === 0) {
      return APIResponse({
        res,
        statusCode: 404,
        error: "No Applications Found.",
        status: Status.FAILURE,
      });
    }

    return APIResponse({
      res,
      data,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Applications fetched successfully.",
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
      status: Status.FAILURE,
      statusCode: 500,
      error: error.message,
    });
  }
};

const getRecentApplied = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user;
  try {
    const jobseeker = await JobSeeker.findOne({
      where: {
        userId: id,
      },
      attributes: ["id"],
    });

    const jobseekerId = jobseeker.getDataValue("id");
    const data = await Application.findAndCountAll({
      where: { jobseekerId },
      include: [
        {
          model: Company,
          attributes: ["id"],
          include: [{ model: User, attributes: ["id", "name", "email"] }],
        },
        { model: Job, attributes: ["id", "title", "jobType", "jobLevel"] },
        {
          model: Resume,
          attributes: {
            exclude: ["createdAt", "updatedAt", "jobseekerId"],
          },
        },
      ],
      attributes: { exclude: ["jobseekerId", "companyId", "resumeId"] },
      limit: 5,

      order: [["createdAt", "DESC"]],
    });

    if (data.count === 0) {
      return APIResponse({
        res,
        statusCode: 404,
        error: "No Applications Found.",
        status: Status.FAILURE,
      });
    }

    return APIResponse({
      res,
      data,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Applications fetched successfully.",
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

const getApplicationDetails = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id, userType } = req.user;
  try {
    let user = null;

    if (userType === "employer") {
      user = await Company.findOne({
        where: {
          userId: id,
        },
        attributes: ["id"],
      });
    } else {
      user = await JobSeeker.findOne({
        where: {
          userId: id,
        },
      });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userId = user.getDataValue("id");
    let data: any = {};

    const includeOptions = [
      {
        model: Company,
        include: [{ model: User, attributes: ["id", "name", "email"] }],
      },
      {
        model: JobSeeker,
        include: [{ model: User, attributes: ["id", "name", "email"] }],
      },
      { model: Job },
      {
        model: Resume,
        attributes: {
          exclude: ["createdAt", "updatedAt", "jobseekerId"],
        },
      },
    ];
    if (userType === "employer") {
      data = await Application.findOne({
        where: { companyId: userId, id: req.params.id },
        include: includeOptions,
        attributes: {
          exclude: ["jobseekerId", "companyId", "resumeId", "jobId"],
        },
      });
    } else {
      data = await Application.findOne({
        where: { jobseekerId: userId, id: req.params.id },
        include: includeOptions,
        attributes: {
          exclude: ["jobseekerId", "companyId", "resumeId", "jobId"],
        },
      });
    }
    if (!data) {
      return APIResponse({
        res,
        statusCode: 404,
        error: "No Application Found.",
        status: Status.FAILURE,
      });
    }

    const {
      facebook: companyFacebook,
      instagram: companyInstagram,
      twitter: companyTwitter,
      linkedin: companyLinkedin,
      ...companyData
    } = removeEmptyValues(data.toJSON().company);

    const { facebook, instagram, twitter, linkedin, ...jobseekerData } =
      removeEmptyValues(data.toJSON().jobseeker);

    const companySocialMedia = socialMediasURLS(data.toJSON().company);
    const jobSocialMedia = socialMediasURLS(data.toJSON().job);

    return APIResponse({
      res,
      data: {
        ...data.toJSON(),
        company: {
          ...companyData,
          socialMedia: companySocialMedia,
        },
        jobseeker: {
          ...jobseekerData,
          socialMedia: jobSocialMedia,
        },
      },
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Application fetched successfully.",
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

const getApplicationsByJobId = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.user;

  const company = await Company.findOne({
    where: {
      userId: id,
    },
    attributes: ["id"],
  });

  const userId = company.getDataValue("id");

  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.perPage as string) || 10;
  try {
    const data = await Application.findAndCountAll({
      where: { companyId: userId, jobId: req.params.id },
      include: [
        {
          model: JobSeeker,
          attributes: ["id"],
          include: [{ model: User, attributes: ["id", "name", "email"] }],
        },

        {
          model: Resume,
          attributes: {
            exclude: ["createdAt", "updatedAt", "jobseekerId"],
          },
        },
      ],
      attributes: { exclude: ["jobseekerId", "companyId", "resumeId"] },
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const totalPages = Math.ceil(data.count / perPage); // Total number of pages

    const firstPage = `/api/sample-crud?page=1&perPage=${perPage}`;
    const lastPage = `/api/sample-crud?page=${Math.ceil(
      data.count / perPage
    )}&perPage=${perPage}`;

    if (data.count === 0) {
      return APIResponse({
        res,
        statusCode: 404,
        error: "No Applications Found.",
        status: Status.FAILURE,
      });
    }

    return APIResponse({
      res,
      data,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Applications fetched successfully.",
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
      status: Status.FAILURE,
      statusCode: 500,
      error: error.message,
    });
  }
};

const getApplicationHistory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.user;

  try {
    const jobseeker = await JobSeeker.findOne({
      where: {
        userId: id,
      },
      attributes: ["id"],
    });

    const jobseekerId = jobseeker.getDataValue("id");

    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;

    const data = await Application.findAndCountAll({
      where: { jobseekerId },
      include: [
        {
          model: Company,
          attributes: ["id"],
          include: [{ model: User, attributes: ["id", "name", "email"] }],
        },
        { model: Job, attributes: ["id", "title", "jobType", "jobLevel"] },
        {
          model: Resume,
          attributes: {
            exclude: ["createdAt", "updatedAt", "jobseekerId"],
          },
        },
      ],
      attributes: { exclude: ["jobseekerId", "companyId", "resumeId"] },
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [["createdAt", "DESC"]],
    });

    if (data.count === 0) {
      return APIResponse({
        res,
        statusCode: 404,
        error: "No Applications Found.",
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
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Applications fetched successfully.",
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
      status: Status.FAILURE,
      statusCode: 500,
      error: error.message,
    });
  }
};

const doesApplicationExist = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.user;
  try {
    const jobseeker = await JobSeeker.findOne({
      where: {
        userId: id,
      },
      attributes: ["id"],
    });

    const jobseekerId = jobseeker.getDataValue("id");

    const application = await Application.findOne({
      where: { jobseekerId, jobId: req.body.jobId },
    });

    if (application) {
      return APIResponse({
        res,
        statusCode: 400,
        error: "You have already applied for this job.",
        status: Status.FAILURE,
      });
    }
    return APIResponse({
      res,
      status: Status.SUCCESS,
      statusCode: 200,
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

const updateApplication = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const application = await Application.findOne({
      where: { id: req.params.id },
    });

    if (!application) {
      return APIResponse({
        res,
        statusCode: 404,
        error: "Application not found.",
        status: Status.FAILURE,
      });
    }

    if (req.body.status === application.getDataValue("status")) {
      return APIResponse({
        res,
        statusCode: 400,
        error: `You have already ${req.body.status} this application.`,
        status: Status.FAILURE,
      });
    }
    let response = null;
    if (req.body.status === "accepted") {
      response = await application.update({
        status: req.body.status,
        meetingType: req.body.meetingType,
        meetingTime: req.body.meetingTime,
        meetingLink: req.body.meetingLink,
      });
    } else {
      response = await application.update({
        status: req.body.status,
      });
    }

    await ApplicationMessage.create({
      status: req.body.status,
      message: req.body.message,
      applicationId: req.params.id,
    });

    return APIResponse({
      res,
      data: response,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Application updated successfully.",
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

const getMeetings = async (req: AuthenticatedRequest, res: Response) => {
  const { id, userType } = req.user;

  console.log(req.user);

  try {
    let user = null;

    if (userType === "jobseeker") {
      user = await JobSeeker.findOne({
        where: {
          userId: id,
        },
        attributes: ["id"],
      });
    } else {
      user = await Company.findOne({
        where: {
          userId: id,
        },
        attributes: ["id"],
      });
    }
    console.log({ user });
    const userId = user.getDataValue("id");
    if (!userId) {
      return APIResponse({
        res,
        statusCode: 404,
        error: "User not found.",
        status: Status.FAILURE,
      });
    }

    const where =
      userType === "employer" ? { companyId: userId } : { jobseekerId: userId };
    const include =
      userType === "employer"
        ? [
            {
              model: JobSeeker,
              include: [{ model: User, attributes: ["id", "name", "email"] }],
            },
          ]
        : [
            {
              model: Company,
              include: [{ model: User, attributes: ["id", "name", "email"] }],
            },
          ];

    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;
    const applications = await Application.findAndCountAll({
      where: {
        ...where,
        status: "accepted",
      },
      include: [
        ...include,
        { model: Job, attributes: ["id", "title", "jobType", "jobLevel"] },
        {
          model: Resume,
          attributes: {
            exclude: ["createdAt", "updatedAt", "jobseekerId"],
          },
        },
      ],
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [["createdAt", "DESC"]],
    });

    if (applications.count === 0) {
      return APIResponse({
        res,
        statusCode: 404,
        error: "No meetings found.",
        status: Status.FAILURE,
      });
    }

    const totalPages = Math.ceil(applications.count / perPage); // Total number of pages
    const firstPage = `/api/sample-crud?page=1&perPage=${perPage}`;
    const lastPage = `/api/sample-crud?page=${Math.ceil(
      applications.count / perPage
    )}&perPage=${perPage}`;

    return APIResponse({
      res,
      data: applications,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Meetings fetched successfully.",
      pagination: {
        totalRecords: applications.count,
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
      status: Status.FAILURE,
      statusCode: 500,
      error: error.message,
    });
  }
};

const getShortListedApplications = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.user;
  try {
    const company = await Company.findOne({
      where: {
        userId: id,
      },
      attributes: ["id"],
    });

    const companyId = company.getDataValue("id");

    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;

    const data = await Application.findAndCountAll({
      where: { companyId, status: "shortlisted" },
      include: [
        {
          model: JobSeeker,
          attributes: ["id"],
          include: [{ model: User, attributes: ["id", "name", "email"] }],
        },
        { model: Job, attributes: ["id", "title", "jobType"] },
        {
          model: Resume,
          attributes: {
            exclude: ["createdAt", "updatedAt", "jobseekerId"],
          },
        },
      ],
      attributes: { exclude: ["jobseekerId", "companyId", "resumeId"] },
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [["createdAt", "DESC"]],
    });
    const totalPages = Math.ceil(data.count / perPage); // Total number of pages
    const firstPage = `/api/sample-crud?page=1&perPage=${perPage}`;
    const lastPage = `/api/sample-crud?page=${Math.ceil(
      data.count / perPage
    )}&perPage=${perPage}`;

    if (data.count === 0) {
      return APIResponse({
        res,
        statusCode: 404,
        error: "No Applications Found.",
        status: Status.FAILURE,
      });
    }

    return APIResponse({
      res,
      data,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Applications fetched successfully.",
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
      status: Status.FAILURE,
      statusCode: 500,
      error: error.message,
    });
  }
};

export {
  createApplication,
  doesApplicationExist,
  getApplicationDetails,
  getApplicationHistory,
  getApplications,
  getApplicationsByJobId,
  getMeetings,
  getRecentApplied,
  getShortListedApplications,
  updateApplication,
};
