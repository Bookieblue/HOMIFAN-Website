import { PaymentStatus, Status } from "../api/enum";

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
  coverImage: string;
  price: number;
  rating: number;
  status: Status;
  language?: string;
  bookType?: string;
  pages: number;
  dimension?: string;
  authorName: string;
  authorBio?: string;
  authorImage?: string;
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
  description?: string;
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
  date?: Date;
  link: string;
  thumbnail: string;
}
