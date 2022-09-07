export const getYearOrMonth = (
  {
    month,
    year,
  }: {
    month: number;
    year: number;
  },
  withSuffix = false
): string => {
  const currentDate = new Date();
  const [currentYear, currentMonth] = [
    currentDate.getFullYear(),
    currentDate.getMonth(),
  ];

  const date = new Date(year, month - 1);
  const [userYear, userMonth] = [date.getFullYear(), date.getMonth()];

  const [diffYear, diffMonth] = [
    currentYear - userYear,
    currentMonth - userMonth,
  ];

  if (diffYear)
    return `${diffYear}${
      withSuffix ? ' year' + (diffYear > 1 ? 's' : '') : ''
    }`;

  return `${diffMonth}${
    withSuffix ? ' month' + (diffMonth > 1 ? 's' : '') : ''
  }`;
};
