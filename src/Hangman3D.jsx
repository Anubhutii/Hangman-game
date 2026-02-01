import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import { useRef } from "react";

/* ================= ANIMATED WRAPPER ================= */
const AnimatedPart = ({ show, children }) => {
  const { scale } = useSpring({
    scale: show ? 1 : 0,
    config: { tension: 160, friction: 22 },
  });

  return <animated.group scale={scale}>{children}</animated.group>;
};

/* ================= SOFT MATERIAL ================= */
const softMat = {
  roughness: 0.45,
  metalness: 0.05,
};

/* ================= BASE ================= */
const Base = () => (
  <group position={[0, -1.4, 0]}>
    {/* Bottom heavy plate */}
    <mesh>
      <cylinderGeometry args={[1.8, 1.8, 0.18, 40]} />
      <meshStandardMaterial color="#6b3e1e" {...softMat} />
    </mesh>

    {/* Top smaller plate */}
    <mesh position={[0, 0.15, 0]}>
      <cylinderGeometry args={[1.4, 1.4, 0.12, 40]} />
      <meshStandardMaterial color="#8b4513" {...softMat} />
    </mesh>
  </group>
);

/* ================= GALLOWS ================= */
const Pole = () => (
  <group position={[-0.9, -0.1, 0]}>
    {/* Pole foot */}
    <mesh position={[0, -1.6, 0]}>
      <cylinderGeometry args={[0.25, 0.25, 0.25, 24]} />
      <meshStandardMaterial color="#6b3e1e" {...softMat} />
    </mesh>

    {/* Main pole */}
    <mesh>
      <cylinderGeometry args={[0.15, 0.15, 3.4, 32]} />
      <meshStandardMaterial color="#8b4513" {...softMat} />
    </mesh>

    {/* Pole cap */}
    <mesh position={[0, 1.7, 0]}>
      <sphereGeometry args={[0.17, 24, 24]} />
      <meshStandardMaterial color="#7a3f1d" {...softMat} />
    </mesh>
  </group>
);

const TopBar = () => (
  <group position={[0.2, 1.45, 0]}>
    {/* Main bar */}
    <mesh rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.14, 0.14, 2.4, 32]} />
      <meshStandardMaterial color="#8b4513" {...softMat} />
    </mesh>

    {/* Left rounded end */}
    <mesh position={[-1.2, 0, 0]}>
      <sphereGeometry args={[0.14, 20, 20]} />
      <meshStandardMaterial color="#7a3f1d" {...softMat} />
    </mesh>
  </group>
);

const Rope = () => (
  <group position={[0.7 - 0.1, 1.01, 0]}>
    {/* Knot */}
    <mesh position={[0, 0.12, 0]}>
      <sphereGeometry args={[0.07, 16, 16]} />
      <meshStandardMaterial color="#caa24a" roughness={0.6} />
    </mesh>

    {/* Main rope */}
    <mesh>
      <cylinderGeometry args={[0.035, 0.035, 0.7, 20]} />
      <meshStandardMaterial color="#d4a017" roughness={0.65} />
    </mesh>

    {/* Bottom loop (soft end) */}
    <mesh position={[0, -0.38, 0]}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshStandardMaterial color="#caa24a" roughness={0.65} />
    </mesh>
  </group>
);

/* ================= HEAD WITH BLINK ================= */
const Head = () => {
  const leftEye = useRef();
  const rightEye = useRef();

  const timer = useRef(0);
  const nextBlink = useRef(Math.random() * 3 + 2);
  const duration = 0.12;

  useFrame((_, delta) => {
    timer.current += delta;

    if (timer.current > nextBlink.current) {
      const t = timer.current - nextBlink.current;

      if (t < duration / 2) {
        const s = 1 - t / (duration / 2);
        leftEye.current.scale.y = s;
        rightEye.current.scale.y = s;
      } else if (t < duration) {
        const s = (t - duration / 2) / (duration / 2);
        leftEye.current.scale.y = s;
        rightEye.current.scale.y = s;
      } else {
        timer.current = 0;
        nextBlink.current = Math.random() * 3 + 2;
        leftEye.current.scale.y = 1;
        rightEye.current.scale.y = 1;
      }
    }
  });

  return (
    <group position={[0.9, 0.28, 0]}>
      {/* ================= HEAD ================= */}
      <mesh>
        <sphereGeometry args={[0.25, 48, 48]} />
        <meshStandardMaterial color="#f1d9a7" {...softMat} />
      </mesh>

      {/* ================= HAT CROWN ================= */}
      <mesh position={[0, 0.22, 0]}>
        <capsuleGeometry args={[0.14, 0.02, 16, 32]} />
        <meshStandardMaterial color="#2b1b0e" roughness={0.6} metalness={0} />
      </mesh>

      {/* ================= HAT BAND ================= */}
      <mesh position={[0, 0.18, 0.16]}>
        <cylinderGeometry args={[0.19, 0.19, 0.03, 32]} />
        <meshStandardMaterial color="#c0392b" roughness={0.5} />
      </mesh>

      {/* ================= HAT BRIM ================= */}
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.04, 40]} />
        <meshStandardMaterial color="#2b1b0e" roughness={0.65} />
      </mesh>

      {/* ================= EYES ================= */}
      <mesh ref={leftEye} position={[-0.07, 0.06, 0.22]}>
        <sphereGeometry args={[0.024, 24, 24]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      <mesh ref={rightEye} position={[0.07, 0.06, 0.22]}>
        <sphereGeometry args={[0.024, 24, 24]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      {/* ================= LIP ================= */}
      <mesh position={[0, -0.06, 0.22]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.03, 0.04, 16, 32]} />
        <meshStandardMaterial color="#d35400" roughness={0.35} />
      </mesh>
    </group>
  );
};

