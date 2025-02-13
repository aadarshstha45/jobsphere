import * as yup from "yup";

export const JobSchema = yup.object().shape({
  title: yup.string().required("Title cannot be empty."),
  tags: yup.array(),
  jobType: yup.string().required("Job type cannot be empty."),
  salaryType: yup.string().required("Salary type cannot be empty."),
  categoryId: yup.string().required("Select One Category."),
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
  isActive: yup.string().default("true"),
  description: yup.string().default(""),
  responsibilities: yup.string().default(""),
});

export type JobFormValues = yup.InferType<typeof JobSchema>;
