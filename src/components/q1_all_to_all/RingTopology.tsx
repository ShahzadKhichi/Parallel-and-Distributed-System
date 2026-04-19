import React from 'react';
import { motion } from 'framer-motion';

const RingTopology: React.FC<{ p: number }> = ({ p }) => {
  const radius = 150;
  const centerX = 200;
  const centerY = 200;
  const nodes = Array.from({ length: p }, (_, i) => ({
    id: i,
    angle: (i * 2 * Math.PI) / p - Math.PI / 2,
  }));

  const getPos = (angle: number) => ({
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  });

  return (
    <svg width="400" height="400" viewBox="0 0 400 400" className="drop-shadow-2xl">
      {/* Connections (Edges) */}
      <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
      
      {/* Active communication pulse */}
      <motion.circle
        cx={centerX} cy={centerY} r={radius}
        fill="none" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="4"
        strokeDasharray="10 20"
        animate={{ strokeDashoffset: [0, 30] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Nodes */}
      {nodes.map((node) => {
        const { x, y } = getPos(node.angle);
        return (
          <g key={node.id}>
            <motion.circle
              cx={x} cy={y} r="18"
              fill="#1e293b"
              stroke="#3b82f6"
              strokeWidth="3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: node.id * 0.1, type: "spring" }}
            />
            <text
              x={x} y={y}
              fill="white"
              fontSize="10"
              fontWeight="bold"
              textAnchor="middle"
              dy=".3em"
              className="pointer-events-none"
            >
              {node.id}
            </text>
            
            {/* Pulsing data packet simulation */}
            <motion.circle
               cx={x} cy={y} r="4"
               fill="#00ff99"
               animate={{ 
                 opacity: [0, 1, 0],
                 scale: [1, 2, 1],
                 x: [x, centerX + radius * Math.cos(node.angle + (2 * Math.PI / p))],
                 y: [y, centerY + radius * Math.sin(node.angle + (2 * Math.PI / p))]
               }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        );
      })}
    </svg>
  );
};

export default RingTopology;
