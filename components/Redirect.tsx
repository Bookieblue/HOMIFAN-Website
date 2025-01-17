import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Redirect = (data: any, url: string) => {
  const router = useRouter();

  useEffect(() => {
    if (data === undefined) {
      router.push(url);
    }
  }, [data, router, url]);

  return null;
};

export default Redirect;
