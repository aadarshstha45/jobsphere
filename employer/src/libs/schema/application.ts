import * as yup from "yup";

const CandidateActionSchema = yup.object().shape({
  applicationId: yup.string().required("Application ID is required"),
  status: yup.string(),
  message: yup.string().required("Message is required"),
  meetingType: yup.string().when("status", {
    is: "accepted",
    then: () => yup.string().required("Please select a meeting type."),
    otherwise: () => yup.string(),
  }),
  meetingTime: yup.date().when("status", {
    is: "accepted",
    then: () =>
      yup
        .date()
        .transform((value, originalValue) => {
          return originalValue === "" ? null : value;
        })
        .required("Meeting time is required"),
    otherwise: () => yup.string(),
  }),
  meetingLink: yup.string().when("meetingType", {
    is: "online",
    then: () => yup.string().required("Meeting link is required"),
    otherwise: () => yup.string(),
  }),
});

export type CandidateActionSchemaValues = yup.InferType<
  typeof CandidateActionSchema
>;

export { CandidateActionSchema };
