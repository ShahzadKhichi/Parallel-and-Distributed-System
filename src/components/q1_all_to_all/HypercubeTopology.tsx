import React from 'react';
import Hypercube3D from '../shared/Hypercube3D';

const HypercubeTopology: React.FC<{ p: number }> = ({ p }) => {
  const d = Math.log2(p);

  return (
    <div className="w-full h-full min-h-[400px] relative">
      <div className="absolute top-4 right-4 z-10 bg-gray-900/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-[10px] uppercase tracking-widest text-cyan-400 font-black">
        3D Interactive View
      </div>
      <Hypercube3D dimension={d} />
    </div>
  );
};

export default HypercubeTopology;
