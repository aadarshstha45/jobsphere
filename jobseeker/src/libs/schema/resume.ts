import * as yup from "yup";

export const ResumeSchema = yup.object().shape({
  title: yup.string().required("Title cannot be empty."),
  resume: yup
    .mixed()
    .test(
      "is-string-or-file",
      "Resume must be either a string or a file.",
      (value) =>
        typeof value === "string" ||
        (typeof value === "object" && value instanceof File)
    )
    .required("Resume must be provided."),
});

export type ResumeFormValues = yup.InferType<typeof ResumeSchema>;
