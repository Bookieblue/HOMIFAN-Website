import React from 'react';

interface HeadingProps {
  heading: string;
  subHeading: string;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  heading,
  subHeading,
  className = '',
}) => {
  return (
    <div className={`grid mx-auto max-w-lg gap-1 md:gap-2 ${className}`}>
      <p className="uppercase text-sm md:text-base text-center">{subHeading}</p>
      <h2 className="text-center text-3xl lg:text-4xl font-bold uppercase">
        {heading}
      </h2>
    </div>
  );
};

export default Heading;
