import { ReactNode } from 'react';

const GlassCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="py-10 grid gap-8 items-start justify-center">
      <div className="relative group">
        <div className="absolute -inset-0.5 h-auto w-auto bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-200"></div>
        <div className="relative p-10 h-[400px] w-auto bg-black rounded-lg text-lg group-hover:text-gray-100 transition duration-200 border border-slate-800">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlassCard;
