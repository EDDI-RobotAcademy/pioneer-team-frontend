"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Fragment, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Group } from "three";

const enableShadowsOnGroup = (group: Group | null) => {
  if (!group) return;
  group.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });
};

const COLORS = [
  "#F87171",
  "#FBBF24",
  "#60A5FA",
  "#34D399",
  "#F472B6",
  "#A78BFA",
];

const FERRIS_RADIUS = 1.4;
const FERRIS_CABIN_COUNT = 8;
const FERRIS_RIM_GAP = 0.32;
const FERRIS_PILLAR_Z = 0.75;
const FERRIS_GROUND_Y = -2.5;
const FERRIS_CABIN_COLOR = "#6667AB";
const FERRIS_STRUCTURE_COLOR = "#FBBF24";
const FERRIS_RIM_TUBE = 0.05;

const CABIN_R = 0.17;
const CABIN_CYL_LEN = 0.30;
const CABIN_HALF_LEN = CABIN_CYL_LEN / 2;
const CABIN_Y = -0.5;
const FLOOR_THETA_HALF = 0.45;
const FLOOR_THETA_TOP = Math.PI - FLOOR_THETA_HALF;
const FLOOR_THETA_BOTTOM = Math.PI + FLOOR_THETA_HALF;

const GLASS_FRAME_R = CABIN_R + 0.004;
const DOOR_FRAME_R = CABIN_R + 0.007;

const DOOR_X_LEFT = 0.025;
const DOOR_X_RIGHT = CABIN_HALF_LEN - 0.035;
const DOOR_X_MID = (DOOR_X_LEFT + DOOR_X_RIGHT) / 2;
const DOOR_X_LEN = DOOR_X_RIGHT - DOOR_X_LEFT;
const DOOR_THETA_TOP = Math.PI / 5;
const DOOR_THETA_BOTTOM = FLOOR_THETA_TOP - 0.05;

const glassMat = (
  <meshPhysicalMaterial
    color="#e0f2fe"
    metalness={0}
    roughness={0.04}
    transmission={0.93}
    thickness={0.05}
    ior={1.5}
    transparent
    opacity={0.28}
    side={THREE.DoubleSide}
  />
);

const goldFrame = (color = FERRIS_STRUCTURE_COLOR) => (
  <meshStandardMaterial
    color={color}
    metalness={0.5}
    roughness={0.35}
    side={THREE.DoubleSide}
  />
);

