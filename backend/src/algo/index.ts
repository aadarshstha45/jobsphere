import { Response, Router } from "express";
import { Op } from "sequelize";
import { requireAuth } from "../middlewares";
import { AuthenticatedRequest } from "../middlewares/requireAuth";
import { Company } from "../models";
import Job from "../models/job";
import UserBehavior from "../models/userBehavior";
import { JobAttributes } from "../utils/enums/jobs";

// Function to calculate cosine similarity between two vectors
function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
  const dotProduct = vectorA.reduce((sum, val, i) => sum + val * vectorB[i], 0);
  const normA = Math.sqrt(vectorA.reduce((sum, val) => sum + val ** 2, 0));
  const normB = Math.sqrt(vectorB.reduce((sum, val) => sum + val ** 2, 0));
  return dotProduct / (normA * normB);
}

// Function to create a vector from job attributes
function createJobVector(job: any): number[] {
  return [
    job.title.length, // Length of the title
    job.experience.length, // Length of the experience string
    job.education.length, // Length of the education string
  ];
}

// Job similarity function
async function jobSimilar(job: any, top_n = 9) {
  try {
    // Fetch all jobs excluding the current one
    const jobs = await Job.findAll({
      where: {
        id: { [Op.ne]: job.id }, // Exclude current job
      },
      include: [
        {
          model: Company,
          attributes: ["id", "name", "logo", "location"],
        },
      ],
    });

    // Create a vector for the input job
    const inputVector = createJobVector(job);
    const similarityScores: { job: any; score: number }[] = [];

    for (const j of jobs) {
      const jobVector = createJobVector(j);
      const score = cosineSimilarity(inputVector, jobVector);
      similarityScores.push({ job: j, score });
    }

    // Sort by score and get the top_n jobs
    similarityScores.sort((a, b) => b.score - a.score);
    const recommendedJobs = similarityScores
      .slice(0, top_n)
      .map((item) => ({ job: item.job, score: item.score })); // Include score

    return recommendedJobs;
  } catch (error) {
    console.error("Error in jobSimilar:", error);
    throw new Error("Failed to get similar jobs.");
  }
}

async function recommendJobsBasedOnUserBehavior(userId: number) {
  try {
    // Fetch user behavior
    const userBehaviors = await UserBehavior.findAll({
      where: { userId: userId },
      include: [
        {
          model: Job,
          attributes: [
            "id",
            "title",
            "categoryId",
            "description",
            "jobLevel",
            "experience",
            "education",
          ],
        },
      ],
    });

    // If no user behavior found, return an empty array
    if (userBehaviors.length === 0) {
      return [];
    }

    // Fetch jobs similar to the interacted jobs
    const recommendedJobsMap: Map<
      number,
      { job: JobAttributes; score: number }
    > = new Map();

    for (const userBehavior of userBehaviors) {
      const job = userBehavior.job;

      // Fetch similar jobs for the current job
      const similarJobs = await jobSimilar(job);

      // Append similar jobs to the recommendations array, ensuring uniqueness
      similarJobs.forEach(({ job: recommendedJob, score }) => {
        // Store in a map to ensure uniqueness and keep track of the highest score
        if (
          !recommendedJobsMap.has(recommendedJob.id) ||
          recommendedJobsMap.get(recommendedJob.id)!.score < score
        ) {
          recommendedJobsMap.set(recommendedJob.id, {
            job: recommendedJob,
            score,
          });
        }
      });
    }

    // Convert map values to array and slice to top N
    const recommendedJobs = Array.from(recommendedJobsMap.values())
      .sort((a, b) => b.score - a.score) // Sort by score
      .slice(0, 9); // Limit to top N

    return recommendedJobs;
  } catch (error) {
    console.error("Error in recommendJobsBasedOnUserBehavior:", error);
    throw new Error("Failed to recommend jobs.");
  }
}

const router = Router();

router.get(
  "/recommendations",
  requireAuth,
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    try {
      const recommendations = await recommendJobsBasedOnUserBehavior(userId);
      res.json({
        count: recommendations.length,
        recommendations,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;
