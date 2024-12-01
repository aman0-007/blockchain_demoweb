import React from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  multiline?: boolean;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  multiline,
  error,
  ...props
}) => {
  const Component = multiline ? 'textarea' : 'input';
  
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <motion.div
        initial={false}
        animate={{ scale: error ? [1, 1.02, 1] : 1 }}
        transition={{ duration: 0.2 }}
      >
        <Component
          {...props}
          className={`
            w-full px-3 py-2 border rounded-lg shadow-sm
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-colors
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${multiline ? 'min-h-[100px] resize-y' : ''}
          `}
        />
      </motion.div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};