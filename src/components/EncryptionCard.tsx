import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface EncryptionCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

export const EncryptionCard: React.FC<EncryptionCardProps> = ({
  title,
  description,
  children,
  icon,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gray-100 rounded-lg">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  );
};

interface CopyButtonProps {
  text: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? <Check size={20} /> : <Copy size={20} />}
    </motion.button>
  );
};