import { Response } from "express";

const checkRequiredFields = (data: any, res: Response) => {
  if (!data.email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!data.password) {
    return res.status(400).json({ error: "Password is required" });
  }

  return null;
};

export { checkRequiredFields };
