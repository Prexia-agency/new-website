# WebGPU Galaxy Component

A stunning GPU-accelerated spiral galaxy simulation built with WebGPU, Three.js, and React. Features up to 750,000 interactive particles with real-time physics, bloom effects, and customizable parameters.

## Features

- **GPU-Accelerated Physics** - Particle simulation runs entirely on the GPU using WebGPU compute shaders
- **Interactive Controls** - Click and drag to interact with the galaxy using mouse forces
- **Real-time Parameters** - Adjust galaxy properties in real-time with Tweakpane UI
- **Bloom Post-Processing** - Beautiful HDR bloom effects for enhanced visuals
- **Procedural Generation** - Spiral arm generation with configurable parameters
- **Dust Clouds** - Realistic nebula clouds with alpha-blended particles
- **Starfield Background** - Spherical starfield with color variation

## Requirements

- A browser with WebGPU support (Chrome 113+, Edge 113+, or other compatible browsers)
- GPU with WebGPU capabilities

## Installation

The component is already integrated into your project. Dependencies installed:

```bash
npm install three@^0.181.1 tweakpane@^4.0.1
```

## Usage

### Basic Usage

```tsx
import { WebGPUGalaxy } from "@/components/webgpu-galaxy";

export default function MyPage() {
  return (
    <div className="w-full h-screen">
      <WebGPUGalaxy className="w-full h-full" showUI={true} showInfo={true} />
    </div>
  );
}
```

### Advanced Usage with Custom Configuration

```tsx
import { WebGPUGalaxy } from "@/components/webgpu-galaxy";

export default function MyPage() {
  return (
    <div className="w-full h-screen">
      <WebGPUGalaxy
        className="w-full h-full"
        showUI={true}
        showInfo={true}
        config={{
          starCount: 500000,
          rotationSpeed: 0.15,
          spiralTightness: 2.0,
          mouseForce: 10.0,
          mouseRadius: 12.0,
          galaxyRadius: 15.0,
          galaxyThickness: 4,
          armCount: 3,
          armWidth: 2.5,
          randomness: 2.0,
          particleSize: 0.08,
          starBrightness: 0.5,
          denseStarColor: "#0088ff",
          sparseStarColor: "#ff8800",
          bloomStrength: 0.3,
          bloomRadius: 0.3,
          bloomThreshold: 0.15,
          cloudCount: 8000,
          cloudSize: 4,
          cloudOpacity: 0.03,
          cloudTintColor: "#ffccaa",
        }}
      />
    </div>
  );
}
```

### Using with Next.js (Dynamic Import)

Since WebGPU requires client-side rendering, use dynamic import with SSR disabled:

```tsx
import dynamic from "next/dynamic";

const WebGPUGalaxy = dynamic(
  () => import("@/components/webgpu-galaxy").then((mod) => mod.WebGPUGalaxy),
  {
    ssr: false,
    loading: () => <div>Loading Galaxy...</div>,
  },
);

export default function MyPage() {
  return (
    <main className="w-full h-screen">
      <WebGPUGalaxy className="w-full h-full" />
    </main>
  );
}
```

## Props

### WebGPUGalaxyProps

| Prop        | Type                    | Default   | Description                            |
| ----------- | ----------------------- | --------- | -------------------------------------- |
| `className` | `string`                | `''`      | CSS classes for the container          |
| `showUI`    | `boolean`               | `true`    | Show/hide Tweakpane controls           |
| `showInfo`  | `boolean`               | `true`    | Show/hide info panel (FPS, star count) |
| `config`    | `Partial<GalaxyConfig>` | See below | Galaxy configuration options           |

### GalaxyConfig

