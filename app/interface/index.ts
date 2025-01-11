export interface IMember {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  cityAndState: string;
  areaOfInterest: string;
  methodOfContact: string;
  prayerRequest?: string;
}

export interface IArticle {
  title: string;
  content: string;
  attachments?: string[];
  author: string;
}

export interface IPrayerRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  cityAndState: string;
  methodOfContact: string;
  prayerRequest: string;
}

export interface IEvent {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  cityAndState: string;
  methodOfContact: string;
}

export interface IPublication {
  title: string;
  description: string;
  coverUrl?: string;
  price: number;
  rating?: number;
}

export interface IDonationRequest {
  amount: number;
  donationType: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  state: string;
  paymentStatus?: string;
  trxfReference?: String;
}
