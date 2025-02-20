import { format } from "date-fns";

interface FormattedDateProps {
  dateString: string;
}

const FormattedDate: React.FC<FormattedDateProps> = ({ dateString }) => {
  const date = new Date(dateString);
  const formattedDate = format(date, "dd"); // Example: "Tuesday, February 25, 2025"

  return <span>{formattedDate}</span>;
};

export default FormattedDate;
