import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ToroidalGrid from './ToroidalGrid';
import { computeCircularShift, verifyShift } from '@/utils/algorithms/toroidalShift';
import { Play, RotateCcw, TrendingUp, Zap, MoveHorizontal, RefreshCw, ChevronRight, ChevronLeft } from 'lucide-react';

const CircularShiftVisualizer: React.FC = () => {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [k, setK] = useState(6);
  const [direction, setDirection] = useState<'right' | 'left'>('left');
  const [stage, setStage] = useState<'initial' | 'row-shift' | 'column-shift' | 'final'>('initial');
  const [grid, setGrid] = useState<number[][]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [metrics, setMetrics] = useState<{ rowShift: number; colShift: number; steps: number } | null>(null);
  
  const totalNodes = rows * cols;
  const optimizedK = ((k % totalNodes) + totalNodes) % totalNodes;
  
  const initGrid = useCallback(() => {
    const newGrid: number[][] = [];
    for (let i = 0; i < rows; i++) {
        newGrid[i] = [];
        for (let j = 0; j < cols; j++) {
            newGrid[i][j] = i * cols + j;
        }
    }
    setGrid(newGrid);
    setStage('initial');
    setMetrics(null);
  }, [rows, cols]);

  useEffect(() => {
    initGrid();
  }, [initGrid]);
  
  const runAnimation = useCallback(async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const result = computeCircularShift(rows, cols, k, direction);
    setMetrics({
        rowShift: result.rowShiftAmount,
        colShift: result.colShiftAmount,
        steps: result.totalSteps
    });
    
    setStage('initial');
    initGrid();
    await new Promise(r => setTimeout(r, 800));
    
    setStage('row-shift');
    const effectiveK = direction === 'right' ? optimizedK : (totalNodes - optimizedK) % totalNodes;
    const rowS = effectiveK % cols;
    
    const afterRow = result.initialGrid.map(row => {
        const shifted = [...row];
        for (let i = 0; i < cols; i++) {
            shifted[(i + rowS) % cols] = row[i];
        }
        return shifted;
    });
    setGrid(afterRow);
    await new Promise(r => setTimeout(r, 1200));
    
    setStage('column-shift');
    setGrid(result.finalGrid);
    await new Promise(r => setTimeout(r, 1200));
    
    setStage('final');
    setIsAnimating(false);
  }, [rows, cols, k, direction, optimizedK, totalNodes, initGrid, isAnimating]);
  
  const isCorrect = useMemo(() => {
    if (grid.length === 0 || stage !== 'final') return null;
    const initial = Array(rows).fill(null).map((_, i) => 
        Array(cols).fill(null).map((_, j) => i * cols + j)
    );
    return verifyShift(initial, grid, k, direction);
  }, [grid, rows, cols, k, direction, stage]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2">Toroidal Mesh Shift</h2>
          <p className="text-gray-400">Visualize neighbor-only circular shifting in parallel</p>
        </div>
        <div className="flex items-center gap-4 bg-gray-800/50 p-2 rounded-2xl border border-gray-700">
          <button 
             onClick={() => setDirection('left')}
             className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${direction === 'left' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
             <ChevronLeft size={18} /> Left
          </button>
          <button 
             onClick={() => setDirection('right')}
             className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${direction === 'right' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
             Right <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-800/50 p-6 rounded-3xl border border-gray-700 backdrop-blur-md">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <RefreshCw size={20} className="text-blue-400" /> Parameters
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <label className="text-gray-400">Rows (R)</label>
                  <span className="text-white font-mono">{rows}</span>
                </div>
                <input
                  type="range" min="2" max="8" value={rows}
                  onChange={(e) => setRows(parseInt(e.target.value))}
                  disabled={isAnimating}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <label className="text-gray-400">Columns (C)</label>
                  <span className="text-white font-mono">{cols}</span>
                </div>
                <input
                  type="range" min="2" max="8" value={cols}
                  onChange={(e) => setCols(parseInt(e.target.value))}
                  disabled={isAnimating}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <label className="text-gray-400">Shift (K)</label>
                  <span className="text-white font-mono">{k}</span>
                </div>
                <input
                  type="range" min="1" max={totalNodes - 1} value={k}
                  onChange={(e) => setK(parseInt(e.target.value))}
                  disabled={isAnimating}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  onClick={runAnimation} disabled={isAnimating}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
                >
                  <Play size={18} fill="currentColor" /> {isAnimating ? 'Running...' : 'Animate'}
                </button>
                <button
                  onClick={initGrid} disabled={isAnimating}
                  className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-2xl transition-all disabled:opacity-50"
                  title="Reset Grid"
                >
                  <RotateCcw size={20} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700">
               <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Row Steps</div>
               <div className="text-2xl font-mono text-purple-400">{metrics?.rowShift ?? (optimizedK % cols)}</div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700">
               <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Col Steps</div>
               <div className="text-2xl font-mono text-orange-400">{metrics?.colShift ?? Math.floor(optimizedK / cols)}</div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 relative">
          {grid.length > 0 && <ToroidalGrid grid={grid} stage={stage} />}
          
          {isCorrect !== null && (
            <div className={`mt-8 flex items-center justify-center gap-3 p-4 rounded-2xl font-bold text-lg animate-in fade-in slide-in-from-bottom-4 duration-500 ${isCorrect ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              {isCorrect ? '✓ MESH CIRCULAR SHIFT: CORRECT' : '✗ MESH CIRCULAR SHIFT: ERROR'}
            </div>
          )}

          <div className="mt-8 grid grid-cols-3 gap-6">
             <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-blue-400 text-sm font-bold">
                   <Zap size={14} /> Efficiency
                </div>
                <div className="text-xs text-gray-400">Mesh reduces O(K) to O(√P) through dimension decomposition.</div>
             </div>
             <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-purple-400 text-sm font-bold">
                   <MoveHorizontal size={14} /> Parallelism
                </div>
                <div className="text-xs text-gray-400">Double buffering prevents data loss during simultaneous shifts.</div>
             </div>
             <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-orange-400 text-sm font-bold">
                   <TrendingUp size={14} /> Complexity
                </div>
                <div className="text-xs text-gray-400">Toroidal wrap-around maintains constant degree-4 connectivity.</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularShiftVisualizer;
