import React, { useState, lazy, Suspense } from 'react';
import { Cpu, Move, Network } from 'lucide-react';

const CircularShiftVisualizer = lazy(() => import('@/components/q2_circular_shift/CircularShiftVisualizer'));
const AllToAllVisualizer = lazy(() => import('@/components/q1_all_to_all/AllToAllVisualizer'));
const HypercubeAllToAll = lazy(() => import('@/components/q3_hypercube/HypercubeAllToAll'));

type TabId = 'circular-shift' | 'all-to-all' | 'hypercube';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('circular-shift');
  
  const tabs = [
    { id: 'circular-shift' as TabId, label: 'Mesh Shift', icon: Move, description: 'Toroidal grid circular shift' },
    { id: 'all-to-all' as TabId, label: 'Topologies', icon: Network, description: 'Ring and Mesh all-to-all' },
    { id: 'hypercube' as TabId, label: 'Hypercube', icon: Cpu, description: 'N-dimensional total exchange' },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Premium Header */}
      <nav className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Cpu className="text-white" size={24} />
            </div>
            <div>
               <h1 className="text-white font-black text-xl tracking-tighter leading-none">PDC LAB</h1>
               <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Visualizer Engine</span>
            </div>
          </div>
          
          <div className="hidden md:flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex flex-col items-center justify-center px-6 py-2 rounded-2xl transition-all duration-300
                  ${activeTab === tab.id 
                    ? 'bg-white/5 text-white shadow-inner' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}
                `}
              >
                <div className="flex items-center gap-2 mb-0.5">
                   <tab.icon size={16} />
                   <span className="font-bold text-sm">{tab.label}</span>
                </div>
                <div className={`mt-1 h-1 w-8 rounded-full transition-all ${activeTab === tab.id ? 'bg-blue-600 scale-100' : 'bg-transparent scale-0'}`} />
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Mobile Nav */}
      <div className="md:hidden flex p-2 gap-1 bg-gray-900/90 backdrop-blur-md sticky top-20 z-40 border-b border-gray-800">
         {tabs.map(tab => (
            <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`flex-1 flex flex-col items-center py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
            >
               <tab.icon size={20} />
               <span className="text-[10px] font-bold mt-1 uppercase">{tab.label.split(' ')[0]}</span>
            </button>
         ))}
      </div>

      <main className="flex-1 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative h-full">
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin shadow-lg shadow-blue-600/20" />
                <span className="text-gray-400 font-bold animate-pulse uppercase tracking-widest text-xs">Initializing Engine...</span>
              </div>
            }>
               {activeTab === 'circular-shift' && <CircularShiftVisualizer />}
               {activeTab === 'all-to-all' && <AllToAllVisualizer />}
               {activeTab === 'hypercube' && <HypercubeAllToAll />}
            </Suspense>
        </div>
      </main>
      
      <footer className="bg-gray-900 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-xs font-medium">
             &copy; 2026 PDC Laboratory. Optimized for High Performance Computing.
          </div>
          <div className="flex gap-6">
             <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> System Operational
             </div>
             <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> React 18.2.0
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
