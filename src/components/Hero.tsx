import React from 'react';

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[300px] bg-gradient-to-r from-purple-700 via-purple-900 to-indigo-800 text-white px-6 rounded-lg shadow-lg animate-fadeIn">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center drop-shadow-lg">
        Welcome to MeetingBooker
      </h1>
      <p className="max-w-xl text-lg md:text-xl text-center mb-6 drop-shadow-md">
        Забронюй переговорну кімнату швидко і зручно. Управляй бронюваннями легко.
      </p>
      <button className="bg-yellow-400 text-purple-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-300 transition">
        Почати зараз
      </button>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
