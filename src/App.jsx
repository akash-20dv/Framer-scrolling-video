import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function App() {
  const ref = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 1000 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['center end', 'start start'],
  });

  const images = useMemo(() => {
    const loadedImages = [];
    for (let i = 1; i <= 86; i++) {
      const img = new Image();
      img.src = `/images/${i}.webp`;
      loadedImages.push(img);
    }
    return loadedImages;
  }, []);

  const render = useCallback(
    (index) => {
      if (images[index - 1] && ref.current) {
        const ctx = ref.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
          const img = images[index - 1];
          const scale = Math.min(canvasSize.width / img.width, canvasSize.height / img.height);
          const x = (canvasSize.width - img.width * scale) / 2;
          const y = (canvasSize.height - img.height * scale) / 2;
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
      }
    },
    [images, canvasSize]
  );

  const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 86]);

  useMotionValueEvent(currentIndex, 'change', (latest) => {
    render(Number(latest.toFixed()));
  });

  useEffect(() => {
    const handleResize = () => {
      const size = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.9);
      setCanvasSize({ width: size, height: size });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    render(1);
  }, [render, canvasSize]);

  return (
    <div
      style={{
        height: '300vh',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 'bold',
          padding: '20px',
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          textAlign: 'center',
          zIndex: 1000,
        }}
      >
        Let's create your own websites like Apple
        <span style={{ fontSize: 'clamp(1rem, 3vw, 2rem)', color: "white", display: 'block' }}>scroll Down</span>
      </h1>
      
      <canvas
        width={canvasSize.width}
        height={canvasSize.height}
        ref={ref}
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}

export default App;
