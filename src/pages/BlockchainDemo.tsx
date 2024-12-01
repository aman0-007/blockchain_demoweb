import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createSHA256 } from 'hash-wasm';
import { Block } from '../components/Block';

interface BlockData {
  index: number;
  data: string;
  hash: string;
  prevHash: string;
}

export const BlockchainDemo: React.FC = () => {
  const [blocks, setBlocks] = useState<BlockData[]>([]);

  const computeHash = async (data: string, prevHash: string) => {
    const hasher = await createSHA256();
    hasher.init();
    hasher.update(data + prevHash);
    return hasher.digest('hex');
  };

  const initializeBlocks = async () => {
    const newBlocks: BlockData[] = [];
    let previousHash = '0000000000000000000000000000000000000000000000000000000000000000';

    for (let i = 0; i < 5; i++) {
      const data = `Block ${i + 1} Data`;
      const hash = await computeHash(data, previousHash);
      newBlocks.push({
        index: i + 1,
        data,
        hash,
        prevHash: previousHash,
      });
      previousHash = hash;
    }

    setBlocks(newBlocks);
  };

  useEffect(() => {
    initializeBlocks();
  }, []);

  const handleDataChange = async (index: number, newData: string) => {
    const newBlocks = [...blocks];
    newBlocks[index].data = newData;

    // Recompute hashes for this and all subsequent blocks
    for (let i = index; i < newBlocks.length; i++) {
      const prevHash = i === 0 ? '0'.repeat(64) : newBlocks[i - 1].hash;
      newBlocks[i].hash = await computeHash(newBlocks[i].data, prevHash);
    }

    setBlocks(newBlocks);
  };

  const isBlockValid = (block: BlockData, index: number) => {
    if (index === 0) {
      return block.prevHash === '0'.repeat(64);
    }
    return block.prevHash === blocks[index - 1].hash;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blockchain in Action</h1>
        <p className="text-gray-600">
          Modify block data to see how it affects the entire chain
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blocks.map((block, index) => (
          <Block
            key={block.index}
            index={block.index}
            data={block.data}
            hash={block.hash}
            prevHash={block.prevHash}
            isValid={isBlockValid(block, index)}
            onDataChange={(data) => handleDataChange(index, data)}
          />
        ))}
      </div>
    </div>
  );
};