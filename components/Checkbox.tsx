
import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <input 
        type="checkbox" 
        className="form-checkbox h-5 w-5 rounded bg-light-bg dark:bg-dark-card border-light-secondary/50 dark:border-dark-secondary/50 text-light-primary dark:text-dark-primary focus:ring-light-primary dark:focus:ring-dark-primary transition duration-150 ease-in-out"
        {...props} 
      />
      <span className="text-light-text dark:text-dark-text">{label}</span>
    </label>
  );
};

export default Checkbox;
