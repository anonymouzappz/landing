"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  Html,
  OrbitControls,
  Sparkles,
  Stars,
  useTexture,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const TV_TARGET = new THREE.Vector3(1.75, 0.35, -0.25);

function TVScreenContent() {
  const texture = useTexture("/images/remoteforge-tv-banner.jpg");

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;

  return (
    <group position={[0, 0, 0.235]}>
      <mesh>
        <planeGeometry args={[5.85, 3.25]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[5.9, 3.3]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.055} />
      </mesh>
    </group>
  );
}

function TV() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y =
      -0.08 + Math.sin(state.clock.elapsedTime * 0.3) * 0.025;

    ref.current.position.y =
      0.35 + Math.sin(state.clock.elapsedTime * 0.7) * 0.04;
  });

  return (
    <group ref={ref} position={[1.75, 0.35, -0.25]}>
      <mesh>
        <boxGeometry args={[6.35, 3.85, 0.28]} />
        <meshStandardMaterial
          color="#050814"
          metalness={0.92}
          roughness={0.13}
          emissive="#111827"
          emissiveIntensity={0.25}
        />
      </mesh>

      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[6.05, 3.55]} />
        <meshBasicMaterial color="#7c3cff" transparent opacity={0.22} />
      </mesh>

      <TVScreenContent />

      <mesh position={[0, 0, 0.265]}>
        <planeGeometry args={[6.1, 3.6]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.055} />
      </mesh>

      <mesh position={[0, -2.15, 0]}>
        <boxGeometry args={[1.75, 0.22, 0.7]} />
        <meshStandardMaterial color="#0b1220" metalness={0.9} roughness={0.18} />
      </mesh>

      <mesh position={[0, -1.9, 0]}>
        <boxGeometry args={[0.3, 0.62, 0.35]} />
        <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.18} />
      </mesh>

      <Sparkles
        count={130}
        scale={[6.4, 4.2, 2.3]}
        size={4}
        speed={0.35}
        color="#8b5cf6"
      />
    </group>
  );
}

