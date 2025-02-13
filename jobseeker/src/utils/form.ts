// to return the dirty data from the form
import { AxiosError } from "axios";
import { FieldValues, FormState } from "react-hook-form";

const getDirtyData = <T extends FieldValues>(
  formState: FormState<T>,
  data: T
): Record<string, any> => {
  const dirtyFields: Partial<
    Readonly<{
      [x: string]: any;
    }>
  > = formState.dirtyFields;
  return Object.keys(dirtyFields).reduce((acc: Record<string, any>, key) => {
    // Type assertion to satisfy TypeScript
    if (dirtyFields[key]) {
      acc[key] = data[key as keyof T];
    }
    return acc;
  }, {});
};

// Convert API errors to a format suitable for react-hook-form

const getFieldErrors = (error: AxiosError) => {
  return (
    (
      error.response?.data as unknown as {
        error?: Record<string, string[]>;
      }
    )?.error ?? {}
  );
};

export { getDirtyData, getFieldErrors };
