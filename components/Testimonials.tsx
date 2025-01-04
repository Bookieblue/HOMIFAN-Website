import React from 'react';

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
    text: 'Before joining House of Prayer Ministries, I struggled with understanding my purpose and feeling spiritually stagnant. The teachings here have helped me grow deeper in my relationship with God.',
    author: 'Mr. Ogunleye J.',
    role: 'Member',
    imageUrl: '/sermon.jpeg',
  },
  {
    id: 2,
    text: 'I came to House of Prayer Ministries at a time when I was battling severe health challenges. The doctors had given up hope, but Pastor Oluwayomi and the prayer team stood with me in faith.',
    author: 'Mr. Ayomide J.',
    role: 'Member',
    imageUrl: '/sermon.jpeg',
  },
  {
    id: 3,
    text: 'After the sudden loss of my father, I was overwhelmed with grief and anger. I felt lost and disconnected from God. Attending services at House of Prayer Ministries brought me back to a place of peace.',
    author: 'Miss. Abayomi S.',
    role: 'Member',
    imageUrl: '/sermon.jpeg',
  },
  {
    id: 4,
    text: 'Before joining House of Prayer Ministries, I struggled with understanding my purpose and feeling spiritually stagnant. The teachings here have helped me grow deeper in my relationship with God.',
    author: 'Mr. Ogunleye J.',
    role: 'Member',
    imageUrl: '/sermon.jpeg',
  },
  {
    id: 5,
    text: 'I came to House of Prayer Ministries at a time when I was battling severe health challenges. The doctors had given up hope, but Pastor Oluwayomi and the prayer team stood with me in faith.',
    author: 'Mr. Ayomide J.',
    role: 'Member',
    imageUrl: '/sermon.jpeg',
  },
  {
    id: 6,
    text: 'After the sudden loss of my father, I was overwhelmed with grief and anger. I felt lost and disconnected from God. Attending services at House of Prayer Ministries brought me back to a place of peace.',
    author: 'Miss. Abayomi S.',
    role: 'Member',
    imageUrl: '/sermon.jpeg',
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 mb-20  padding-container max-container">
      <div className=" mx-auto text-center">
        <p>Members feedback</p>
        <h2 className="text-3xl font-bold mb-8">
          Testimonials from Church Members
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(testimonial => (
            <div
              key={testimonial.id}
              className=" bg-white border p-6 rounded-lg shadow-md"
            >
              <p className="text-lg font-light text-gray-700 mb-4">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div className="text-left">
                  <p className="text-sm font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="bg-yellow-50 w-full h-2 mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
