import React from 'react';
import { motion } from 'framer-motion';
import { Hash } from 'lucide-react';

interface BlockProps {
  index: number;
  data: string;
  hash: string;
  prevHash?: string;
  isValid?: boolean;
  onDataChange?: (data: string) => void;
}

export const Block: React.FC<BlockProps> = ({
  index,
  data,
  hash,
  prevHash,
  isValid = true,
  onDataChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`bg-white rounded-lg shadow-lg p-6 ${!isValid ? 'border-2 border-red-500' : ''}`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Block #{index}</h3>
          <Hash className={`w-6 h-6 ${isValid ? 'text-green-500' : 'text-red-500'}`} />
        </div>
        
        {prevHash && (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">Previous Hash</label>
            <div className="bg-gray-50 p-2 rounded text-sm font-mono break-all">
              {prevHash}
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-600">Data</label>
          {onDataChange ? (
            <textarea
              value={data}
              onChange={(e) => onDataChange(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={2}
            />
          ) : (
            <div className="bg-gray-50 p-2 rounded text-sm break-all">
              {data}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-600">Hash</label>
          <div className="bg-gray-50 p-2 rounded text-sm font-mono break-all">
            {hash}
          </div>
        </div>
      </div>
    </motion.div>
  );
};