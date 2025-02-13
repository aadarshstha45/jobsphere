import * as yup from "yup";

export const JobSchema = yup.object().shape({
  title: yup.string().required("Title cannot be empty."),
  tags: yup.string().default(""),
  jobType: yup.string().required("Job type cannot be empty."),
  salaryType: yup.string().required("Salary type cannot be empty."),
  minSalary: yup
    .number()
    .when("salaryType", {
      is: "paid",
      then: () =>
        yup
          .number()
          .transform((value) => {
            return isNaN(value) ? null : value;
          })
          .positive("Min Salary must be greater than 0.")

          // .typeError("Min Salary must be number type")
          .required("Min Salary is required."),
    })
    .transform((value) => {
      return isNaN(value) ? null : value;
    })
    .nullable()
    .default(0),
  maxSalary: yup
    .number()

    .when("salaryType", {
      is: "paid",
      then: () =>
        yup
          .number()
          .transform((value) => {
            return isNaN(value) ? null : value;
          })
          .positive("Max Salary must be greater than 0.")
          .moreThan(
            yup.ref("minSalary"),
            "Max Salary must be greater than Min Salary."
          )
          .required("Max Salary is required."),
    })

    .transform((value) => {
      return isNaN(value) ? null : value;
    })
    .nullable()
    .typeError("Max Salary must be number type")
    .default(0),
  education: yup.string().required("Education cannot be empty."),
  experience: yup.string().required("Experience cannot be empty."),
  vacancies: yup
    .number()
    .required("Vacancies cannot be empty.")
    .typeError("Vacancy must be number type"),
  expiryDate: yup
    .date()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .min(new Date(), "Expiry date must be after today.")
    .required("Expiry date cannot be empty."),

  jobLevel: yup.string().required("Job level cannot be empty."),
  description: yup.string().default(""),
  responsibilities: yup.string().default(""),
});

export const ApplicationSchema = yup.object().shape({
  coverLetter: yup.string().required("Cover letter cannot be empty."),
  resumeId: yup.string().required("Select one resume."),
  jobId: yup.number().required("Job ID cannot be empty."),
  companyId: yup.number().required("Company ID cannot be empty."),
});

export type JobFormValues = yup.InferType<typeof JobSchema>;
export type ApplicationFormValues = yup.InferType<typeof ApplicationSchema>;
