import { ValidationError, ValidationErrorItem } from "sequelize";

const extractFieldErrors = (error: unknown): { [key: string]: string[] } => {
  const fieldErrors: { [key: string]: string[] } = {};

  // Check if the error is an instance of Sequelize ValidationError
  if (error instanceof ValidationError) {
    error.errors.forEach((err: ValidationErrorItem) => {
      // err.path may be undefined, check if it exists
      if (err.path) {
        if (!fieldErrors[err.path]) {
          fieldErrors[err.path] = [];
        }
        fieldErrors[err.path].push(err.message);
      }
    });
  }

  return fieldErrors;
};

export default extractFieldErrors;
