
import React from 'react';

interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error';
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

const SuccessIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const ErrorIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Toast: React.FC<{ message: ToastMessage; onDismiss: (id: number) => void }> = ({ message, onDismiss }) => {
    const isSuccess = message.type === 'success';

    return (
        <div 
            className={`flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-light-card dark:bg-dark-card divide-x divide-gray-200 rounded-lg shadow-lg dark:text-gray-400 dark:divide-gray-700 space-x-reverse transition-all duration-300 transform animate-fade-in-down`}
            role="alert"
        >
            <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${isSuccess ? 'bg-green-100 dark:bg-green-800 text-green-500 dark:text-green-200' : 'bg-red-100 dark:bg-red-800 text-red-500 dark:text-red-200'}`}>
                {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
            </div>
            <div className="pl-4 text-sm font-normal text-light-text dark:text-dark-text">{message.message}</div>
        </div>
    );
};

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-5 right-5 z-50 space-y-4">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast} onDismiss={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
