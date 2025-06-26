import React from 'react';

const Section = ({ 
  id,
  title,
  subtitle,
  children,
  variant = 'default',
  className = '',
  titleClassName = '',
  contentClassName = ''
}) => {
  const variantClasses = {
    default: 'py-8',
    hero: 'py-16',
    compact: 'py-4',
    large: 'py-20'
  };

  return (
    <section 
      id={id}
      className={`${variantClasses[variant]} ${className}`}
    >
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && (
              <h2 className={`text-3xl font-bold text-gray-800 mb-4 ${titleClassName}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className={contentClassName}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section; 