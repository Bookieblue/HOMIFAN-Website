export interface IMember {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  cityAndState: string;
  areaOfInterest: string;
  methodOfContact: string;
}

export interface IArticle {
  title: string;
  content: string;
  attachments?: string[];
  author: string;
}
