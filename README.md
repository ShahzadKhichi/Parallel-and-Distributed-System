# 🚀 PDC Algorithm Visualizer (v1.0)

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?logo=three.js)](https://threejs.org/)
[![Netlify](https://img.shields.io/badge/Deployment-Netlify-00C7B7?logo=netlify)](https://www.netlify.com/)

A high-performance, interactive web application designed to visualize complex **Parallel and Distributed Computing (PDC)** algorithms. This project replaces static simulations with immersive 3D graphics and real-time animation primitives.

---

## 🔗 Live Demo
**[Launch Visualizer](https://pdc-visualizer.netlify.app/)**

---

## 🏗️ Core Modules

### 1. All-to-All Personalized Communication (Question #01)
Simulates and visualizes total exchange communication across three major network topologies:
- **Ring Topology**: Circular communication paths.
- **2D Mesh**: Grid-based message routing.
- **Hypercube**: d-dimensional binary address exchange.
- *Includes real-time performance tracking and bandwidth metrics.*

### 2. Toroidal Mesh Circular Shift (Question #02)
Visualizes an $R \times C$ mesh network performing circular shifts:
- Step-by-step **Row Shift** then **Column Shift** animations.
- Interactive grid size configuration.
- Correctness verification at every step.

### 3. 3D Hypercube All-to-All Simulation (Question #03)
An immersive **Three.js** powered simulation of bit-ordered personalized communication:
- **Neon-Contrast Visualization**: High-visibility 3D model with binary node addressing.
- **Bitwise Logic**: Real-time XOR-based message routing visualization.
- **Auto-Orbit & Zoom**: Full camera control to inspect the d-dimensional structure.

---

## 🛠️ Technical Stack

- **Frontend**: React 19, Vite, TypeScript
- **3D Engine**: @react-three/fiber, @react-three/drei (Three.js)
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS v3 (Enterprise-grade dark theme)
- **Deployment**: Netlify/Vercel (CI/CD ready)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/ShahzadKhichi/Parallel-and-Distributed-System.git

# Navigate to project directory
cd Parallel-and-Distributed-System

# Install dependencies
npm install
```

### Development
```bash
# Start local dev server
npm run dev
```

### Production Build
```bash
# Create optimized production bundle
npm run build
```

---

## 📂 Project Structure

```text
src/
├── components/           # UI Components & Visualizers
│   ├── q1_all_to_all/   # SVG-based topology graphs
│   ├── q2_circular_shift/ # Interactive grid shifts
│   ├── q3_hypercube/    # 3D Hypercube simulation
│   └── shared/          # Reusable 3D & UI primitives
├── utils/                # Core Algorithm Logic
│   └── algorithms/      # PDC Simulation math (XOR, Grid, etc.)
└── types/                # Unified TypeScript definitions
```

---

## 📜 License
Internal Project - Academic Assignment Solution.

---

*Developed with ❤️ by the ShahzadKhichi Team.*
