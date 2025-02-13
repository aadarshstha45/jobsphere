export const socialMediasURLS = (jobseeker) => {
  const socialMediaArray = [];

  // Define the keys we are interested in
  const allowedKeys = [
    "facebook",
    "twitter",
    "instagram",
    "youtube",
    "linkedin",
  ];

  // Iterate over the keys of jobseeker object
  for (const key in jobseeker) {
    if (
      jobseeker.hasOwnProperty(key) && // Ensure the property is not inherited
      allowedKeys.includes(key) && // Check if the key is one of the allowed keys
      typeof jobseeker[key] === "string" && // Ensure the value is a string
      jobseeker[key].trim().length > 0 // Ensure the value is non-empty after trimming
    ) {
      socialMediaArray.push({ type: key, url: jobseeker[key] });
    }
  }

  return socialMediaArray;
};
