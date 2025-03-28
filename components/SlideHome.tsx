'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, ReactNode } from 'react';
import IntroScene from './IntroScene';

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

export default function SlideHome({ title, color, animation = 'fadeIn' }: SlideProps) {
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    if (animation === 'typewriter' && typeof title === 'string') {
      setTypedText('');
      setIndex(0);
      const typingInterval = setInterval(() => {
        setIndex((prev) => {
          if (prev < title.length) {
            setTypedText(title.slice(0, prev + 1));
            return prev + 1;
          } else {
            clearInterval(typingInterval);
            setShowDescription(true);
            return prev;
          }
        });
      }, 100);

      return () => {
        clearInterval(typingInterval);
      };
    } else {
      setShowDescription(true);
    }
  }, [animation, title]);

  const chosen = animations[animation as keyof typeof animations];

  return (
    <section className={`h-screen snap-center flex flex-col md:flex-row items-center justify-start gap-6 md:gap-10 px-10 pt-20 ${color} relative`}>
      {/* Световой фон */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-[-100px] top-[30%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-yellow-300 via-purple-200 to-orange-100 opacity-10 blur-3xl" />
        <div className="absolute right-[-150px] bottom-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-yellow-200 via-yellow-100 to-transparent opacity-10 blur-2xl" />
      </div>

      <div className="w-full flex flex-col items-center md:items-start md:w-1/2 pt-10">
        {animation === 'typewriter' ? (
          <>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold font-mono whitespace-normal break-words max-w-4xl text-center md:text-left mb-12">
              {typedText}
            </h2>
            {showDescription && (
              <motion.p
                className="text-sm sm:text-base md:text-lg text-gray-500 max-w-3xl mt-4 text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                AC&amp;DL — это команда профессиональных электриков, предлагающих современные решения для вашего дома и бизнеса. Мы объединяем многолетний опыт с передовыми технологиями, чтобы обеспечить надёжность, безопасность и качество каждой установки. От мелкого ремонта до комплексных проектов — мы подходим с вниманием к каждой детали.
              </motion.p>
            )}
          </>
        ) : (
          <>
            <motion.h2
              className="text-xl sm:text-2xl md:text-4xl font-bold whitespace-normal break-words max-w-4xl text-center md:text-left"
              initial={chosen.initial}
              animate={chosen.animate}
            >
              {title}
            </motion.h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-3xl mt-4 text-center md:text-left">
              AC&amp;DL — это команда профессиональных электриков, предлагающих современные решения для вашего дома и бизнеса. Мы объединяем многолетний опыт с передовыми технологиями, чтобы обеспечить надёжность, безопасность и качество каждой установки. От мелкого ремонта до комплексных проектов — мы подходим с вниманием к каждой детали.
            </p>
          </>
        )}
      </div>

      <div className="w-full md:w-1/2 h-[400px] md:h-[500px] mt-6 md:mt-0">
        <IntroScene />
      </div>
    </section>
  );
}
