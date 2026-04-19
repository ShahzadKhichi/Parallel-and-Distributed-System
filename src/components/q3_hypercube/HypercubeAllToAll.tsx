import React, { useState, useMemo } from 'react';
import { simulateHypercubeAllToAll } from '@/utils/algorithms/hypercubeAllToAll';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Layers, ArrowRightLeft, Database } from 'lucide-react';
import Hypercube3D from '../shared/Hypercube3D';

const HypercubeAllToAll: React.FC = () => {
    const [dimension, setDimension] = useState(3);
    const simulation = useMemo(() => simulateHypercubeAllToAll(dimension), [dimension]);
    const [activeStep, setActiveStep] = useState(0);

    const stepData = simulation.stepDetails[activeStep] || simulation.stepDetails[0];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
                <div>
                    <h2 className="text-5xl font-black text-white tracking-tighter mb-2">Hypercube All-to-All</h2>
                    <p className="text-gray-400 text-lg">Step-by-step bit-ordered personalized exchange</p>
                </div>
                <div className="flex gap-4 p-2 bg-gray-800/40 rounded-3xl border border-white/5 shadow-2xl">
                    {[3, 4, 5].map(d => (
                        <button
                            key={d}
                            onClick={() => { setDimension(d); setActiveStep(0); }}
                            className={`px-8 py-3 rounded-2xl font-black transition-all duration-300 ${dimension === d ? 'bg-amber-500 text-black shadow-xl shadow-amber-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                        >
                            D-{d}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-gray-800/30 p-8 rounded-[40px] border border-white/5 backdrop-blur-xl shadow-2xl">
                       <h3 className="text-white font-black mb-8 flex items-center gap-3 text-lg">
                          <Layers size={20} className="text-amber-400" /> Progression
                       </h3>
                       <div className="space-y-4">
                          {simulation.stepDetails.map((_: any, idx: number) => (
                             <button
                                key={idx}
                                onClick={() => setActiveStep(idx)}
                                className={`w-full flex items-center justify-between p-5 rounded-[24px] transition-all duration-500 border ${activeStep === idx ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.1)]' : 'bg-transparent border-transparent text-gray-500 hover:text-gray-300'}`}
                             >
                                <span className="text-sm font-black uppercase tracking-widest">{idx === simulation.dimension ? 'Verified' : `Phase ${idx+1}`}</span>
                                {activeStep === idx && <motion.div layoutId="activeStep" className="w-2.5 h-2.5 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]" />}
                             </button>
                          ))}
                       </div>
                    </div>
                </div>

                <div className="lg:col-span-9 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div className="bg-amber-500/5 p-8 rounded-[40px] border border-amber-500/10 shadow-2xl group transition-all hover:bg-amber-500/10">
                          <div className="text-amber-500/70 font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                             <ArrowRightLeft size={14} /> Active Bit
                          </div>
                          <div className="text-4xl font-black text-white">
                             {activeStep < dimension ? `Bit ${activeStep}` : 'Verified'}
                          </div>
                       </div>
                       <div className="bg-gray-800/20 p-8 rounded-[40px] border border-white/5 shadow-2xl">
                          <div className="text-gray-500 font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                             <Activity size={14} /> Node Pairs
                          </div>
                          <div className="text-4xl font-black text-white">{stepData.exchanges} Pairs</div>
                       </div>
                       <div className="bg-gray-800/20 p-8 rounded-[40px] border border-white/5 shadow-2xl">
                          <div className="text-gray-500 font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                             <Database size={14} /> Data Transit
                          </div>
                          <div className="text-4xl font-black text-white">{Math.round(stepData.messagesInTransit)} Msg</div>
                       </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-cyan-500/20 rounded-[50px] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                        <div className="relative h-[600px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="w-full h-full"
                                >
                                   <Hypercube3D 
                                      dimension={dimension} 
                                      activeNodes={activeStep < dimension ? (Array.from({ length: Math.pow(2, dimension) }).filter((_, i) => (i >> activeStep) & 1) as number[]) : Array.from({ length: Math.pow(2, dimension) }, (_, i) => i)}
                                      activeBit={activeStep < dimension ? activeStep : null}
                                   />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="bg-white/[0.02] p-10 rounded-[40px] border border-white/5 backdrop-blur-3xl">
                        <h4 className="text-white font-black mb-6 text-xl tracking-tight leading-none">Hypercube Algorithm Core</h4>
                        <p className="text-gray-400 text-lg leading-relaxed font-medium">
                           The hypercube communication pattern leverages bitwise XOR logic. In each step $k$, every node $i$ communicates with node $i \oplus 2^k$. This ensures that after $\log_2 P$ steps, all nodes have received all personalized messages, achieving an optimal $O(\log P)$ time complexity for global all-to-all exchange.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HypercubeAllToAll;
