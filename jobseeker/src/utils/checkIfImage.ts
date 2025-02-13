const checkIfImage = (filePath: string) => {
  // Define a list of common image extensions
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];

  // Check if the file path ends with any of the image extensions
  return imageExtensions.some((ext) => filePath.toLowerCase().endsWith(ext));
};

export default checkIfImage;
