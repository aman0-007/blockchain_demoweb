import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash } from 'lucide-react';
import { EncryptionCard } from './EncryptionCard';
import { Input } from './Input';
import { hashAlgorithms } from '../utils/hash';

export const HashSection: React.FC = () => {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<keyof typeof hashAlgorithms>('SHA256');
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);

  const handleHash = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const result = await hashAlgorithms[algorithm](input);
      setHash(result);
    } catch (err) {
      console.error('Hashing failed:', err);
    }
    setLoading(false);
  };

  return (
    <EncryptionCard
      title="Hash Functions"
      description="Secure one-way hash functions"
      icon={<Hash className="w-6 h-6 text-blue-600" />}
    >
      <div className="space-y-4">
        <Input
          label="Text to hash"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text..."
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Hash Algorithm
          </label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as keyof typeof hashAlgorithms)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.keys(hashAlgorithms).map((algo) => (
              <option key={algo} value={algo}>
                {algo}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleHash}
            disabled={!input || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Computing...' : 'Generate Hash'}
          </motion.button>
        </div>
        {hash && (
          <div className="relative">
            <Input
              label="Hash Result"
              value={hash}
              readOnly
              multiline
            />
          </div>
        )}
      </div>
    </EncryptionCard>
  );
};