'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const duration = 700;
    const intervalTime = 15;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) {
              setTimeout(onComplete, 250);
            }
          }, 150);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  useEffect(() => {
    document.body.style.overflow = isDone ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDone]);

  // SVG circular loader calculations
  const radius = 44;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-dark select-none"
        >
          <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
            <svg height={radius * 2} width={radius * 2} className="absolute -rotate-90">
              <circle
                stroke="rgba(42, 63, 106, 0.3)"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <circle
                stroke="#FF6B35"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.1s linear' }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
            </svg>
            <Image
              src="/logo-light-v3.png"
              alt="Sushi Travels Logo"
              title="Sushi Travels Logo"
              width={56}
              height={56}
              priority
              className="w-14 h-14 object-contain"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1">
            Sushi Travels
          </h1>
          <p className="text-[11px] text-cream-warm/90 uppercase tracking-[0.2em]">
            Every Road, A New Story
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
