import { Facebook, Instagram, X, Youtube } from 'lucide-react';
import Link from 'next/link';

const icons = [
  {
    icon: <Instagram key={1} strokeWidth={2} size={24} absoluteStrokeWidth />,
    url: 'https://www.instagram.com/',
  },
  {
    icon: <Facebook key={2} strokeWidth={2} size={24} absoluteStrokeWidth />,
    url: 'https://www.facebook.com/',
  },
  {
    icon: <X key={3} strokeWidth={2} size={24} absoluteStrokeWidth />,
    url: 'https://www.x.com/',
  },
  {
    icon: <Youtube key={4} strokeWidth={2} size={24} absoluteStrokeWidth />,
    url: 'https://www.youtube.com/',
  },
];

export const SocialIcons = () => {
  return (
    <div className="flex gap-4 mb-6 *:border *:rounded-xl *:border-black-50/80 *:p-1.5">
      {icons.map(item => (
        <Link className="hover:shadow-md" key={item.url} href={item.url}>
          {item.icon}
        </Link>
      ))}
    </div>
  );
};
