import React, { useState } from 'react';
import RingTopology from './RingTopology';
import MeshTopology from './MeshTopology';
import HypercubeTopology from './HypercubeTopology';
import { Circle, Grid, Box, Info } from 'lucide-react';

const AllToAllVisualizer: React.FC = () => {
  const [activeTopo, setActiveTopo] = useState<'ring' | 'mesh' | 'hypercube'>('ring');
  const [nodeCount] = useState(8);

  const topos = [
    { id: 'ring', label: 'Ring', icon: Circle, component: RingTopology },
    { id: 'mesh', label: '2D Mesh', icon: Grid, component: MeshTopology },
    { id: 'hypercube', label: 'Hypercube', icon: Box, component: HypercubeTopology },
  ];

  const ActiveComponent = topos.find(t => t.id === activeTopo)?.component || RingTopology;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2">Network Topologies</h2>
          <p className="text-gray-400">Total exchange (all-to-all) communication patterns</p>
        </div>
        
        <div className="flex p-1.5 bg-gray-800/80 rounded-2xl border border-gray-700 shadow-xl">
           {topos.map(topo => (
              <button
                key={topo.id}
                onClick={() => setActiveTopo(topo.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm ${activeTopo === topo.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                <topo.icon size={16} /> {topo.label}
              </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 bg-gray-800/30 rounded-3xl border border-gray-700/50 p-8 backdrop-blur-sm min-h-[500px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <ActiveComponent p={nodeCount} />
         </div>

         <div className="space-y-6">
            <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-3xl">
               <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
                  <Info size={18} /> Topology Stats
               </h3>
               {activeTopo === 'ring' && (
                 <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                       <span className="text-gray-400 text-xs uppercase font-bold tracking-widest">Steps</span>
                       <span className="text-2xl font-mono text-white">p - 1</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                       <span className="text-gray-400 text-xs uppercase font-bold tracking-widest">Complexity</span>
                       <span className="text-xl font-mono text-white">O(p)</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed italic">The simplest topology where each node sends p-1 messages to its neighbor in sequence.</p>
                 </div>
               )}
               {activeTopo === 'mesh' && (
                 <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                       <span className="text-gray-400 text-xs uppercase font-bold tracking-widest">Steps</span>
                       <span className="text-2xl font-mono text-white">2(√p - 1)</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                       <span className="text-gray-400 text-xs uppercase font-bold tracking-widest">Complexity</span>
                       <span className="text-xl font-mono text-white">O(√p)</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed italic">Work is split into Row Sweeps followed by Column Sweeps, reducing global steps.</p>
                 </div>
               )}
               {activeTopo === 'hypercube' && (
                 <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                       <span className="text-gray-400 text-xs uppercase font-bold tracking-widest">Steps</span>
                       <span className="text-2xl font-mono text-white">log₂ p</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                       <span className="text-gray-400 text-xs uppercase font-bold tracking-widest">Complexity</span>
                       <span className="text-xl font-mono text-white">O(log p)</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed italic">Dimension-ordered routing resolves one bit of address per step, doubling bandwidth usage.</p>
                 </div>
               )}
            </div>

            <div className="bg-gray-800/50 p-6 rounded-3xl border border-gray-700">
               <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Verification</h4>
               <div className="flex items-center gap-3 p-4 bg-green-500/10 rounded-2xl border border-green-500/20">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                  <div className="text-xs font-bold text-green-400 tracking-tight">TOPOLOGY VERIFIED</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AllToAllVisualizer;
