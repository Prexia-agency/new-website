import React from 'react';

const BentoGrid = () => (
  <section className="safe-paddings mt-[200px] lg:mt-36 md:mt-32 sm:mt-20">
    <div className="container">
      <div className="grid gap-5 grid-cols-[338px_1fr_338px] grid-rows-[212px_1fr_212px] h-[644px] mt-20 max-w-[1036px] mx-auto lg:grid-cols-[260px_1fr_260px] lg:grid-rows-[164px_1fr_164px] lg:gap-[18px] lg:h-[500px] lg:mt-16 md:grid-cols-2 md:grid-rows-[422px_644px_200px] md:gap-5 md:max-w-[712px] md:h-auto md:mx-auto sm:grid-cols-1 sm:grid-rows-[398px_156px_398px_156px_398px] sm:gap-2.5 sm:max-w-[328px]">
        <div className="relative row-span-2 flex flex-col py-6 bg-gray-9 rounded-2xl lg:py-4 lg:rounded-xl md:row-span-1 md:py-6 md:rounded-2xl">
          <img
            className="!absolute -inset-1.5 w-[102%] h-[102%] object-cover"
            src="/images/bgwide.png"
            alt=""
            aria-hidden
          />
        </div>
        <div className="relative overflow-hidden row-start-3 flex flex-grow items-center justify-center bg-gray-9 rounded-2xl lg:rounded-xl md:rounded-2xl sm:row-start-2">
          <img
            className="!absolute -inset-1.5 w-[102%] h-[102%] object-cover"
            src="/images/bgwide.png"
            alt=""
            aria-hidden
          />
        </div>
        <div className="relative overflow-hidden row-span-3 flex justify-center items-center bg-gray-9 rounded-2xl lg:rounded-xl md:row-span-1 md:col-span-2 md:rounded-2xl sm:col-span-1">
          <img
            className="!absolute -inset-1.5 w-[102%] h-[102%] object-cover"
            src="/images/bgwide.png"
            alt=""
            aria-hidden
          />
        </div>
        <div className="relative overflow-hidden flex flex-grow items-center justify-center bg-gray-9 rounded-2xl lg:rounded-xl md:rounded-2xl">
          <img
            className="!absolute -inset-1.5 w-[102%] h-[102%] object-cover"
            src="/images/bgwide.png"
            alt=""
            aria-hidden
          />
        </div>
        <div className="relative overflow-hidden row-span-2 flex flex-col justify-end bg-gray-9 rounded-2xl lg:rounded-xl md:row-span-1 md:row-start-1 md:col-start-2 md:rounded-2xl sm:row-start-auto sm:col-start-1">
          <img
            className="!absolute -inset-1.5 w-[102%] h-[102%] object-cover"
            src="/images/bgwide.png"
            alt=""
            aria-hidden
          />
        </div>
      </div>
    </div>
  </section>
);

export default BentoGrid;