| Property          | Type     | Default     | Description                                 |
| ----------------- | -------- | ----------- | ------------------------------------------- |
| `starCount`       | `number` | `750000`    | Number of star particles                    |
| `rotationSpeed`   | `number` | `0.1`       | Base rotation speed                         |
| `spiralTightness` | `number` | `1.75`      | How tight the spiral arms wind              |
| `mouseForce`      | `number` | `7.0`       | Strength of mouse interaction               |
| `mouseRadius`     | `number` | `10.0`      | Radius of mouse influence                   |
| `galaxyRadius`    | `number` | `13.0`      | Overall radius of the galaxy                |
| `galaxyThickness` | `number` | `3`         | Vertical thickness of the galaxy            |
| `armCount`        | `number` | `2`         | Number of spiral arms (1-4)                 |
| `armWidth`        | `number` | `2.25`      | Width of spiral arms                        |
| `randomness`      | `number` | `1.8`       | Randomness factor for particle distribution |
| `particleSize`    | `number` | `0.06`      | Size of star particles                      |
| `starBrightness`  | `number` | `0.3`       | Overall brightness of stars                 |
| `denseStarColor`  | `string` | `'#1885ff'` | Color of stars in dense regions             |
| `sparseStarColor` | `string` | `'#ffb28a'` | Color of stars in sparse regions            |
| `bloomStrength`   | `number` | `0.2`       | Strength of bloom effect                    |
| `bloomRadius`     | `number` | `0.2`       | Radius of bloom effect                      |
| `bloomThreshold`  | `number` | `0.1`       | Threshold for bloom effect                  |
| `cloudCount`      | `number` | `5000`      | Number of dust cloud particles              |
| `cloudSize`       | `number` | `3`         | Size of cloud particles                     |
| `cloudOpacity`    | `number` | `0.02`      | Opacity of clouds                           |
| `cloudTintColor`  | `string` | `'#ffdace'` | Tint color for clouds                       |

## Controls

- **Left Mouse Drag** - Orbit camera around galaxy
- **Right Mouse Drag** - Pan camera
- **Mouse Wheel** - Zoom in/out
- **Click & Drag on Galaxy** - Apply force to particles
- **Right Panel** - Adjust galaxy parameters in real-time (if `showUI={true}`)

## Performance Tips

1. **Reduce Star Count**: For better performance on lower-end devices, reduce `starCount` to 100,000-250,000
2. **Lower Cloud Count**: Reduce `cloudCount` to 2,000-3,000
3. **Disable Bloom**: Set bloom values to 0 for performance gain
4. **Hide UI**: Set `showUI={false}` in production for slight performance improvement

## Demo Page

Visit `/galaxy` to see the full demo with all controls.

## Architecture

### Component Structure

```
webgpu-galaxy/
├── WebGPUGalaxy.tsx    # Main React component
├── galaxy.ts           # GalaxySimulation class with compute shaders
├── helpers.ts          # TSL shader helper functions
├── ui.ts               # Tweakpane UI controls
├── index.ts            # Public exports
└── README.md           # This file
```

### Key Technologies

- **Three.js (WebGPU)** - 3D rendering engine with WebGPU backend
- **TSL** - Three.js Shading Language for GPU compute shaders
- **Tweakpane** - UI controls for parameter adjustment
- **React** - Component framework
- **TypeScript** - Type safety

## Browser Compatibility

| Browser     | Support         |
| ----------- | --------------- |
| Chrome 113+ | ✅ Full Support |
| Edge 113+   | ✅ Full Support |
| Firefox     | ⏳ Coming Soon  |
| Safari      | ⏳ Coming Soon  |

## Troubleshooting

### "WebGPU is not supported" Error

Make sure you're using:

- Chrome 113 or later
- Edge 113 or later
- A GPU that supports WebGPU
- Hardware acceleration enabled in browser settings

### Performance Issues

- Reduce `starCount` and `cloudCount`
- Lower `bloomStrength` or disable bloom
- Close other GPU-intensive applications
- Update your graphics drivers

## Credits

Original WebGPU Galaxy implementation by [dgreenheck](https://github.com/dgreenheck/webgpu-galaxy)

Integrated and adapted for React/Next.js by AK Agency.