const FerrisCabin = () => {
  const cabinTopY = CABIN_Y + CABIN_R;
  const rodCenterY = cabinTopY / 2;
  const rodLength = -cabinTopY;
  return (
    <>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, FERRIS_RIM_GAP * 2, 8]} />
        <meshStandardMaterial color="#525252" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, rodCenterY, 0]}>
        <boxGeometry args={[0.03, rodLength, 0.03]} />
        <meshStandardMaterial color="#525252" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, cabinTopY - 0.018, 0]}>
        <boxGeometry args={[0.08, 0.05, 0.08]} />
        <meshStandardMaterial
          color={FERRIS_CABIN_COLOR}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      <mesh position={[0, CABIN_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry
          args={[
            CABIN_R,
            CABIN_R,
            CABIN_CYL_LEN,
            48,
            1,
            true,
            FLOOR_THETA_TOP,
            FLOOR_THETA_HALF * 2,
          ]}
        />
        <meshStandardMaterial
          color={FERRIS_CABIN_COLOR}
          metalness={0.3}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, CABIN_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry
          args={[
            CABIN_R + 0.001,
            CABIN_R + 0.001,
            CABIN_CYL_LEN,
            48,
            1,
            true,
            FLOOR_THETA_BOTTOM,
            Math.PI * 2 - FLOOR_THETA_HALF * 2,
          ]}
        />
        {glassMat}
      </mesh>

      <mesh
        position={[CABIN_HALF_LEN, CABIN_Y, 0]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        <sphereGeometry
          args={[CABIN_R, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        {glassMat}
      </mesh>
      <mesh
        position={[-CABIN_HALF_LEN, CABIN_Y, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <sphereGeometry
          args={[CABIN_R, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        {glassMat}
      </mesh>

      <mesh position={[0, CABIN_Y - CABIN_R + 0.025, 0]}>
        <boxGeometry args={[CABIN_CYL_LEN * 0.94, 0.04, CABIN_R * 1.5]} />
        <meshStandardMaterial
          color={FERRIS_CABIN_COLOR}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      <mesh position={[CABIN_HALF_LEN * 0.55, CABIN_Y - CABIN_R * 0.5, 0]}>
        <boxGeometry args={[0.08, 0.03, 0.22]} />
        <meshStandardMaterial color="#5556A0" metalness={0.2} roughness={0.5} />
      </mesh>
      <mesh position={[-CABIN_HALF_LEN * 0.55, CABIN_Y - CABIN_R * 0.5, 0]}>
        <boxGeometry args={[0.08, 0.03, 0.22]} />
        <meshStandardMaterial color="#5556A0" metalness={0.2} roughness={0.5} />
      </mesh>

      <mesh position={[0, CABIN_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry
          args={[
            GLASS_FRAME_R,
            GLASS_FRAME_R,
            CABIN_CYL_LEN,
            48,
            1,
            true,
            -0.025,
            0.05,
          ]}
        />
        {goldFrame()}
      </mesh>
      <mesh position={[0, CABIN_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry
          args={[
            GLASS_FRAME_R,
            GLASS_FRAME_R,
            CABIN_CYL_LEN,
            48,
            1,
            true,
            FLOOR_THETA_TOP - 0.025,
            0.05,
          ]}
        />
        {goldFrame()}
      </mesh>
      <mesh position={[0, CABIN_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry
          args={[
            GLASS_FRAME_R,
            GLASS_FRAME_R,
            CABIN_CYL_LEN,
            48,
            1,
            true,
            FLOOR_THETA_BOTTOM - 0.025,
            0.05,
          ]}
        />
        {goldFrame()}
      </mesh>

      <mesh
        position={[-CABIN_HALF_LEN + 0.013, CABIN_Y, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry
          args={[
            GLASS_FRAME_R,
            GLASS_FRAME_R,
            0.026,
            48,
            1,
            true,
            FLOOR_THETA_BOTTOM,
            Math.PI * 2 - FLOOR_THETA_HALF * 2,
          ]}
        />
        {goldFrame()}
      </mesh>
      <mesh
        position={[CABIN_HALF_LEN - 0.013, CABIN_Y, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry
          args={[
            GLASS_FRAME_R,
            GLASS_FRAME_R,
            0.026,
            48,
            1,
            true,
            FLOOR_THETA_BOTTOM,
            Math.PI * 2 - FLOOR_THETA_HALF * 2,
          ]}
        />
        {goldFrame()}
      </mesh>

      <mesh position={[DOOR_X_MID, CABIN_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry
          args={[
            DOOR_FRAME_R,
            DOOR_FRAME_R,
            DOOR_X_LEN,
            48,
            1,
            true,
            DOOR_THETA_TOP - 0.018,
            0.036,
          ]}
        />
        {goldFrame()}
      </mesh>
      <mesh position={[DOOR_X_MID, CABIN_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry
          args={[
            DOOR_FRAME_R,
            DOOR_FRAME_R,
            DOOR_X_LEN,
            48,
            1,
            true,
            DOOR_THETA_BOTTOM - 0.018,
            0.036,
          ]}
        />
        {goldFrame()}
      </mesh>
      <mesh
        position={[DOOR_X_LEFT, CABIN_Y, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry
          args={[
            DOOR_FRAME_R,
            DOOR_FRAME_R,
            0.022,
            32,
            1,
            true,
            DOOR_THETA_TOP,
            DOOR_THETA_BOTTOM - DOOR_THETA_TOP,
          ]}
        />
        {goldFrame()}
      </mesh>
      <mesh
        position={[DOOR_X_RIGHT, CABIN_Y, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry
          args={[
            DOOR_FRAME_R,
            DOOR_FRAME_R,
            0.022,
            32,
            1,
            true,
            DOOR_THETA_TOP,
            DOOR_THETA_BOTTOM - DOOR_THETA_TOP,
          ]}
        />
        {goldFrame()}
      </mesh>

      <mesh position={[DOOR_X_RIGHT - 0.018, CABIN_Y - 0.04, CABIN_R + 0.016]}>
        <boxGeometry args={[0.024, 0.022, 0.014]} />
        <meshStandardMaterial
          color={FERRIS_STRUCTURE_COLOR}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[DOOR_X_MID, CABIN_Y - CABIN_R + 0.01, CABIN_R - 0.005]}>
        <boxGeometry args={[DOOR_X_LEN, 0.014, 0.03]} />
        <meshStandardMaterial
          color={FERRIS_STRUCTURE_COLOR}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>
    </>
  );
};

const FerrisPillar = ({ z }: { z: number }) => {
  const pillarHeight = -FERRIS_GROUND_Y;
  return (
    <group position={[0, 0, z]}>
      <mesh position={[0, FERRIS_GROUND_Y / 2, 0]}>
        <boxGeometry args={[0.22, pillarHeight, 0.22]} />
        <meshStandardMaterial color="#a3a3a3" metalness={0.6} roughness={0.4} />
      </mesh>

      <mesh position={[0, FERRIS_GROUND_Y - 0.06, 0]}>
        <boxGeometry args={[0.95, 0.12, 0.95]} />
        <meshStandardMaterial color="#525252" />
      </mesh>
      <mesh position={[0, FERRIS_GROUND_Y - 0.16, 0]}>
        <boxGeometry args={[1.25, 0.08, 1.25]} />
        <meshStandardMaterial color="#3f3f46" />
      </mesh>

      <mesh position={[0, 0.08, 0]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial
          color={FERRIS_STRUCTURE_COLOR}
          metalness={0.5}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
};

const FerrisWheel = () => {
  const wheelRef = useRef<Group>(null);
  const cabinRefs = useRef<(Group | null)[]>([]);
  const sceneRef = useRef<Group>(null);

  useEffect(() => {
    enableShadowsOnGroup(sceneRef.current);
  }, []);

  useFrame((_, delta) => {
    if (!wheelRef.current) return;
    wheelRef.current.rotation.z += delta * 0.35;
    const theta = wheelRef.current.rotation.z;
    cabinRefs.current.forEach((cabin, i) => {
      if (!cabin) return;
      const baseAngle = (i / FERRIS_CABIN_COUNT) * Math.PI * 2;
      const a = baseAngle + theta;
      cabin.position.set(
        Math.cos(a) * FERRIS_RADIUS,
        Math.sin(a) * FERRIS_RADIUS,
        0,
      );
      cabin.rotation.z = 0;
    });
  });

  return (
    <group ref={sceneRef} position={[-3.2, 1.2, -1]}>
      <FerrisPillar z={-FERRIS_PILLAR_Z} />
      <FerrisPillar z={FERRIS_PILLAR_Z} />

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, FERRIS_PILLAR_Z * 2 + 0.1, 16]} />
        <meshStandardMaterial color="#525252" metalness={0.7} roughness={0.3} />
      </mesh>

      <group ref={wheelRef}>
        <mesh position={[0, 0, FERRIS_RIM_GAP]}>
          <torusGeometry args={[FERRIS_RADIUS, FERRIS_RIM_TUBE, 8, 48]} />
          <meshStandardMaterial
            color={FERRIS_STRUCTURE_COLOR}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
        <mesh position={[0, 0, -FERRIS_RIM_GAP]}>
          <torusGeometry args={[FERRIS_RADIUS, FERRIS_RIM_TUBE, 8, 48]} />
          <meshStandardMaterial
            color={FERRIS_STRUCTURE_COLOR}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>

        {Array.from({ length: FERRIS_CABIN_COUNT }).map((_, i) => {
          const angle = (i / FERRIS_CABIN_COUNT) * Math.PI * 2;
          return (
            <Fragment key={`spokes-${i}`}>
              <mesh
                position={[0, 0, FERRIS_RIM_GAP]}
                rotation={[0, 0, angle]}
              >
                <boxGeometry args={[FERRIS_RADIUS * 2, 0.025, 0.025]} />
                <meshStandardMaterial color={FERRIS_STRUCTURE_COLOR} />
              </mesh>
              <mesh
                position={[0, 0, -FERRIS_RIM_GAP]}
                rotation={[0, 0, angle]}
              >
                <boxGeometry args={[FERRIS_RADIUS * 2, 0.025, 0.025]} />
                <meshStandardMaterial color={FERRIS_STRUCTURE_COLOR} />
              </mesh>
            </Fragment>
          );
        })}

        {Array.from({ length: FERRIS_CABIN_COUNT }).map((_, i) => {
          const angle = (i / FERRIS_CABIN_COUNT) * Math.PI * 2;
          const x = Math.cos(angle) * FERRIS_RADIUS;
          const y = Math.sin(angle) * FERRIS_RADIUS;
          return (
            <mesh key={`bracing-${i}`} position={[x, y, 0]}>
              <boxGeometry args={[0.025, 0.025, FERRIS_RIM_GAP * 2]} />
              <meshStandardMaterial color={FERRIS_STRUCTURE_COLOR} />
            </mesh>
          );
        })}

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry
            args={[0.18, 0.18, FERRIS_RIM_GAP * 2 + 0.05, 24]}
          />
          <meshStandardMaterial
            color={FERRIS_STRUCTURE_COLOR}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      </group>

      {Array.from({ length: FERRIS_CABIN_COUNT }).map((_, i) => (
        <group
          key={`cabin-${i}`}
          ref={(el) => {
            cabinRefs.current[i] = el;
          }}
        >
          <FerrisCabin />
        </group>
      ))}
    </group>
  );
};

const HORSE_BODY_COLORS = ["#FCA5A5", "#7DD3FC", "#BEF264", "#F0ABFC"];
const HORSE_MANE = "#FFFFFF";
const SADDLE_COLOR = "#7C2D12";
const POLE_COLOR = "#FBBF24";
const ROOF_RED = "#F87171";
const ROOF_GOLD = "#FBBF24";

const CarouselHorse = ({
  angle,
  bodyColor,
}: {
  angle: number;
  bodyColor: string;
}) => {
  const x = Math.cos(angle) * 0.85;
  const z = Math.sin(angle) * 0.85;
  return (
    <group position={[x, 0, z]} rotation={[0, Math.PI / 2 - angle, 0]}>
      <mesh position={[0, 0.225, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1.25, 12]} />
        <meshStandardMaterial color={POLE_COLOR} />
      </mesh>

      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.45, 0.26, 0.2]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      <mesh position={[0.17, 0.28, 0]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.16, 0.18, 0.16]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      <mesh position={[0.27, 0.4, 0]}>
        <boxGeometry args={[0.2, 0.16, 0.15]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      <mesh position={[0.38, 0.36, 0]}>
        <boxGeometry args={[0.08, 0.12, 0.12]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      <mesh position={[0.22, 0.52, 0.05]}>
        <coneGeometry args={[0.035, 0.08, 4]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      <mesh position={[0.22, 0.52, -0.05]}>
        <coneGeometry args={[0.035, 0.08, 4]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      <mesh position={[0.34, 0.39, 0.07]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.34, 0.39, -0.07]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      <mesh position={[0.13, 0.42, 0]}>
        <boxGeometry args={[0.14, 0.14, 0.18]} />
        <meshStandardMaterial color={HORSE_MANE} />
      </mesh>

      <mesh position={[-0.24, 0.18, 0]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.06, 0.2, 0.1]} />
        <meshStandardMaterial color={HORSE_MANE} />
      </mesh>

      <mesh position={[0.16, -0.13, 0.07]}>
        <boxGeometry args={[0.06, 0.22, 0.06]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      <mesh position={[0.16, -0.13, -0.07]}>
        <boxGeometry args={[0.06, 0.22, 0.06]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      <mesh position={[-0.16, -0.13, 0.07]}>
        <boxGeometry args={[0.06, 0.22, 0.06]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      <mesh position={[-0.16, -0.13, -0.07]}>
        <boxGeometry args={[0.06, 0.22, 0.06]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>

      <mesh position={[0, 0.26, 0]}>
        <boxGeometry args={[0.2, 0.06, 0.22]} />
        <meshStandardMaterial color={SADDLE_COLOR} />
      </mesh>
      <mesh position={[0.07, 0.31, 0]}>
        <boxGeometry args={[0.04, 0.05, 0.04]} />
        <meshStandardMaterial color={SADDLE_COLOR} />
      </mesh>
    </group>
  );
};

const Carousel = () => {
  const ref = useRef<Group>(null);
  const sceneRef = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.6;
  });
  useEffect(() => {
    enableShadowsOnGroup(sceneRef.current);
  }, []);
  return (
    <group ref={sceneRef} position={[3.2, -1.4, -1]}>
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[1.32, 1.36, 0.12, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[1.22, 1.22, 0.04, 32]} />
        <meshStandardMaterial color={ROOF_GOLD} />
      </mesh>

      <group ref={ref}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1.5, 16]} />
          <meshStandardMaterial color={POLE_COLOR} />
        </mesh>

        <mesh position={[0, 1.05, 0]}>
          <coneGeometry args={[1.32, 0.55, 24]} />
          <meshStandardMaterial color={ROOF_RED} />
        </mesh>

        <mesh position={[0, 1.42, 0]}>
          <coneGeometry args={[0.65, 0.38, 16]} />
          <meshStandardMaterial color={ROOF_GOLD} />
        </mesh>

        <mesh position={[0, 1.72, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color={POLE_COLOR} />
        </mesh>

        <mesh position={[0, 1.88, 0]}>
          <coneGeometry args={[0.04, 0.18, 8]} />
          <meshStandardMaterial color={ROOF_RED} />
        </mesh>

        <mesh position={[0.12, 1.95, 0]}>
          <boxGeometry args={[0.2, 0.1, 0.012]} />
          <meshStandardMaterial color="#60A5FA" />
        </mesh>

        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          const r = 1.32;
          return (
            <mesh
              key={`scallop-${i}`}
              position={[Math.cos(a) * r, 0.8, Math.sin(a) * r]}
            >
              <sphereGeometry args={[0.085, 12, 12]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? ROOF_RED : ROOF_GOLD}
              />
            </mesh>
          );
        })}

        {HORSE_BODY_COLORS.map((color, i) => {
          const a = (i / HORSE_BODY_COLORS.length) * Math.PI * 2;
          return <CarouselHorse key={`horse-${i}`} angle={a} bodyColor={color} />;
        })}
      </group>
    </group>
  );
};

type BalloonProps = {
  x: number;
  color: string;
  speed: number;
  offset: number;
};

const Balloon = ({ x, color, speed, offset }: BalloonProps) => {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.y = (t % 8) - 3.5;
    ref.current.position.x = x + Math.sin(t * 0.7) * 0.4;
    ref.current.rotation.z = Math.sin(t) * 0.12;
  });
  return (
    <group ref={ref} position={[x, -3.5, -2]}>
      <mesh>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, -0.32, 0]}>
        <coneGeometry args={[0.05, 0.1, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[0.01, 1.3, 0.01]} />
        <meshStandardMaterial color="#a3a3a3" />
      </mesh>
    </group>
  );
};

const RAIL_COLOR = "#FFFFFF";
const TIE_COLOR = "#FFFFFF";

const Z_BACK = -5;
const TRACK_Y = 2.5;
const TRACK_X_START = -8;
const TRACK_X_END = 9.5;
const LOOP_CENTER_X = 5.5;
const LOOP_CENTER_Y = 3.5;
const LOOP_RADIUS = 1.0;
const RAIL_OFFSET = 0.18;
const CART_UP_OFFSET = 0.26;

const PHASE_APPROACH_END = 0.4;
const PHASE_LOOP_END = 0.6;
const PHASE_EXIT_END = 0.78;
const CYCLE_SECONDS = 8;

type TrackTransform = {
  position: THREE.Vector3;
  tangent: THREE.Vector3;
  up: THREE.Vector3;
  visible: boolean;
};

const getTrackTransform = (t: number): TrackTransform => {
  if (t <= PHASE_APPROACH_END) {
    const u = t / PHASE_APPROACH_END;
    const x = TRACK_X_START + u * (LOOP_CENTER_X - TRACK_X_START);
    return {
      position: new THREE.Vector3(x, TRACK_Y, Z_BACK),
      tangent: new THREE.Vector3(1, 0, 0),
      up: new THREE.Vector3(0, 1, 0),
      visible: true,
    };
  }
  if (t <= PHASE_LOOP_END) {
    const u = (t - PHASE_APPROACH_END) / (PHASE_LOOP_END - PHASE_APPROACH_END);
    const angle = -Math.PI / 2 + u * Math.PI * 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      position: new THREE.Vector3(
        LOOP_CENTER_X + cos * LOOP_RADIUS,
        LOOP_CENTER_Y + sin * LOOP_RADIUS,
        Z_BACK,
      ),
      tangent: new THREE.Vector3(-sin, cos, 0),
      up: new THREE.Vector3(-cos, -sin, 0),
      visible: true,
    };
  }
  if (t <= PHASE_EXIT_END) {
    const u = (t - PHASE_LOOP_END) / (PHASE_EXIT_END - PHASE_LOOP_END);
    const x = LOOP_CENTER_X + u * (TRACK_X_END - LOOP_CENTER_X);
    return {
      position: new THREE.Vector3(x, TRACK_Y, Z_BACK),
      tangent: new THREE.Vector3(1, 0, 0),
      up: new THREE.Vector3(0, 1, 0),
      visible: true,
    };
  }
  return {
    position: new THREE.Vector3(0, 0, 0),
    tangent: new THREE.Vector3(1, 0, 0),
    up: new THREE.Vector3(0, 1, 0),
    visible: false,
  };
};

const useCoasterAssets = () => {
  return useMemo(() => {
    const N = 240;
    const samples: TrackTransform[] = [];
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * PHASE_EXIT_END;
      samples.push(getTrackTransform(t));
    }

    const rights = samples.map((s) =>
      new THREE.Vector3().crossVectors(s.tangent, s.up).normalize(),
    );

    const leftPts = samples.map((s, i) =>
      s.position.clone().addScaledVector(rights[i], -RAIL_OFFSET),
    );
    const rightPts = samples.map((s, i) =>
      s.position.clone().addScaledVector(rights[i], RAIL_OFFSET),
    );

    const leftRailCurve = new THREE.CatmullRomCurve3(
      leftPts,
      false,
      "centripetal",
    );
    const rightRailCurve = new THREE.CatmullRomCurve3(
      rightPts,
      false,
      "centripetal",
    );

    const leftRailGeom = new THREE.TubeGeometry(
      leftRailCurve,
      N,
      0.04,
      8,
      false,
    );
    const rightRailGeom = new THREE.TubeGeometry(
      rightRailCurve,
      N,
      0.04,
      8,
      false,
    );

    const sleepers: { position: THREE.Vector3; quaternion: THREE.Quaternion }[] =
      [];
    for (let i = 0; i <= N; i += 4) {
      const s = samples[i];
      const matrix = new THREE.Matrix4().makeBasis(
        rights[i],
        s.up,
        s.tangent.clone().negate(),
      );
      const quat = new THREE.Quaternion().setFromRotationMatrix(matrix);
      sleepers.push({ position: s.position.clone(), quaternion: quat });
    }

    return { leftRailGeom, rightRailGeom, sleepers };
  }, []);
};

const CartPassenger = () => (
  <group position={[0, 0.22, 0.05]}>
    <mesh>
      <boxGeometry args={[0.16, 0.2, 0.1]} />
      <meshStandardMaterial color="#7DD3FC" />
    </mesh>
    <mesh position={[0, 0.18, 0]}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color="#FED7AA" />
    </mesh>
    <mesh position={[0, 0.22, -0.015]}>
      <sphereGeometry
        args={[0.085, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]}
      />
      <meshStandardMaterial color="#1f2937" />
    </mesh>
    <mesh position={[0.026, 0.18, 0.07]}>
      <sphereGeometry args={[0.012, 8, 8]} />
      <meshStandardMaterial color="#1f2937" />
    </mesh>
    <mesh position={[-0.026, 0.18, 0.07]}>
      <sphereGeometry args={[0.012, 8, 8]} />
      <meshStandardMaterial color="#1f2937" />
    </mesh>
    <mesh position={[0.0, 0.16, 0.075]}>
      <boxGeometry args={[0.04, 0.012, 0.005]} />
      <meshStandardMaterial color="#EC4899" />
    </mesh>
    <mesh position={[0.13, 0.16, 0]} rotation={[0, 0, -1.0]}>
      <boxGeometry args={[0.04, 0.22, 0.04]} />
      <meshStandardMaterial color="#FED7AA" />
    </mesh>
    <mesh position={[-0.13, 0.16, 0]} rotation={[0, 0, 1.0]}>
      <boxGeometry args={[0.04, 0.22, 0.04]} />
      <meshStandardMaterial color="#FED7AA" />
    </mesh>
  </group>
);

const RollerCoaster = () => {
  const carRef = useRef<Group>(null);
  const sceneRef = useRef<Group>(null);
  const { leftRailGeom, rightRailGeom, sleepers } = useCoasterAssets();

  useEffect(() => {
    enableShadowsOnGroup(sceneRef.current);
  }, []);

  useFrame((state) => {
    if (!carRef.current) return;
    const t = (state.clock.elapsedTime % CYCLE_SECONDS) / CYCLE_SECONDS;
    const transform = getTrackTransform(t);

    if (!transform.visible) {
      carRef.current.visible = false;
      return;
    }
    carRef.current.visible = true;

    const right = new THREE.Vector3()
      .crossVectors(transform.tangent, transform.up)
      .normalize();

    const cartPos = transform.position
      .clone()
      .addScaledVector(transform.up, CART_UP_OFFSET);
    carRef.current.position.copy(cartPos);

    const matrix = new THREE.Matrix4().makeBasis(
      right,
      transform.up,
      transform.tangent.clone().negate(),
    );
    carRef.current.quaternion.setFromRotationMatrix(matrix);
  });

  return (
    <group ref={sceneRef} scale={0.7} position={[0, 1.5, -1.5]}>
      <mesh geometry={leftRailGeom}>
        <meshBasicMaterial color={RAIL_COLOR} />
      </mesh>
      <mesh geometry={rightRailGeom}>
        <meshBasicMaterial color={RAIL_COLOR} />
      </mesh>

      {sleepers.map((s, i) => (
        <mesh key={`tie-${i}`} position={s.position} quaternion={s.quaternion}>
          <boxGeometry args={[0.46, 0.04, 0.06]} />
          <meshBasicMaterial color={TIE_COLOR} />
        </mesh>
      ))}

      <group ref={carRef}>
        <mesh>
          <boxGeometry args={[0.4, 0.25, 0.6]} />
          <meshStandardMaterial color="#F472B6" />
        </mesh>
        <mesh position={[0, 0.21, 0.2]}>
          <boxGeometry args={[0.36, 0.18, 0.1]} />
          <meshStandardMaterial color="#FBBF24" />
        </mesh>
        <mesh position={[0, 0.09, 0]}>
          <boxGeometry args={[0.36, 0.04, 0.4]} />
          <meshStandardMaterial color="#FCD34D" />
        </mesh>
        <mesh position={[0, 0.0, -0.32]}>
          <boxGeometry args={[0.4, 0.18, 0.06]} />
          <meshStandardMaterial color="#EC4899" />
        </mesh>

        <mesh position={[0.18, -0.16, -0.22]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.05, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <mesh position={[-0.18, -0.16, -0.22]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.05, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <mesh position={[0.18, -0.16, 0.22]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.05, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <mesh position={[-0.18, -0.16, 0.22]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.05, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>

        <CartPassenger />
      </group>
    </group>
  );
};

const CLOUD_COLOR = "#7DD3FC";

const Cloud = ({ x, y, scale }: { x: number; y: number; scale: number }) => {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.08;
    ref.current.position.x = ((x + t * 2 + 6) % 12) - 6;
  });
  return (
    <group ref={ref} position={[x, y, -3]} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshBasicMaterial color={CLOUD_COLOR} />
      </mesh>
      <mesh position={[0.4, 0.06, 0]}>
        <sphereGeometry args={[0.34, 16, 16]} />
        <meshBasicMaterial color={CLOUD_COLOR} />
      </mesh>
      <mesh position={[-0.34, 0.04, 0]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshBasicMaterial color={CLOUD_COLOR} />
      </mesh>
      <mesh position={[0.12, 0.28, 0]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshBasicMaterial color={CLOUD_COLOR} />
      </mesh>
    </group>
  );
};

export const AmusementParkScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      shadows
      style={{ pointerEvents: "none" }}
    >
      <hemisphereLight
        color="#FFE6E8"
        groundColor="#F5C8CC"
        intensity={0.55}
      />
      <directionalLight
        position={[6, 9, 5]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={30}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0005}
        shadow-radius={4}
      />
      <directionalLight position={[-4, 3, 2]} intensity={0.2} />

      <mesh
        position={[0, -2.5, -1]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 20]} />
        <shadowMaterial opacity={0.25} />
      </mesh>

      <Cloud x={-3} y={2.4} scale={1} />
      <Cloud x={3} y={2.6} scale={0.8} />
      <Cloud x={0} y={2.2} scale={0.7} />

      <FerrisWheel />
      <Carousel />
      <RollerCoaster />

      <Balloon x={-2.4} color="#F87171" speed={0.45} offset={0} />
      <Balloon x={-0.8} color="#FBBF24" speed={0.4} offset={2} />
      <Balloon x={0.8} color="#60A5FA" speed={0.5} offset={4} />
      <Balloon x={2.4} color="#34D399" speed={0.42} offset={6} />
      <Balloon x={1.6} color="#F472B6" speed={0.48} offset={1.5} />
    </Canvas>
  );
};
