import React from 'react';
import { motion } from 'framer-motion';

const MeshTopology: React.FC<{ p: number }> = ({ p }) => {
  const size = Math.ceil(Math.sqrt(p));
  const spacing = 70;
  const offset = 50;

  return (
    <svg width="400" height="400" viewBox="0 0 400 400" className="drop-shadow-2xl">
      {/* Horizontal and Vertical Rails */}
      {Array.from({ length: size }).map((_, i) => (
        <React.Fragment key={i}>
           <line x1={offset} y1={offset + i*spacing} x2={offset + (size-1)*spacing} y2={offset + i*spacing} stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
           <line x1={offset + i*spacing} y1={offset} x2={offset + i*spacing} y2={offset + (size-1)*spacing} stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        </React.Fragment>
      ))}

      {/* Nodes */}
      {Array.from({ length: p }).map((_, i) => {
        const row = Math.floor(i / size);
        const col = i % size;
        const x = offset + col * spacing;
        const y = offset + row * spacing;

        return (
          <g key={i}>
            <motion.circle
              cx={x} cy={y} r="16"
              fill="#1e293b"
              stroke="#8b5cf6"
              strokeWidth="3"
              initial={{ opacity: 0, y: y + 20 }}
              animate={{ opacity: 1, y: y }}
              transition={{ delay: i * 0.05 }}
            />
            <text x={x} y={y} fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" dy=".3em">{i}</text>
            
            {/* Comm flow simulation (Row) */}
            <motion.circle
               cx={x} cy={y} r="3"
               fill="#f59e0b"
               animate={{ 
                  opacity: [0, 1, 0],
                  cx: [x, x + spacing]
               }}
               transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
             {/* Comm flow simulation (Col) */}
             <motion.circle
               cx={x} cy={y} r="3"
               fill="#ef4444"
               animate={{ 
                  opacity: [0, 1, 0],
                  cy: [y, y + spacing]
               }}
               transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </g>
        );
      })}
    </svg>
  );
};

export default MeshTopology;
