export const formatDate = (date: string): string => {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  return newDate.toLocaleDateString('en-GB', options).replace(',', '.');
};
