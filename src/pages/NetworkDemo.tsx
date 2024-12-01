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

interface Node {
  id: number;
  blocks: BlockData[];
}

export const NetworkDemo: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);

  const computeHash = async (data: string, prevHash: string) => {
    const hasher = await createSHA256();
    hasher.init();
    hasher.update(data + prevHash);
    return hasher.digest('hex');
  };

  const initializeNetwork = async () => {
    const networkNodes: Node[] = [];
    
    // Create 3 nodes with identical blockchains
    for (let nodeId = 0; nodeId < 3; nodeId++) {
      const blocks: BlockData[] = [];
      let previousHash = '0'.repeat(64);

      for (let i = 0; i < 3; i++) {
        const data = `Block ${i + 1} Data`;
        const hash = await computeHash(data, previousHash);
        blocks.push({
          index: i + 1,
          data,
          hash,
          prevHash: previousHash,
        });
        previousHash = hash;
      }

      networkNodes.push({ id: nodeId, blocks });
    }

    setNodes(networkNodes);
  };

  useEffect(() => {
    initializeNetwork();
  }, []);

  const handleDataChange = async (nodeId: number, blockIndex: number, newData: string) => {
    const newNodes = [...nodes];
    const node = newNodes[nodeId];
    node.blocks[blockIndex].data = newData;

    // Recompute hashes for this and all subsequent blocks in this node
    for (let i = blockIndex; i < node.blocks.length; i++) {
      const prevHash = i === 0 ? '0'.repeat(64) : node.blocks[i - 1].hash;
      node.blocks[i].hash = await computeHash(node.blocks[i].data, prevHash);
    }

    setNodes(newNodes);
  };

  const isBlockValid = (nodeId: number, block: BlockData, index: number) => {
    const node = nodes[nodeId];
    if (index === 0) {
      return block.prevHash === '0'.repeat(64);
    }
    return block.prevHash === node.blocks[index - 1].hash;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Distributed Network</h1>
        <p className="text-gray-600">
          Observe how changes in one node affect network consensus
        </p>
      </motion.div>

      <div className="space-y-12">
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: node.id * 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-800">Node {node.id + 1}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {node.blocks.map((block, index) => (
                <Block
                  key={`${node.id}-${block.index}`}
                  index={block.index}
                  data={block.data}
                  hash={block.hash}
                  prevHash={block.prevHash}
                  isValid={isBlockValid(node.id, block, index)}
                  onDataChange={(data) => handleDataChange(node.id, index, data)}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};