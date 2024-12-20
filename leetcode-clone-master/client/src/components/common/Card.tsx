import React from 'react';

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-800 p-5 shadow-md rounded-md w-full max-w-md text-white flex flex-col items-center justify-center">
      {children}
    </div>
  );
}

export default Card;
