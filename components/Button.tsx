
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, icon, variant = 'primary', ...props }) => {
  const baseClasses = "px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 inline-flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-light-primary dark:bg-dark-primary text-white hover:bg-opacity-90 dark:hover:bg-opacity-90 focus:ring-light-primary dark:focus:ring-dark-primary",
    secondary: "bg-light-secondary/20 dark:bg-dark-secondary/20 text-light-text dark:text-dark-text hover:bg-light-secondary/30 dark:hover:bg-dark-secondary/30 focus:ring-light-secondary dark:focus:ring-dark-secondary",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
