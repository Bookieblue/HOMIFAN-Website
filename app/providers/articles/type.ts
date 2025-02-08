export interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  status: string;
  language: string;
  author: string;
  datePublished: null;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  totalItems: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export type ArticleResType = {
  articles: Array<Article>;
} & Pagination;
