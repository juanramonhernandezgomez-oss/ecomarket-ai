/**
 * Componente Container reutilizable
 */

import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Container = ({ children, maxWidth = 'lg', className, ...props }: ContainerProps) => {
  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 ${maxWidths[maxWidth]} ${className || ''}`} {...props}>
      {children}
    </div>
  );
};
