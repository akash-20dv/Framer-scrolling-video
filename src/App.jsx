import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
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

  return (
    <div
      style={{
        height: '3000px',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 style={{
        fontSize: 'font-size: clamp(10vw , 12vw , 14vw)',
        fontWeight: 'bold',
        padding: '20px',
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '90%',
        margin:'auto',
        textAlign: 'center',
        zIndex: 1000,
      }}>
        Let's create your own websites like Apple

       
        <span style={{fontSize:'3rem' , color: "white", display: 'block'}}>scroll Down</span>
      </h1>
      
      <canvas  width={1000} height={1000} ref={ref} 
        
        />
    </div>
  );
}

export default App;
