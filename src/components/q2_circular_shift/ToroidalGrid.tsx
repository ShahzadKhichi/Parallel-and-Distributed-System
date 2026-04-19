import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToroidalGridProps {
  grid: number[][];
  stage: 'initial' | 'row-shift' | 'column-shift' | 'final';
  onCellClick?: (row: number, col: number, value: number) => void;
}

const ToroidalGrid: React.FC<ToroidalGridProps> = memo(({ grid, stage, onCellClick }) => {
  const cols = grid[0].length;
  
  const stageColors = {
    'initial': 'from-blue-500 to-blue-600',
    'row-shift': 'from-purple-500 to-purple-600',
    'column-shift': 'from-orange-500 to-orange-600',
    'final': 'from-green-500 to-green-600'
  };
  
  const stageLabels = {
    'initial': 'Initial State',
    'row-shift': 'Stage 1: Row Shift →',
    'column-shift': 'Stage 2: Column Shift ↓',
    'final': 'Final State ✓'
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-center">
        <span className={`inline-block px-6 py-2 rounded-full text-white font-bold bg-gradient-to-r shadow-lg transition-all duration-500 ${stageColors[stage]}`}>
          {stageLabels[stage]}
        </span>
      </div>
      
      <div 
        className="grid gap-3 bg-gray-800/50 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-700"
        style={{ 
          gridTemplateColumns: `repeat(${cols}, minmax(70px, 100px))`,
        }}
      >
        {grid.map((row, i) => (
          row.map((value, j) => (
            <motion.div
              key={`${i}-${j}-${value}`}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 25,
                delay: (i + j) * 0.01 
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              onClick={() => onCellClick?.(i, j, value)}
              className={`
                relative aspect-square bg-gradient-to-br rounded-xl 
                shadow-lg cursor-pointer transition-all duration-500 overflow-hidden
                ${stage === 'initial' && 'from-blue-500 to-blue-700'}
                ${stage === 'row-shift' && 'from-purple-500 to-purple-700'}
                ${stage === 'column-shift' && 'from-orange-500 to-orange-700'}
                ${stage === 'final' && 'from-green-500 to-green-700'}
                hover:shadow-blue-500/20 hover:border-white/20 border border-transparent
              `}
            >
              <div className="absolute top-1.5 left-2.5 text-[10px] text-white/40 font-mono">
                {i},{j}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white tracking-tight">
                  {value}
                </span>
              </div>
              
              <AnimatePresence>
                {stage === 'row-shift' && (
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 30, opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="w-full h-1 bg-white/20 blur-sm" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ))}
      </div>
    </div>
  );
});

ToroidalGrid.displayName = 'ToroidalGrid';
export default ToroidalGrid;
