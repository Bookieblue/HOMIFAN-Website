import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ArticleResType } from './type';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useArticle = () =>
  useQuery<ArticleResType>({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data } = await axios.get(`${baseUrl}/api/articles`);
      return data.data;
    },
  });
