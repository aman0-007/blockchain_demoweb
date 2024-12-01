import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createSHA256 } from 'hash-wasm';
import { Block } from '../components/Block';

export const SingleBlockDemo: React.FC = () => {
  const [data, setData] = useState('');
  const [hash, setHash] = useState('');

  useEffect(() => {
    const computeHash = async () => {
      const hasher = await createSHA256();
      hasher.init();
      hasher.update(data);
      setHash(hasher.digest('hex'));
    };
    computeHash();
  }, [data]);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Understanding Blocks</h1>
        <p className="text-gray-600">
          See how changing data affects the block's hash in real-time
        </p>
      </motion.div>

      <Block
        index={1}
        data={data}
        hash={hash}
        onDataChange={setData}
      />
    </div>
  );
};