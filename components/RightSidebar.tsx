import React from 'react';
import Image from 'next/image';
import { history } from '@/app/constants';

const RightSidebar = () => {
  return (
    <section className="w-full bg-white p-9 h-full ">
      <div>
        <p className="medium-20 text-gray-40 mb-4">History</p>
        <div className="relative">
          {/* Vertical dashed line */}
          <div className="absolute left-5 h-[350px] mt-5 w-0.5 border-l border-dashed border-gray-400"></div>

          {/* Timeline items */}
          <div className="flex flex-col items-start gap-8 ml-1">
          {history.map((item, index) => (
              <div key={index} className="relative flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full overflow-hidden border border-gray-300 flex-shrink-0 flexCenter cursor-pointer ${index === 0 ? 'bg-blue-50' : 'bg-white'}`}>
                  <Image 
                    src={
                      index === 0 ? '/envelope-open.svg' : 
                      index === 3 ? '/folder.svg' : 
                      '/envelope-close.svg'
                    } 
                    alt={`Icon ${index + 1}`} 
                    width={15}
                    height={20}
                  />
                </div>
                <div className="ml-8 mt-3 cursor-pointer ">
                  <div className={`font-bold regular-16  ${index === 0 ? 'text-blue-50 medium-16' : 'text-gray-40'}`}>{item.subject}</div>
                  <div className="text-gray-30 regular-12">July 2, 2021  8am</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
