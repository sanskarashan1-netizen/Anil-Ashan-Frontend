import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import BuildingModel from './BuildingModel';
import {
  Environment,
  ContactShadows,
  Float,
  Sparkles,
} from "@react-three/drei";

import {
  EffectComposer,
  Bloom,
  Vignette,
  ToneMapping,
} from "@react-three/postprocessing";

// Ambient dust particles system
const DustParticles = () => {
  const pointsRef = useRef();
  const count = 220;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;     // X
      pos[i * 3 + 1] = Math.random() * 16 - 8;      // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18; // Z
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    // Soft rotation drift
    pointsRef.current.rotation.y = t * 0.018;
    pointsRef.current.position.y = Math.sin(t * 0.1) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c9a84c"
        size={0.065}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

// Volumetric fluffy cloud nodes drifting around building height
const VolumetricClouds = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.012; // slow orbit
    groupRef.current.position.y = Math.sin(t * 0.15) * 0.18;
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2;
        const x = Math.sin(angle) * 4.2;
        const z = Math.cos(angle) * 4.2;
        return (
          <mesh key={i} position={[x, 1.8 + Math.sin(i * 1.5) * 0.6, z]}>
            <sphereGeometry args={[1.6, 12, 12]} />
            <meshStandardMaterial
              color="#0d1f38"
              transparent
              opacity={0.14}
              roughness={0.9}
              metalness={0.0}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Controls the camera drone-like orbit, load-in intro flyby, and scroll zooming
const CameraController = ({ startIntro, mouse, lightRef, fogRef }) => {
  const startTimeRef = useRef(-1);

  useFrame((state) => {
    const scrollY = window.scrollY || 0;
    const maxScroll = window.innerHeight * 1.8;
    const scrollPercent = Math.min(1, scrollY / maxScroll);

    // Easing helper
    const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

    // 1. Initial State before intro is triggered (Curtain is down/Logo loading)
    if (!startIntro) {
      state.camera.position.set(0, 3.2, 14.0);
      state.camera.lookAt(0, 1.5, 0);
      if (lightRef.current) lightRef.current.intensity = 0.05;
      if (fogRef.current) fogRef.current.near = 1.5;
      return;
    }

    // Record WebGL intro start time once
    if (startTimeRef.current === -1) {
      startTimeRef.current = state.clock.getElapsedTime();
    }

    const elapsed = state.clock.getElapsedTime() - startTimeRef.current;

    // 2. Page Load Intro Timeline (0s -> 4.5s relative to startIntro)
    let introZ = 14.0;
    let introY = 3.2;
    let introLightIntensity = 0.05;
    let introFogNear = 2.0;

    if (elapsed < 4.5) {
      const p = elapsed / 4.5;
      const eased = easeOutCubic(p);
      introZ = THREE.MathUtils.lerp(14.0, 9.0, eased);
      introY = THREE.MathUtils.lerp(3.2, 1.5, eased);
      introLightIntensity = THREE.MathUtils.lerp(0.05, 2.6, eased);
      introFogNear = THREE.MathUtils.lerp(2.0, 6.0, eased);
    } else {
      introZ = 9.0;
      introY = 1.5;
      introLightIntensity = 2.6;
      introFogNear = 6.0;
    }

    // 3. Scroll Animation Coordinates
    // Camera zooms closer on scroll: Z moves down
    // Camera rises on scroll: Y moves up
    const targetZ = elapsed < 4.5 ? introZ : introZ - (scrollPercent * 4.5);
    const targetY = elapsed < 4.5 ? introY : introY + (scrollPercent * 3.7);

    // 4. Mouse Parallax coordinates (adds continuous float offsets)
    const targetMouseX = mouse.current.x * 1.4;
    const targetMouseY = mouse.current.y * 0.8;

    // Apply linear interpolations to camera coordinates
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ + targetMouseY, 0.055);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + targetMouseY, 0.055);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetMouseX, 0.055);

    // Camera continuously targets the center focal core of the tower
    state.camera.lookAt(0, targetY - 0.6, 0);

    // 5. Update lighting and fog dynamically
    if (lightRef.current) {
      const targetLightIntensity = elapsed < 4.5
        ? introLightIntensity
        : introLightIntensity + (scrollPercent * 0.4);
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, targetLightIntensity, 0.055);

      // Shift lighting positions to slide glass reflections
      const lightX = 8 + (mouse.current.x * 2.8);
      const lightY = 6 + (mouse.current.y * 1.8);
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, lightX, 0.055);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, lightY, 0.055);
    }

    if (fogRef.current) {
      const targetFogNear = elapsed < 4.5
        ? introFogNear
        : Math.max(1.2, introFogNear - (scrollPercent * 4.2)); // fog intensifies (closer distance)
      fogRef.current.near = THREE.MathUtils.lerp(fogRef.current.near, targetFogNear, 0.055);
    }
  });

  return null;
};

// Animates Skyscraper rotation based on time, scroll status, and cursor coordinates
const SkyscraperWrapper = ({ startIntro, mouse }) => {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const scrollY = window.scrollY || 0;
    const maxScroll = window.innerHeight * 1.8;
    const scrollPercent = Math.min(1, scrollY / maxScroll);

    // Base rotation + scroll rotation + mouse drag rotation
    const baseRot = startIntro ? t * 0.035 : t * 0.015; // rotates slower in standby mode
    const targetRotY = baseRot + (scrollPercent * 0.55) + (mouse.current.x * 0.22);

    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, 0.055);
  });

  return (
    <group ref={ref}>
      <BuildingModel />
    </group>
  );
};

const HeroScene = ({ startIntro }) => {
  // Global cursor position trackers (-1.0 to 1.0)
  const mouseRef = useRef({ x: 0, y: 0 });
  const lightRef = useRef();
  const fogRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full relative z-10">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 3.2, 14.0], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Cinematic ambient background fog */}
        <fog ref={fogRef} attach="fog" args={['#03070f', 1.5, 18]} />

        <Environment preset="city" background={false} />

        <ContactShadows
          position={[0, -5.1, 0]}
          opacity={0.45}
          scale={20}
          blur={3}
          far={10}
        />

        <Float
          speed={1.2}
          rotationIntensity={0.15}
          floatIntensity={0.3}
        >
          <Sparkles
            count={180}
            scale={18}
            size={2}
            speed={0.25}
            opacity={0.45}
            color="#d9b45a"
          />
        </Float>

        {/* 1. Light Blue Ambient Light (Fill Shadows) */}
        <ambientLight color="#a8c0ff" intensity={0.65} />

        {/* 2. Warm Golden Hour Key Light (Sun Shadows) */}
        <directionalLight
          ref={lightRef}
          castShadow
          color="#ffdda6"
          intensity={0.05} // Starts dark, fades up during intro
          position={[8, 6, 5]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={25}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
        />

        {/* 3. Volumetric Point Backlight */}
        <pointLight color="#ffe3b3" intensity={1.8} position={[-5, 7, -5]} />

        {/* Load building model inside Suspense boundaries */}
        <Suspense fallback={null}>
          <SkyscraperWrapper startIntro={startIntro} mouse={mouseRef} />
        </Suspense>

        {/* Volumetric Clouds and Dust Particles */}
        <VolumetricClouds />
        <DustParticles />

        {/* Easing camera drone loop */}
        <CameraController startIntro={startIntro} mouse={mouseRef} lightRef={lightRef} fogRef={fogRef} />
        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.25}
            mipmapBlur
          />

          <ToneMapping />

          <Vignette
            eskil={false}
            offset={0.15}
            darkness={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default HeroScene;
