import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function RotatingGoldSphere() {
  const meshRef = useRef(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <group ref={meshRef}>
      <Sphere args={[1, 64, 64]} scale={1}>
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.8}
          roughness={0.1}
          emissive="#D4AF37"
          emissiveIntensity={0.2}
        />
      </Sphere>
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#D4AF37" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#0B0B0F" />
    </group>
  );
}

export default function GoldSphereScene() {
  return (
    <div className="absolute inset-0 w-full h-full opacity-40">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <RotatingGoldSphere />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
