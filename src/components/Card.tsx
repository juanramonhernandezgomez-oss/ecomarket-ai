import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={`bg-slate-900 rounded-lg border border-slate-700 p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};
