import { WordTokenizer } from "natural";
import { Op } from "sequelize";
import { Job } from "../models";

const tokenizer = new WordTokenizer();

// Cosine Similarity for text vectors (title and description)
const cosineSimilarity = (vecA: any[], vecB: any[]) => {
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

// Function to calculate tag similarity (binary vector approach)
const tagSimilarity = (tagsA: any[], tagsB: string | any[]) => {
  console.log(tagsA, tagsB);
  const sharedTags = tagsA?.filter((tag) => tagsB?.includes(tag));
  const unionTags = new Set([...tagsA, ...tagsB]);
  return sharedTags.length / unionTags.size;
};

// Function to calculate category similarity (binary approach: same category or not)
const categorySimilarity = (categoryA: any, categoryB: any) =>
  categoryA === categoryB ? 1 : 0;

// Main function to get similar jobs based on category, tags, and text
const getSimilarJobs = async (jobId: any) => {
  // Fetch the job for which we want recommendations
  const job: any = await Job.findOne({
    where: { id: jobId },
    attributes: ["id", "title", "description", "categoryId", "tags"],
  });

  if (!job) {
    console.log("Job not found.");
    return [];
  }

  const jobTags = job.tag && JSON.parse(job.tags)?.map((tag) => tag.title);
  const jobTextVector = tokenizer.tokenize(`${job.title} ${job.description}`);
  const jobCategory = job.categoryId;

  // Fetch all other jobs to compare against
  const allJobs: any = await Job.findAll({
    where: {
      id: { [Op.ne]: jobId }, // Exclude the current job
    },
    attributes: ["id", "title", "description", "categoryId", "tags"],
  });

  const recommendations = allJobs.map(
    (otherJob: {
      tags: string;
      title: any;
      description: any;
      categoryId: any;
    }) => {
      const otherJobTags =
        otherJob.tags &&
        JSON.parse(otherJob.tags)?.map((tag: { title: any }) => tag.title);
      const otherJobTextVector = tokenizer.tokenize(
        `${otherJob.title} ${otherJob.description}`
      );

      // Calculate individual similarities
      const textSim = cosineSimilarity(jobTextVector, otherJobTextVector);
      const categorySim = categorySimilarity(jobCategory, otherJob.categoryId);
      const tagSim = tagSimilarity(jobTags, otherJobTags);

      // Combine similarities (weighting them can be adjusted based on testing)
      const overallSimilarity =
        0.5 * textSim + 0.3 * categorySim + 0.2 * tagSim;

      return { job: otherJob, similarity: overallSimilarity };
    }
  );

  // Sort recommendations by similarity score
  recommendations.sort(
    (a: { similarity: number }, b: { similarity: number }) =>
      b.similarity - a.similarity
  );

  return recommendations.map((rec: { job: any }) => rec.job);
};

// Example usage

import express, { Request } from "express";
import { optionalAuth } from "../middlewares";

interface AuthenticatedRequest extends Request {
  user?: { id: number };
}
const router = express.Router();

router.post(
  "/recommendations",
  optionalAuth,
  async (req: AuthenticatedRequest, res) => {
    const userId = req.user?.id;

    try {
      const { jobId } = req.body;

      // Validate the input
      if (!jobId) {
        return res.status(400).json({ message: "Job ID is required" });
      }

      // Get recommended jobs based on the provided jobId
      const recommendations = await getSimilarJobs(jobId);

      if (recommendations.length === 0) {
        return res.status(404).json({ message: "No similar jobs found" });
      }

      // Send the recommended jobs as the response
      res.json({
        message: "Recommended jobs retrieved successfully",
        recommendations,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
function getCollaborativeRecommendations(userId: number) {
  throw new Error("Function not implemented.");
}

export default router;
