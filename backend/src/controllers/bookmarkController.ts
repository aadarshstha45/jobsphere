import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/requireAuth";
import { BookMarkedJobs, Company, Job } from "../models";
import { APIResponse } from "../utils/response";
import { Status } from "../utils/response/type";

const bookMarkJobs = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.id;
  const jobId = req.body.jobId;
  try {
    const bookmarks = await BookMarkedJobs.findOne({
      where: {
        userId,
        jobId,
      },
    });
    if (bookmarks) {
      await bookmarks.destroy();
      return APIResponse({
        res,
        data: bookmarks,
        status: Status.SUCCESS,
        statusCode: 200,
        message: "Bookmark removed.",
      });
    }

    const response = await BookMarkedJobs.create({
      userId,
      jobId,
    });

    return APIResponse({
      res,
      data: response,
      status: Status.SUCCESS,
      statusCode: 201,
      message: "Bookmarked",
    });
  } catch (error) {
    return APIResponse({
      res,
      status: Status.FAILURE,
      statusCode: 500,
      error: error,
    });
  }
};

const getBookMarkedJobs = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.id;
  try {
    const data = await BookMarkedJobs.findAndCountAll({
      where: {
        userId,
      },
    });

    if (data.count === 0) {
      return APIResponse({
        res,
        data,
        status: Status.SUCCESS,
        statusCode: 200,
        message: "No Bookmarks",
      });
    }

    return APIResponse({
      res,
      data,
      status: Status.SUCCESS,
      statusCode: 200,
      message: "Bookmarks",
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

const getSavedJobs = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.perPage as string) || 12;
  try {
    const data = await BookMarkedJobs.findAndCountAll({
      where: {
        userId,
      },
      include: [
        {
          model: Job,
          as: "job",
          attributes: [
            "id",
            "title",
            "createdAt",
            "jobType",
            "salaryType",
            "minSalary",
            "maxSalary",
            "expiryDate",
            "isActive",
          ],
          include: [
            {
              model: Company,
              attributes: ["id", "name", "logo", "location", "createdAt"],
            },
          ],
        },
      ],
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [["createdAt", "DESC"]],
    });

    if (data.count === 0) {
      return APIResponse({
        res,
        data,
        status: Status.SUCCESS,
        statusCode: 200,
        message: "No Bookmarks",
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
      message: "Bookmarks",
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

export { bookMarkJobs, getBookMarkedJobs, getSavedJobs };
