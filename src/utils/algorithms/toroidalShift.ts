export interface ToroidalShiftResult {
  initialGrid: number[][];
  finalGrid: number[][];
  rowShiftAmount: number;
  colShiftAmount: number;
  totalSteps: number;
  messagesPerNode: number;
}

export function computeCircularShift(
  rows: number,
  cols: number,
  k: number,
  direction: 'right' | 'left' = 'right'
): ToroidalShiftResult {
  const totalNodes = rows * cols;
  const optimizedK = ((k % totalNodes) + totalNodes) % totalNodes;
  const effectiveK = direction === 'right' ? optimizedK : (totalNodes - optimizedK) % totalNodes;
  
  const rowShift = effectiveK % cols;
  const colShift = Math.floor(effectiveK / cols);
  
  // Create initial grid (row-major order)
  const initialGrid: number[][] = [];
  for (let i = 0; i < rows; i++) {
    initialGrid[i] = [];
    for (let j = 0; j < cols; j++) {
      initialGrid[i][j] = i * cols + j;
    }
  }
  
  // A row-major circular shift by K on a R x C mesh is:
  // new_index = (old_index + K) % (R*C)
  // This can be decomposed into:
  // 1. Shift row values horizontally by rowShift.
  // 2. Elements that wrap around in the row shift must also move vertically by 1.
  // 3. Shift all values vertically by colShift.

  const finalGrid: number[][] = Array(rows).fill(null).map(() => Array(cols).fill(0));
  
  for (let i = 0; i < totalNodes; i++) {
      const oldR = Math.floor(i / cols);
      const oldC = i % cols;
      const newIndex = (i + effectiveK) % totalNodes;
      const newR = Math.floor(newIndex / cols);
      const newC = newIndex % cols;
      finalGrid[newR][newC] = initialGrid[oldR][oldC];
  }
  
  return {
    initialGrid,
    finalGrid,
    rowShiftAmount: rowShift,
    colShiftAmount: colShift,
    totalSteps: rowShift + colShift,
    messagesPerNode: rowShift + colShift
  };
}

export function verifyShift(
  initialGrid: number[][],
  finalGrid: number[][],
  k: number,
  direction: 'right' | 'left' = 'right'
): boolean {
  const rows = initialGrid.length;
  const cols = initialGrid[0].length;
  const total = rows * cols;
  const optimizedK = ((k % total) + total) % total;
  const effectiveK = direction === 'right' ? optimizedK : (total - optimizedK) % total;
  
  const initialFlat = initialGrid.flat();
  const finalFlat = finalGrid.flat();
  
  for (let i = 0; i < total; i++) {
    const expectedPosition = (i + effectiveK) % total;
    if (finalFlat[expectedPosition] !== initialFlat[i]) {
      return false;
    }
  }
  return true;
}
