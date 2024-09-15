// BallCanvas.js
import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei';
import CanvasLoader from '../Loader';

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          flatShading
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const CustomBall = ({ icon }) => {
  return (
    <div className="relative w-28 h-28 mx-auto my-4">
      {/* Base sphere with darker gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full shadow-xl"></div>
      
      {/* Highlight to create 3D effect */}
      <div className="absolute inset-1 bg-gradient-to-tl from-gray-600 via-gray-700 to-transparent rounded-full"></div>
      
      {/* Cubic effect using multiple divs */}
      <div className="absolute inset-2 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full transform rotate-45"></div>
      <div className="absolute inset-2 bg-gradient-to-tl from-gray-700 to-gray-900 rounded-full transform -rotate-45"></div>
      
      {/* Icon container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src={icon} 
          alt="Technology Icon" 
          className="w-16 h-16 object-contain"
        />
      </div>
      
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-200 to-transparent opacity-10 rounded-full"></div>
      
      {/* Pulsing animation */}
      <div className="absolute inset-0 bg-gray-600 opacity-5 rounded-full animate-pulse"></div>
    </div>
  );
};

const BallCanvas = ({ icon }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isFirefox, setIsFirefox] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Detect Firefox
    setIsFirefox(navigator.userAgent.toLowerCase().indexOf('firefox') > -1);

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  if (isMobile || !isFirefox) {
    return <CustomBall icon={icon} />;
  }

  return (
    <Canvas
      frameLoop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;