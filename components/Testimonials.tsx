import React from 'react';
import { Slides } from './Slides';
import { CarouselItem } from './ui/carousel';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  imageUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: 'Felix Ikumapayi recounts his near-death experience in 2020, surviving spiritual attacks and COVID-19 symptoms through fervent prayers and divine intervention.',
    author: 'Felix O. Ikumapayi, MFR Fdc, FCPM, JP',
    role: 'Member',
    imageUrl: '/sermon.jpeg',
  },
  {
    id: 2,
    text: 'Revd. Debo Ijagbuji testifies to God&#39;s goodness and healing power after undergoing surgery, despite initial fears and health challenges, through prayers and support from the church.',
    author: 'Revd. Debo Ijagbuji',
    role: 'Member',
    imageUrl: '/sermon.jpeg',
  },
  {
    id: 3,
    text: 'Mrs. Shola Shittu testifies to God&#39;s healing power, delivering her from a mysterious headache that defied medical interventions after prayers at an Annual Convention.',
    author: 'Mrs. Shola Shittu',
    role: 'Member',
    imageUrl: '/sermon.jpeg',
  },
  {
    id: 4,
    text: 'Adeola Odumaran Joseph testifies to God&#39;s answer to her prayer, connecting her with her life partner at the 2021 Church Convention, and blessing them with a child.',
    author: 'Adeola Odumaran Joseph',
    role: 'Member',
    imageUrl: '/sermon.jpeg',
  },
  {
    id: 5,
    text: "L/Rev Adeola Bankole testifies to God's answers to prayers, delivering her daughter from barrenness and restoring her family's inheritance after 25 years.",
    author: 'L/Rev Adeola Bankole',
    role: 'Member',
    imageUrl: '/sermon.jpeg',
  },
  {
    id: 6,
    text: 'Damilola Bankole testifies to God&#39;s deliverance from a difficult lecturer, assigning a new supervisor who helped her earn a distinction in her project work.',
    author: 'Damilola Bankole',
    role: 'Member',
    imageUrl: '/sermon.jpeg',
  },
  {
    id: 7,
    text: 'Mrs. Yinka Sodiq testifies to God&#39;s provision, ending 12 years of unemployment with a good job after praying fervently at the 2016 Annual Convention.',
    author: 'Mrs. Yinka Sodiq',
    role: 'Member',
    imageUrl: '/sermon.jpeg',
  },
 
];

const Testimonials = () => {
  return (
    <section className="mb-20 padding-container max-container">
      <div className="mx-auto">
        <div className="text-center">
          <p>Members feedback</p>
          <h2 className="text-3xl font-bold mb-8">
            Testimonials from Church Members
          </h2>
        </div>
        <Slides>
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="bg-white border p-6 rounded-lg shadow-md h-[300px] flex flex-col justify-between">
                <div>
                <p className="text-sm lg:text-lg font-light text-gray-700 mb-4">
                  &quot;{testimonial.text}&quot;
                </p>
                </div>
                <div className="flex items-center">
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="bg-yellow-50 w-full h-2 mt-2"></div>
              </div>
            </CarouselItem>
          ))}
        </Slides>
      </div>
    </section>
  );
};

export default Testimonials;
