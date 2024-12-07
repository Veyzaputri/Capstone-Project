export const validateQueryParams = (queryParams) => {
  const validFields = ["tanggal", "jumlah", "deskripsi", "kategori", "dompet"];

  const invalidKeys = Object.keys(queryParams).filter(
    (key) => !validFields.includes(key)
  );

  if (invalidKeys.length > 0) {
    throw new Error(`Invalid query parameters: ${invalidKeys.join(", ")}`);
  }
};

export const validateData = (data) => {
  const requiredFields = [
    "tanggal",
    "jumlah",
    "deskripsi",
    "kategori",
    "dompet",
  ];
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Field ${field} is required and missing`);
    }
  }
};

export const validateId = (id) => {
  if (!id) {
    throw new Error("Invalid ID provided. ID must be a valid number.");
  }
};
