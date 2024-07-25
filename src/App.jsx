import { useMotionValueEvent, useScroll, useTransform, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef } from 'react';

function App() {
  const ref = useRef(null);
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
      if (images[index - 1]) {
        ref.current?.getContext('2d')?.drawImage(images[index - 1], 0, 0);
      }
    },
    [images]
  );

  const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 86]);

  useMotionValueEvent(currentIndex, 'change', (latest) => {
    render(Number(latest.toFixed()));
  });

  useEffect(() => {
    render(1);
  }, [render]);

  useEffect(() => {
    const smoothScroll = (event) => {
      event.preventDefault();
      const targetPosition = window.pageYOffset + (event.deltaY * 2);
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    };

    window.addEventListener('wheel', smoothScroll, { passive: false });

    return () => window.removeEventListener('wheel', smoothScroll);
  }, []);

  return (
    <div style={{
      height: '3000px',
      backgroundColor: 'black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h1 style={{
        fontSize: '24px',
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
      }}>
        Let's create your own websites like Apple
      </h1>
      <motion.canvas
        width={1000}
        height={1000}
        ref={ref}
        style={{
          marginTop: '60px',
        }}
      />
    </div>
  );
}

export default App;
