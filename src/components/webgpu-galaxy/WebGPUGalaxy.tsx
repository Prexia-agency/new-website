/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { pass } from "three/tsl";
import * as THREE from "three/webgpu";

import { GalaxySimulation } from "./galaxy";
import { GalaxyUI, type GalaxyConfig } from "./ui";

export interface WebGPUGalaxyProps {
  className?: string;
  showUI?: boolean;
  showInfo?: boolean;
  config?: Partial<GalaxyConfig>;
}

const defaultConfig: GalaxyConfig = {
  starCount: 750000,
  rotationSpeed: 0.1,
  spiralTightness: 1.75,
  mouseForce: 7.0,
  mouseRadius: 10.0,
  galaxyRadius: 13.0,
  galaxyThickness: 3,
  armCount: 2,
  armWidth: 2.25,
  randomness: 1.8,
  particleSize: 0.06,
  starBrightness: 0.3,
  denseStarColor: "#1885ff",
  sparseStarColor: "#ffb28a",
  bloomStrength: 0.2,
  bloomRadius: 0.2,
  bloomThreshold: 0.1,
  cloudCount: 5000,
  cloudSize: 3,
  cloudOpacity: 0.02,
  cloudTintColor: "#ffdace",
};

export const WebGPUGalaxy: React.FC<WebGPUGalaxyProps> = ({
  className = "",
  showUI = true,
  showInfo = true,
  config: userConfig = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<any>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const galaxySimulationRef = useRef<GalaxySimulation | null>(null);
  const uiRef = useRef<GalaxyUI | null>(null);
  const animationFrameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(performance.now());

  const [fps, setFps] = useState(60);
  const [starCount, setStarCount] = useState(defaultConfig.starCount);
  const [isWebGPUSupported, setIsWebGPUSupported] = useState<boolean | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  // Memoize config to prevent re-renders
  const configRef = useRef({ ...defaultConfig, ...userConfig });

  useEffect(() => {
    // Update config ref if userConfig changes
    configRef.current = { ...defaultConfig, ...userConfig };
  }, [JSON.stringify(userConfig)]);

  // Update galaxy rotation speed when it changes (for hover effect)
  useEffect(() => {
    if (
      galaxySimulationRef.current &&
      userConfig?.rotationSpeed !== undefined
    ) {
      galaxySimulationRef.current.updateUniforms({
        rotationSpeed: userConfig.rotationSpeed,
      });
    }
  }, [userConfig?.rotationSpeed]);

  useEffect(() => {
    const config = configRef.current;
    if (!containerRef.current) return;

    let mounted = true;
    let postProcessing: any = null;
    let bloomPassNode: any = null;

    // FPS tracking
    let frameCount = 0;
    let lastTime = performance.now();

    const mouse3D = new THREE.Vector3(0, 0, 0);
    const raycaster = new THREE.Raycaster();
    const intersectionPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    let mousePressed = false;

    const initScene = async () => {
      try {
        // Check WebGPU support
        if (!navigator.gpu) {
          setIsWebGPUSupported(false);
          setError(
            "WebGPU is not supported in your browser. Please use Chrome 113+ or Edge 113+",
          );
          return;
        }

        setIsWebGPUSupported(true);

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
          60,
          containerRef.current!.clientWidth /
            containerRef.current!.clientHeight,
          0.1,
          1000,
        );
        camera.position.set(0, 12, 17);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGPURenderer({
          antialias: true,
          forceWebGL: false,
        });
        const width = containerRef.current!.clientWidth;
        const height = containerRef.current!.clientHeight;
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Make sure canvas is visible and positioned correctly
        renderer.domElement.style.display = "block";
        renderer.domElement.style.position = "absolute";
        renderer.domElement.style.top = "0";
        renderer.domElement.style.left = "0";
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.zIndex = "1";

        containerRef.current!.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = false; // Disable zoom
        controls.minDistance = 5;
        controls.maxDistance = 30;
        controls.target.set(0, -2, 0);
        controlsRef.current = controls;

        // Mouse tracking
        const handleMouseDown = () => {
          mousePressed = true;
        };
        const handleMouseUp = () => {
          mousePressed = false;
        };
        const handleMouseMove = (event: MouseEvent) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect) return;

          const mouse = new THREE.Vector2(
            ((event.clientX - rect.left) / rect.width) * 2 - 1,
            -((event.clientY - rect.top) / rect.height) * 2 + 1,
          );
          raycaster.setFromCamera(mouse, camera);
          raycaster.ray.intersectPlane(intersectionPlane, mouse3D);
        };

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        renderer.domElement.addEventListener("mousemove", handleMouseMove);

        // Create starry background
        createStarryBackground(scene);

        // Load cloud texture (optional - galaxy works without it)
        let cloudTexture: THREE.Texture | null = null;
        try {
          const textureLoader = new THREE.TextureLoader();
          cloudTexture = await new Promise<THREE.Texture>((resolve, reject) => {
            textureLoader.load(
              "/textures/cloud.png",
              resolve,
              undefined,
              (_error) => {
                console.warn(
                  "Cloud texture failed to load, continuing without it:",
                  error,
                );
                reject(error);
              },
            );
          });
        } catch (error) {
          console.warn(
            "Cloud texture not available, galaxy will work without it",
          );
        }

        if (!mounted) return;

        // Create galaxy simulation
        const galaxySimulation = new GalaxySimulation(
          scene,
          config,
          cloudTexture,
        );
        galaxySimulation.createGalaxySystem();
        galaxySimulation.createClouds();
        galaxySimulationRef.current = galaxySimulation;

        // Initialize renderer
        await renderer.init();

        if (!mounted) return;

        // Do an initial render
        renderer.render(scene, camera);

        // Setup post-processing
        postProcessing = new THREE.PostProcessing(renderer);
        const scenePass = pass(scene, camera);
        const scenePassColor = scenePass.getTextureNode();

        bloomPassNode = bloom(scenePassColor);
        bloomPassNode.threshold.value = config.bloomThreshold;
        bloomPassNode.strength.value = config.bloomStrength;
        bloomPassNode.radius.value = config.bloomRadius;

        postProcessing.outputNode = scenePassColor.add(bloomPassNode);

        // Setup UI
        if (showUI && mounted) {
          const ui = new GalaxyUI(config, {
            onUniformChange: (key, value) =>
              galaxySimulation.updateUniforms({ [key]: value }),

            onBloomChange: (property, value) => {
              if (bloomPassNode) bloomPassNode[property].value = value;
            },

            onStarCountChange: (newCount) => {
              galaxySimulation.updateStarCount(newCount);
              setStarCount(newCount);
            },

            onCloudCountChange: (newCount) => {
              galaxySimulation.updateUniforms({ cloudCount: newCount });
              galaxySimulation.createClouds();
            },

            onCloudTintChange: (color) => {
              galaxySimulation.updateUniforms({ cloudTintColor: color });
              galaxySimulation.createClouds();
            },

            onRegenerate: () => {
              galaxySimulation.updateUniforms(config);
              galaxySimulation.createClouds();
              galaxySimulation.regenerate();
            },
          });
          ui.setBloomNode(bloomPassNode);
          uiRef.current = ui;
        }

        // Animation loop
        const animate = async () => {
          if (!mounted) return;

          animationFrameRef.current = requestAnimationFrame(animate);

          const currentTime = performance.now();
          const deltaTime = Math.min(
            (currentTime - lastFrameTimeRef.current) / 1000,
            0.033,
          );
          lastFrameTimeRef.current = currentTime;

          // Update controls
          controls.update();

          // Update galaxy
          await galaxySimulation.update(
            renderer,
            deltaTime,
            mouse3D,
            mousePressed,
          );

          // Render - temporarily disable post-processing for debugging
          // if (postProcessing) {
          //   postProcessing.render();
          // } else {
          renderer.render(scene, camera);
          // }

          // Update FPS
          frameCount++;
          const fpsUpdateTime = currentTime - lastTime;
          if (fpsUpdateTime >= 1000) {
            const newFps = Math.round((frameCount * 1000) / fpsUpdateTime);
            frameCount = 0;
            lastTime = currentTime;
            setFps(newFps);
            if (uiRef.current) {
              uiRef.current.updateFPS(newFps);
            }
          }
        };

        animate();
      } catch (err: any) {
        console.error("Failed to initialize WebGPU Galaxy:", err);
        setError(err.message || "Failed to initialize WebGPU Galaxy");
        setIsWebGPUSupported(false);
      }
    };

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current)
        return;

      cameraRef.current.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
      );
    };

    window.addEventListener("resize", handleResize);

    initScene();

    // Cleanup
    return () => {
      mounted = false;
      window.removeEventListener("resize", handleResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (uiRef.current) {
        uiRef.current.dispose();
      }

      if (galaxySimulationRef.current) {
        galaxySimulationRef.current.dispose();
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (containerRef.current && rendererRef.current?.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [showUI]); // Removed config dependency to prevent re-renders

  /**
   * Creates a starry background with random colored stars distributed on a sphere
   */
  const createStarryBackground = (scene: THREE.Scene, count = 5000) => {
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(count * 3);
    const starColors = new Float32Array(count * 3);

    // Distribute stars randomly on a sphere
    for (let i = 0; i < count; i++) {
      // Spherical coordinates for uniform distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 100 + Math.random() * 100;

      // Convert to Cartesian coordinates
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      // Add color variation (mostly white, some blue/orange tinted)
      const color = 0.8 + Math.random() * 0.2;
      const tint = Math.random();
      if (tint < 0.1) {
        // Blue tint
        starColors[i * 3] = color * 0.8;
        starColors[i * 3 + 1] = color * 0.9;
        starColors[i * 3 + 2] = color;
      } else if (tint < 0.2) {
        // Orange tint
        starColors[i * 3] = color;
        starColors[i * 3 + 1] = color * 0.8;
        starColors[i * 3 + 2] = color * 0.6;
      } else {
        // White
        starColors[i * 3] = color;
        starColors[i * 3 + 1] = color;
        starColors[i * 3 + 2] = color;
      }
    }

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );
    starGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(starColors, 3),
    );

    const starMaterial = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    return stars;
  };

  if (isWebGPUSupported === false) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="text-center p-8 bg-red-500/10 border border-red-500/30 rounded-lg max-w-md">
          <h3 className="text-xl font-semibold text-red-400 mb-2">
            WebGPU Not Supported
          </h3>
          <p className="text-sm text-red-300">
            {error ||
              "Your browser does not support WebGPU. Please use Chrome 113+, Edge 113+, or another compatible browser."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative ${className}`}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {showInfo && (
        <div
          className="absolute top-5 left-5 bg-black/80 px-5 py-4 rounded-lg text-sm leading-relaxed pointer-events-none border border-blue-500/30"
          style={{ zIndex: 1000 }}
        >
          <h1 className="text-xl mb-2.5 text-blue-300 drop-shadow-[0_0_10px_rgba(136,187,255,0.5)]">
            🌌 GPU Galaxy Simulation
          </h1>
          <div>
            FPS: <span className="text-green-400 font-bold">{fps}</span>
          </div>
          <div>
            Stars:{" "}
            <span className="text-white font-bold">
              {starCount.toLocaleString()}
            </span>
          </div>
          <div className="mt-2.5 opacity-70 text-xs text-blue-200">
            🖱️ Drag to interact with galaxy
            <br />
            🎮 Use right panel controls
          </div>
        </div>
      )}
    </div>
  );
};

export default WebGPUGalaxy;
