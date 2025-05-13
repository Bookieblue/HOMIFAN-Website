import { PaymentMethod, PaymentStatus, PaymentType, Status } from "../api/enum";

export interface IMember {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  cityAndState: string;
  areaOfInterest: string;
  methodOfContact: string;
  prayerRequest?: string;
  replied: boolean;
}

export interface IArticle {
  title: string;
  content: string;
  imageUrl: string;
  status: Status;
  author: string;
  language: string;
}

export interface IBook {
  id: string;
  title: string;
  description: string;
  price: number;
  bookType: string;
  language: string;
  dimension: string;
  pages: number;
  status: Status;
  authorName: string;
  authorBio: string;
  authorImage?: string;
  coverImage: string;
  pdfUrl?: string; // Add this field for EBook PDF URLs
}

export interface IBlog {
  id: string;
  title: string;
  content: string;
  category?: string;
  attachments: string[];
  status: Status;
  datePublished?: Date;
  author: string;
}

export interface IPrayerRequest {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  cityAndState: string;
  methodOfContact: string;
  prayerRequest: string;
  replied: boolean;
}

export interface IDonation {
  id: string;
  amount: number;
  donationType: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  cityAndState: string;
  paymentStatus: PaymentStatus;
  trxfReference?: string;
}

export interface IEventForm {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  cityAndState: string;
  methodOfContact: string;
  eventId: string;
}

export interface IEvent {
  id: string;
  title: string;
  description?: string | undefined;
  date: Date;
  time: string;
  location: string;
  meetingLink: string;
  eventImage?: string;
  status: Status;
}

export interface IContact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  cityAndState: string;
  methodOfContact: string;
  message: string;
  replied: boolean;
}

export interface ISermon {
  id: string;
  title: string;
  description: string;
  preacher: string;
  publishedDate?: Date;
  link: string;
  thumbnail: string;
  status: Status;
}

export interface IAdmin {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface IAdminLogin {
  email: string;
  password: string;
}

export interface IAuthToken {
  id: string;
  username: string;
  email: string;
  role: string;
}
