export const formatSalary = (salary: number) => {
  if (salary >= 1_000_000) {
    const formattedSalary = salary / 1_000_000;
    return `$${
      Number.isInteger(formattedSalary)
        ? formattedSalary
        : formattedSalary.toFixed(1)
    }M`;
  } else if (salary >= 1_000) {
    const formattedSalary = salary / 1_000;
    return `$${
      Number.isInteger(formattedSalary)
        ? formattedSalary
        : formattedSalary.toFixed(1)
    }K`;
  }
  return `$${salary}`;
};