/* ================= BODY PARTS ================= */
const Body = () => (
  <mesh position={[0.9, -0.25, 0]}>
    <capsuleGeometry args={[0.18, 0.5, 16, 32]} />
    <meshStandardMaterial color="#3fa9f5" {...softMat} />
  </mesh>
);

const LeftArm = () => (
  <mesh position={[0.6, -0.15, 0]} rotation={[0, 0, -Math.PI / 4]}>
    <capsuleGeometry args={[0.07, 0.35, 12, 24]} />
    <meshStandardMaterial color="#f1d9a7" {...softMat} />
  </mesh>
);

const RightArm = () => (
  <mesh position={[1.2, -0.15, 0]} rotation={[0, 0, Math.PI / 4]}>
    <capsuleGeometry args={[0.07, 0.35, 12, 24]} />
    <meshStandardMaterial color="#f1d9a7" {...softMat} />
  </mesh>
);

const LeftLeg = () => (
  <group position={[0.8, -0.6, 0]}>
    <mesh position={[0, -0.2, 0]} rotation={[0, 0, -Math.PI / 22]}>
      <capsuleGeometry args={[0.08, 0.35, 12, 24]} />
      <meshStandardMaterial color="#ffd23f" {...softMat} />
    </mesh>
  </group>
);

const RightLeg = () => (
  <group position={[1.03, -0.6, 0]}>
    <mesh position={[0, -0.2, 0]} rotation={[0, 0, Math.PI / 22]}>
      <capsuleGeometry args={[0.08, 0.35, 12, 24]} />
      <meshStandardMaterial color="#ffd23f" {...softMat} />
    </mesh>
  </group>
);

/* ================= HUMAN ================= */
const Human = ({ wrongGuesses }) => {
  const ref = useRef();
  const isLose = wrongGuesses >= 9;

  useFrame(({ clock }) => {
    if (isLose && ref.current) {
      ref.current.rotation.z = Math.sin(clock.elapsedTime) * 0.08;
    }
  });

  return (
    <group ref={ref}>
      <AnimatedPart show={wrongGuesses >= 4}>
        <Head />
      </AnimatedPart>
      <AnimatedPart show={wrongGuesses >= 5}>
        <Body />
      </AnimatedPart>
      <AnimatedPart show={wrongGuesses >= 6}>
        <LeftArm />
      </AnimatedPart>
      <AnimatedPart show={wrongGuesses >= 7}>
        <RightArm />
      </AnimatedPart>
      <AnimatedPart show={wrongGuesses >= 8}>
        <LeftLeg />
      </AnimatedPart>
      <AnimatedPart show={wrongGuesses >= 9}>
        <RightLeg />
      </AnimatedPart>
    </group>
  );
};

/* ================= SCENE ================= */
const Scene = ({ wrongGuesses }) => (
  <>
    <ambientLight intensity={0.9} />
    <directionalLight position={[2, 4, 5]} />

    <group position={[0, -0.3, 0]}>
      <Base />
      <AnimatedPart show={wrongGuesses >= 1}>
        <Pole />
      </AnimatedPart>
      <AnimatedPart show={wrongGuesses >= 2}>
        <TopBar />
      </AnimatedPart>
      <AnimatedPart show={wrongGuesses >= 3}>
        <Rope />
      </AnimatedPart>
      {/* <Human wrongGuesses={wrongGuesses} /> */}
      <group position={[-0.3, 0.05, 0]}>
        <Human wrongGuesses={wrongGuesses} />
      </group>
    </group>

    <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
  </>
);

/* ================= MAIN ================= */
const Hangman3D = ({ wrongGuesses }) => (
  <div style={{ width: "100%", height: "420px" }}>
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <Scene wrongGuesses={wrongGuesses} />
    </Canvas>
  </div>
);

export default Hangman3D;
