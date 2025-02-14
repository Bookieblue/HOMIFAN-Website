import { parse, format } from 'date-fns';

interface FormattedTimeProps {
  timeString: string;
}

const FormattedTime: React.FC<FormattedTimeProps> = ({ timeString }) => {
  // Parse time from "HH:mm:ss" format
  const parsedTime = parse(timeString, 'HH:mm:ss', new Date());

  // Format to 12-hour format with AM/PM
  const formattedTime = format(parsedTime, 'hh:mm a'); // Example: "10:30 AM" or "04:42 PM"

  return <span>{formattedTime}</span>;
};

export default FormattedTime;
