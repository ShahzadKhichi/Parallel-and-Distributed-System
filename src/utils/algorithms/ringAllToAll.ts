export interface RingSimulation {
  steps: number;
  messagesPerNode: number[];
  totalMessages: number;
  stepDetails: Array<{ step: number; activeMessages: number }>;
}

export function simulateRingAllToAll(p: number): RingSimulation {
  const steps = p - 1;
  const messagesPerNode = Array(p).fill(p - 1);
  const stepDetails: Array<{ step: number; activeMessages: number }> = [];
  
  for (let step = 1; step <= steps; step++) {
    stepDetails.push({ step, activeMessages: p });
  }
  
  return {
    steps,
    messagesPerNode,
    totalMessages: p * (p - 1),
    stepDetails
  };
}
