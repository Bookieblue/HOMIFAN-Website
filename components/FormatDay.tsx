import { format } from 'date-fns';

interface FormattedDateProps {
  dateString: string;
}

const FormattedDay: React.FC<FormattedDateProps> = ({ dateString }) => {
  const date = new Date(dateString);
  const formattedDate = format(date, 'EEEE'); // Example: "Tuesday, February 25, 2025"

  return <span>{formattedDate}</span>;
};

export default FormattedDay;



  
