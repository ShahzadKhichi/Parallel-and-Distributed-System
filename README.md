# PDC Assignment - Mesh Circular Shift Visualizer

This is a comprehensive React + TypeScript application that visualizes Parallel and Distributed Computing concepts.

## Features
- **Mesh Shift**: Interactive $4 \times 4$ to $8 \times 8$ toroidal grid with circular shift animations. Uses a 3-phase parallel algorithm (Initial -> Row Shift -> Column Shift) to maintain data consistency.
- **Topologies**: SVG representations of Ring, Mesh, and Hypercube networks. Detailed complexity analysis for each communication pattern.
- **Hypercube All-to-All**: Step-by-step bit-ordered exchange simulation. Visualizes address resolution across log(P) dimensions.
- **Premium UI**: Built with Tailwind CSS (v3), Framer Motion for high-frequency animations, and Lucide icons.

## Live Demo
[Add Live URL Here]

## Tech Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion

## Getting Started
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```