function Speaker({ side }: { side: "left" | "right" }) {
  const x = side === "left" ? -3.9 : 5.35;
  const color = side === "left" ? "#22d3ee" : "#d946ef";

  return (
    <group position={[x, -1.2, -0.75]}>
      <mesh>
        <boxGeometry args={[0.58, 1.9, 0.52]} />
        <meshStandardMaterial
          color="#050712"
          metalness={0.65}
          roughness={0.25}
          emissive={color}
          emissiveIntensity={0.04}
        />
      </mesh>

      {[0.45, -0.35].map((y) => (
        <mesh key={y} position={[0, y, 0.28]}>
          <circleGeometry args={[0.22, 48]} />
          <meshStandardMaterial
            color="#080b16"
            emissive={color}
            emissiveIntensity={0.22}
            metalness={0.35}
            roughness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

function NeonBar({ side }: { side: "left" | "right" }) {
  const x = side === "left" ? -4.65 : 6.1;
  const color = side === "left" ? "#22d3ee" : "#d946ef";

  return (
    <mesh position={[x, -0.75, -0.9]}>
      <boxGeometry args={[0.08, 2.2, 0.08]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function RemoteButton({
  x,
  y,
  radius,
  color,
  glow = 0.35,
}: {
  x: number;
  y: number;
  radius: number;
  color: string;
  glow?: number;
}) {
  return (
    <mesh position={[x, y, 0.26]}>
      <circleGeometry args={[radius, 48]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={glow}
        metalness={0.35}
        roughness={0.18}
      />
    </mesh>
  );
}

function Remote() {
  const remoteRig = useRef<THREE.Group>(null);
  const remoteBody = useRef<THREE.Group>(null);
  const { pointer, viewport } = useThree();

  const buttons = useMemo(
    () =>
      [
        { x: 0, y: 1.34, r: 0.14, color: "#22d3ee", glow: 1.1 },
        { x: -0.26, y: 0.98, r: 0.09, color: "#111827", glow: 0.15 },
        { x: 0.26, y: 0.98, r: 0.09, color: "#111827", glow: 0.15 },
        { x: 0, y: 0.58, r: 0.26, color: "#111827", glow: 0.3 },
        { x: 0, y: 0.58, r: 0.14, color: "#0f172a", glow: 0.45 },
        { x: -0.36, y: 0.22, r: 0.1, color: "#111827", glow: 0.2 },
        { x: 0.36, y: 0.22, r: 0.1, color: "#111827", glow: 0.2 },
        { x: -0.28, y: -0.16, r: 0.1, color: "#111827", glow: 0.2 },
        { x: 0.28, y: -0.16, r: 0.1, color: "#111827", glow: 0.2 },
        { x: -0.28, y: -0.5, r: 0.1, color: "#111827", glow: 0.2 },
        { x: 0.28, y: -0.5, r: 0.1, color: "#111827", glow: 0.2 },
        { x: -0.33, y: -1.02, r: 0.12, color: "#ef4444", glow: 0.55 },
        { x: 0, y: -1.02, r: 0.12, color: "#22c55e", glow: 0.55 },
        { x: 0.33, y: -1.02, r: 0.12, color: "#3b82f6", glow: 0.55 },
      ] as const,
    []
  );

  useFrame((state) => {
    if (!remoteRig.current || !remoteBody.current) return;

    const t = state.clock.elapsedTime;

    const targetPosition = new THREE.Vector3(
      -2.95 + pointer.x * viewport.width * 0.075,
      -1.55 + pointer.y * viewport.height * 0.055 + Math.sin(t * 1.15) * 0.04,
      2.25
    );

    remoteRig.current.position.lerp(targetPosition, 0.075);

    const directionToTv = TV_TARGET.clone()
      .sub(remoteRig.current.position)
      .normalize();

    const baseQuaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      directionToTv
    );

    const handTilt = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        0.75 - pointer.y * 0.05,
        0.15 + pointer.x * 0.05,
        0.15 + Math.sin(t * 1.2) * 0.015
      )
    );

    remoteRig.current.quaternion.slerp(baseQuaternion.multiply(handTilt), 0.075);
    remoteBody.current.position.z = Math.sin(t * 1.2) * 0.015;
  });

  return (
    <Float speed={1.15} floatIntensity={0.2}>
      <group ref={remoteRig} position={[-2.95, -1.55, 2.25]}>
        <group ref={remoteBody}>
          <mesh>
            <boxGeometry args={[1.05, 3.55, 0.4]} />
            <meshStandardMaterial
              color="#070a13"
              metalness={0.92}
              roughness={0.16}
              emissive="#0f172a"
              emissiveIntensity={0.34}
            />
          </mesh>

          <mesh position={[0, 0, 0.235]}>
            <boxGeometry args={[0.87, 3.12, 0.04]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.08} />
          </mesh>

          <mesh position={[0, 1.55, 0.255]}>
            <boxGeometry args={[0.34, 0.07, 0.04]} />
            <meshBasicMaterial color="#22d3ee" />
          </mesh>

          {buttons.map((btn, index) => (
            <RemoteButton
              key={index}
              x={btn.x}
              y={btn.y}
              radius={btn.r}
              color={btn.color}
              glow={btn.glow}
            />
          ))}

          <mesh position={[0, -1.45, 0.26]}>
            <boxGeometry args={[0.55, 0.08, 0.04]} />
            <meshBasicMaterial color="#22d3ee" />
          </mesh>

          <pointLight
            position={[0, 1.45, 0.5]}
            color="#22d3ee"
            intensity={2.4}
            distance={4}
          />
        </group>
      </group>
    </Float>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.05, 0]}>
      <planeGeometry args={[55, 55]} />
      <meshStandardMaterial
        color="#07111f"
        metalness={0.82}
        roughness={0.28}
        emissive="#0f172a"
        emissiveIntensity={0.32}
      />
    </mesh>
  );
}

export default function RemoteForgeWorld() {
  return (
 <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.18, 8.6], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#06101f"]} />
        <fog attach="fog" args={["#06101f", 15, 36]} />

        <ambientLight intensity={1.35} />
        <hemisphereLight color="#dbeafe" groundColor="#312e81" intensity={1.35} />
        <directionalLight position={[5, 6, 5]} intensity={3.8} color="#ffffff" />
        <pointLight position={[-6, 0.8, 4]} intensity={18} color="#22d3ee" />
        <pointLight position={[6, 1.8, 4]} intensity={18} color="#d946ef" />
        <pointLight position={[0, -2, 5]} intensity={7} color="#60a5fa" />

        <Stars radius={125} depth={80} count={4200} factor={4} fade speed={0.38} />

        <Speaker side="left" />
        <Speaker side="right" />
        <NeonBar side="left" />
        <NeonBar side="right" />
        <TV />
        <Remote />
        <Floor />

        <Environment preset="city" />

        <OrbitControls
          enableZoom
          enablePan
          enableRotate
          zoomSpeed={0.75}
          rotateSpeed={0.5}
          panSpeed={0.65}
          minDistance={5}
          maxDistance={16}
          target={[1.2, -0.2, 0]}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,.20),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_72%,rgba(217,70,239,.22),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[.03] via-transparent to-[#06101f]/35" />
    </div>
  );
}