'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, ReactNode } from 'react';

interface SlideProps {
  title: string;
  color: string;
  animation?: 'fadeIn' | 'slideUp' | 'zoomIn' | 'flipIn' | 'typewriter';
  children?: ReactNode;
}

const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } },
  },
  slideUp: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1 } },
  },
  zoomIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 1 } },
  },
  flipIn: {
    initial: { rotateX: 90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1, transition: { duration: 1 } },
  },
};

export default function Slide({ title, color, animation = 'fadeIn', children }: SlideProps) {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (animation === 'typewriter') {
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < title.length) {
          setTypedText((prev) => prev + title[index]);
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);

      return () => clearInterval(typingInterval);
    }
  }, [animation, title]);

  const chosen = animations[animation as keyof typeof animations];

  return (
    <section className={`h-screen snap-center flex flex-col md:flex-row items-center justify-center gap-10 px-10 ${color}`}>
      <div className="flex-1 flex justify-center md:justify-start">
        {animation === 'typewriter' ? (
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold font-mono whitespace-normal break-words max-w-4xl">
            {typedText}
          </h2>
        ) : (
          <motion.h2
            className="text-xl sm:text-2xl md:text-4xl font-bold whitespace-normal break-words max-w-4xl"
            initial={chosen.initial}
            animate={chosen.animate}
          >
            {title}
          </motion.h2>
        )}
      </div>

      {/* Контент справа (например, 3D-сцена) */}
      {children && (
        <div className="flex-1 w-full h-[400px] md:h-[500px]">
          {children}
        </div>
      )}
    </section>
  );
}
