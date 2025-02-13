import { Request, Response } from "express";
import { STATUS_CODES } from "http";
import connection from "../database";
import { Category, Company, Industry, Job } from "../models";
import { APIResponse } from "../utils/response";
import { Status } from "../utils/response/type";

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAndCountAll({
      where: { isActive: true },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      order: connection.random(),
    });
    categories.rows = await Promise.all(
      categories.rows.map(async (category: any) => {
        category.dataValues.jobCount = await Job.count({
          where: { categoryId: category.id },
        });
        return category;
      })
    );
    return APIResponse({
      res,
      data: categories,
      message: "Categories Fetched Successfully",
      statusCode: 200,
      status: Status.SUCCESS,
    });
  } catch (error) {
    return APIResponse({
      res,
      message: STATUS_CODES[500],
      statusCode: 500,
      status: Status.FAILURE,
      error: error.message,
    });
  }
};

const getCategoriesForHome = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAndCountAll({
      where: { isActive: true },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: connection.random(),
    });

    categories.rows = await Promise.all(
      categories.rows.map(async (category: any) => {
        const jobCount = await Job.count({
          where: { isActive: true, categoryId: category.id },
        });
        category.dataValues.jobCount = jobCount;
        return category;
      })
    );

    categories.rows = categories.rows.filter(
      (category: any) => category.dataValues.jobCount > 0
    );

    categories.rows = categories.rows.slice(0, 9);
    categories.count = categories.rows.length;

    return APIResponse({
      res,
      data: categories,
      message: "Categories Fetched Successfully",
      statusCode: 200,
      status: Status.SUCCESS,
    });
  } catch (error) {
    return APIResponse({
      res,
      message: STATUS_CODES[500],
      statusCode: 500,
      status: Status.FAILURE,
      error: error.message,
    });
  }
};

const getIndustries = async (req: Request, res: Response) => {
  try {
    const categories = await Industry.findAndCountAll({
      where: { isActive: true },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return APIResponse({
      res,
      data: categories,
      message: "Industries Fetched Successfully",
      statusCode: 200,
      status: Status.SUCCESS,
    });
  } catch (error) {
    return APIResponse({
      res,
      message: STATUS_CODES[500],
      statusCode: 500,
      status: Status.FAILURE,
      error: error.message,
    });
  }
};

const getCompaniesForHome = async (req: Request, res: Response) => {
  try {
    const companies = await Company.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: connection.random(),
    });

    companies.rows = await Promise.all(
      companies.rows.map(async (company: any) => {
        const jobCount = await Job.count({
          where: { isActive: true, postedBy: company.id },
        });
        company.dataValues.jobCount = jobCount;
        return company;
      })
    );

    companies.rows = companies.rows.filter(
      (company: any) => company.dataValues.jobCount > 0
    );

    companies.rows = companies.rows.slice(0, 9);

    companies.count = companies.rows.length;

    return APIResponse({
      res,
      data: companies,
      message: "Companies Fetched Successfully",
      statusCode: 200,
      status: Status.SUCCESS,
    });
  } catch (error) {
    return APIResponse({
      res,
      message: STATUS_CODES[500],
      statusCode: 500,
      status: Status.FAILURE,
      error: error.message,
    });
  }
};

const getJobsForHome = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.findAndCountAll({
      where: { isActive: true },
      attributes: {
        include: ["title", "vacancies", "id"],
      },
      order: connection.random(),
    });

    jobs.rows = jobs.rows.slice(0, 12);
    jobs.count = jobs.rows.length;

    return APIResponse({
      res,
      data: jobs,
      message: "Jobs Fetched Successfully",
      statusCode: 200,
      status: Status.SUCCESS,
    });
  } catch (error) {
    return APIResponse({
      res,
      message: STATUS_CODES[500],
      statusCode: 500,
      status: Status.FAILURE,
      error: error.message,
    });
  }
};

export {
  getCategories,
  getCategoriesForHome,
  getCompaniesForHome,
  getIndustries,
  getJobsForHome,
};
