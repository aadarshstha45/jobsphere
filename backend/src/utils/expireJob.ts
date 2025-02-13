import { Op } from "sequelize";
import { Job } from "../models";

export const updateExpiredJobs = async () => {
  const now = new Date();
  await Job.update(
    { status: "expired" },
    { where: { expiry: { [Op.lt]: now } } }
  );
};

// Run updateExpiredJobs every hour
setInterval(updateExpiredJobs, 60 * 60 * 1000);
