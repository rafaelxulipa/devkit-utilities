
import React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: number;
}

const Slider: React.FC<SliderProps> = ({ label, value, ...props }) => {
  return (
    <div className="w-full">
      <label className="flex justify-between items-center text-sm font-medium text-light-secondary dark:text-dark-secondary mb-2">
        <span>{label}</span>
        <span className="px-2 py-1 text-xs font-bold bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary rounded-md">{value}</span>
      </label>
      <input
        type="range"
        value={value}
        className="w-full h-2 bg-light-secondary/20 dark:bg-dark-secondary/20 rounded-lg appearance-none cursor-pointer accent-light-primary dark:accent-dark-primary"
        {...props}
      />
    </div>
  );
};

export default Slider;