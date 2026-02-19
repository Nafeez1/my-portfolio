/**
 * Hero 3D scene: floating torus knot and orbiting rings.
 * Uses @react-three/fiber (React renderer for Three.js) and @react-three/drei helpers.
 * Canvas is lazy-loaded to avoid loading Three.js until needed.
 */
import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, ContactShadows } from "@react-three/drei";

function FloatingGeometry() {
  const meshRef = useRef();
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.2}>
        <torusKnotGeometry args={[0.6, 0.2, 128, 32]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.3}
          thickness={0.4}
          chromaticAberration={0.05}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          iridescence={0.2}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1200]}
          clearcoat={0.5}
          attenuationDistance={0.5}
          attenuationColor="#6366f1"
          color="#a5b4fc"
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}

function OrbitingRing() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.4, 0.02, 16, 100]} />
      <meshBasicMaterial color="#6366f1" transparent opacity={0.4} />
    </mesh>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      <FloatingGeometry />
      <Float speed={1.5} floatIntensity={0.3}>
        <OrbitingRing />
      </Float>
      <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      <Environment preset="night" />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense
          fallback={
            <mesh>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshBasicMaterial color="#6366f1" wireframe />
            </mesh>
          }
        >
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
