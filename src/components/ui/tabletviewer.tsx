"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

function TabletModel({ mouse }: { mouse: { x: number; y: number } }) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y = mouse.x * 0.5;
            ref.current.rotation.x = -mouse.y * 0.3;
        }
    });

    return (
        <mesh ref={ref} scale={1.5}>
            <capsuleGeometry args={[0.5, 1, 8, 16]} />
            <meshStandardMaterial color="hotpink" />
        </mesh>
    );
}


export default function TabletViewer() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    return (
        <div
            className="w-full h-[500px]"
            onMouseMove={(e) => {
                const bounds = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
                const y = ((e.clientY - bounds.top) / bounds.height) * 2 - 1;
                setMouse({ x, y });
            }}
        >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Suspense fallback={null}>
                    <TabletModel mouse={mouse} />
                </Suspense>
            </Canvas>
        </div>
    );
}
