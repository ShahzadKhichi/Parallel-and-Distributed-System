export interface HypercubeSimulation {
  dimension: number;
  steps: number;
  messagesPerNode: number;
  totalMessages: number;
  stepDetails: Array<{ step: number; dimension: number; exchanges: number; messagesInTransit: number }>;
}

export function simulateHypercubeAllToAll(d: number): HypercubeSimulation {
  const p = Math.pow(2, d);
  const stepDetails = [];
  
  for (let step = 0; step < d; step++) {
    stepDetails.push({
      step: step + 1,
      dimension: step,
      exchanges: p / 2,
      messagesInTransit: p * (p - Math.pow(2, step))
    });
  }
  
  stepDetails.push({
    step: d + 1,
    dimension: d,
    exchanges: 0,
    messagesInTransit: 0
  });
  
  return {
    dimension: d,
    steps: d,
    messagesPerNode: p - 1,
    totalMessages: p * (p - 1),
    stepDetails
  };
}
