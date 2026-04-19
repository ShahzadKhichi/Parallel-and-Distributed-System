import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface Hypercube3DProps {
  dimension: number;
  activeNodes?: number[];
  activeBit?: number | null;
}

const HypercubeInstance: React.FC<Hypercube3DProps> = ({ dimension, activeNodes = [], activeBit = null }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  const vertices = useMemo(() => {
    const numNodes = Math.pow(2, dimension);
    const pos: [number, number, number][] = [];
    const scale = 2.5; // Slightly larger scale
    
    for (let i = 0; i < numNodes; i++) {
        // Gray code or simple binary mapping
        const x = (i & 1) ? 1 : -1;
        const y = (i & 2) ? 1 : -1;
        const z = (i & 4) ? 1 : -1;
        pos.push([x * scale, y * scale, z * scale]);
    }
    return pos;
  }, [dimension]);

  const edges = useMemo(() => {
    const e: { u: number, v: number, bit: number }[] = [];
    const numNodes = Math.pow(2, dimension);
    for (let i = 0; i < numNodes; i++) {
        for (let b = 0; b < dimension; b++) {
            const neighbor = i ^ (1 << b);
            if (neighbor > i) {
                e.push({ u: i, v: neighbor, bit: b });
            }
        }
    }
    return e;
  }, [dimension]);

  useFrame(() => {
    if (meshRef.current) {
        meshRef.current.rotation.y += 0.003;
        meshRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={meshRef}>
      {edges.map((edge, idx) => (
        <HypercubeLine 
          key={`edge-${idx}`} 
          start={vertices[edge.u]} 
          end={vertices[edge.v]} 
          isActive={activeBit !== null && edge.bit === activeBit} 
        />
      ))}
      
      {vertices.map((pos, idx) => (
        <HypercubeNode 
          key={`node-${idx}`} 
          position={pos} 
          id={idx} 
          isActive={activeNodes.includes(idx)} 
        />
      ))}
    </group>
  );
};

const HypercubeNode: React.FC<{ position: [number, number, number], id: number, isActive: boolean }> = ({ position, id, isActive }) => {
    return (
        <group position={position}>
            <mesh>
                <sphereGeometry args={[0.25, 32, 32]} />
                <meshStandardMaterial 
                    color={isActive ? "#fbbf24" : "#1e293b"} // Amber-400 for active, Slate-800 for inactive
                    emissive={isActive ? "#fbbf24" : "#000"}
                    emissiveIntensity={isActive ? 3 : 0}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
            <Text
                position={[0, 0.5, 0]}
                fontSize={0.3}
                color={isActive ? "#fbbf24" : "#94a3b8"}
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/robotomono/v12/L0tkDFI8S0CD14_9ICHeDxEqWw.woff"
            >
                {id.toString(2).padStart(3, '0')}
            </Text>
        </group>
    );
};

const HypercubeLine: React.FC<{ start: [number, number, number], end: [number, number, number], isActive: boolean }> = ({ start, end, isActive }) => {
    const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
    
    return (
        <primitive object={new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(points),
            new THREE.LineBasicMaterial({
                color: isActive ? "#fbbf24" : "#334155", // High contrast Amber vs Muted Slate
                transparent: true,
                opacity: isActive ? 1 : 0.2,
                linewidth: isActive ? 3 : 1
            })
        )} />
    );
};

const Hypercube3D: React.FC<Hypercube3DProps> = (props) => {
  return (
    <div className="w-full h-full min-h-[500px] bg-gradient-to-b from-gray-950 to-gray-900 rounded-[50px] shadow-inner border border-white/5">
      <Canvas shadows gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <OrbitControls enableZoom={false} autoRotate={false} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <HypercubeInstance {...props} />
        </Float>
      </Canvas>
    </div>
  );
};

export default Hypercube3D;
