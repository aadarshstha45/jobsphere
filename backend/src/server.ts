import cors from "cors";
import { config } from "dotenv";
import express from "express";
import apiRouter from "./routers";
config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.use("/api", apiRouter);
app.use("/uploads", express.static("uploads"));
// Job.bulkCreate(jobDataForCompany1);
// Job.bulkCreate(jobDataForCompany2);
// Category.bulkCreate(categoryData);
// Industry.bulkCreate(industryData);

app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`
  );
});
