import React from 'react';

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center w-full py-6 sm:py-8 md:py-10">
      {/* Logo Section */}
      <div className="logo font-bold text-white text-2xl sm:text-3xl md:text-4xl mb-4">
        <span className="text-green-500">&lt;</span>
        <span>Pass</span>
        <span className="text-green-500">OP/&gt;</span>
      </div>

      {/* Footer Text */}
      <div className="flex flex-col sm:flex-row justify-center items-center text-sm sm:text-base md:text-lg">
        <span>Created with</span>
        <img
          className="w-5 sm:w-6 md:w-7 mx-2"
          src="icons/heart.png"
          alt="heart"
        />
        <span>
          by{' '}
          <a
            href="https://github.com/AmanKantakwar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:underline"
          >
            Aman Kantakwar
          </a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
