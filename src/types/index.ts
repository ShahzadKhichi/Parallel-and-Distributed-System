export interface Node {
  id: number;
  row: number;
  col: number;
  value: number;
  originalValue?: number;
}

export interface GridState {
  nodes: Node[][];
  stage: 'initial' | 'row-shift' | 'column-shift' | 'final';
  step: number;
}

export interface Message {
  from: number;
  to: number;
  data: any;
  step: number;
}

export interface TopologyMetrics {
  steps: number;
  messagesPerNode: number;
  totalMessages: number;
  complexity: string;
  timeComplexity: string;
}

export interface ShiftResult {
  initialGrid: number[][];
  rowShiftedGrid: number[][];
  finalGrid: number[][];
  rowShiftAmount: number;
  colShiftAmount: number;
  totalSteps: number;
  ringSteps: number;
  meshSteps: number;
}

export interface HypercubeStep {
  dimension: number;
  exchanges: Array<{ node1: number; node2: number; messages: number }>;
  messagesInTransit: number;
}
