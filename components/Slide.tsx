'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SlideProps {
  title: string;
  color: string;
  animation?: 'fadeIn' | 'slideUp' | 'zoomIn' | 'flipIn' | 'typewriter';
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

export default function Slide({ title, color, animation = 'fadeIn' }: SlideProps) {
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (animation === 'typewriter') {
      const typingInterval = setInterval(() => {
        setIndex((prev) => {
          if (prev < title.length) {
            setTypedText(title.slice(0, prev + 1));
            return prev + 1;
          } else {
            clearInterval(typingInterval);
            return prev;
          }
        });
      }, 100);

      return () => {
        clearInterval(typingInterval);
      };
    }
  }, [animation, title]);

  const chosen = animations[animation as keyof typeof animations];

  return (
    <section className={`h-screen snap-center flex flex-col items-center justify-start px-10 pt-28 ${color}`}>
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
    </section>
  );
}
