// Function to remove null or empty values from an object
const removeEmptyValues = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, v]) => v != null && v !== "" && (!Array.isArray(v) || v.length > 0)
    )
  );
};

export default removeEmptyValues;
