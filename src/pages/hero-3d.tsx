"use client";
import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

function Atom() {
  const group = useRef<THREE.Group>(null);
  const electrons = useMemo(
    () =>
      [...new Array(8)].map(() => ({
        position: new THREE.Vector3(),
        speed: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 2 + 1.5,
        axis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
      })),
    []
  );

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1;
      group.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#8A2BE2" emissive="#8A2BE2" emissiveIntensity={0.5} roughness={0.3} metalness={0.7} />
      </mesh>
      {electrons.map((electron, i) => (
        <Electron key={i} {...electron} />
      ))}
    </group>
  );
}

function Electron({ position, speed, angle, radius, axis }: { position: THREE.Vector3; speed: number; angle: number; radius: number, axis: THREE.Vector3 }) {
  const ref = useRef<THREE.Mesh>(null);
  const time = useRef(angle);

  useFrame((state, delta) => {
    if (ref.current) {
      time.current += delta * speed;
      const x = Math.cos(time.current) * radius;
      const y = Math.sin(time.current) * radius;
      const z = Math.sin(time.current * 0.7) * Math.cos(time.current * 0.5) * radius * 0.5;

      const vec = new THREE.Vector3(x, y, z);
      vec.applyAxisAngle(axis, time.current * 0.1);

      ref.current.position.copy(vec);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="#FF69B4" emissive="#FF69B4" emissiveIntensity={0.8} roughness={0.2} metalness={0.8} />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color="#FF69B4" intensity={1} />
      <directionalLight position={[0, 5, 5]} intensity={1} />
      <Atom />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
