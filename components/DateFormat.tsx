const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
  
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  
  export default formatDate;
  