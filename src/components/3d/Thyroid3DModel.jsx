import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

const Thyroid3DModel = ({ diseaseLocation, diseaseType }) => {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);

  // Animation for the model
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  // Placeholder shape for Thyroid (Butterfly shape approximation using two spheres)
  // In a real app, we would load a .gltf model here
  return (
    <group dispose={null}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Left Lobe */}
      <mesh position={[-1.2, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? "#ff9999" : "#ffcccc"}
          roughness={0.3}
          metalness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Right Lobe */}
      <mesh position={[1.2, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? "#ff9999" : "#ffcccc"}
          roughness={0.3}
          metalness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Isthmus (Bridge) */}
      <mesh position={[0, -0.2, 0.2]} scale={[0.8, 0.4, 0.4]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#ffcccc"
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Disease Marker */}
      {diseaseLocation && (
        <mesh position={diseaseLocation} scale={0.3}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} />
          <Html distanceFactor={10}>
            <div className="bg-black/80 text-white p-2 rounded-lg text-xs whitespace-nowrap border border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.5)] backdrop-blur-sm">
              <div className="font-bold text-red-400">Detected Issue</div>
              <div>{diseaseType || "Abnormality"}</div>
            </div>
          </Html>
        </mesh>
      )}

      <OrbitControls enableZoom={true} enablePan={false} minDistance={3} maxDistance={10} />
    </group>
  );
};

export default Thyroid3DModel;
