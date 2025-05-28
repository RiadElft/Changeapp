import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  highlight = false
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden';
  const highlightClasses = highlight ? 'border-2 border-yellow-400' : '';
  
  return (
    <div className={`${baseClasses} ${highlightClasses} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

export const CardBody: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${className}`}>
    {children}
  </div>
);

export default Card;