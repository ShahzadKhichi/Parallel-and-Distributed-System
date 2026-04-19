export interface MeshSimulation {
  steps: number;
  rowSteps: number;
  colSteps: number;
  messagesPerNode: number;
  totalMessages: number;
}

export function simulateMeshAllToAll(p: number): MeshSimulation {
  const size = Math.sqrt(p);
  const rowSteps = Math.ceil(size) - 1;
  const colSteps = Math.ceil(size) - 1;
  const steps = 2 * (size - 1);
  const messagesPerNode = p - 1;
  
  return {
    steps: Math.ceil(steps),
    rowSteps,
    colSteps,
    messagesPerNode,
    totalMessages: p * (p - 1)
  };
}
