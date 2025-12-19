'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAP(
  callback: (gsap: typeof import('gsap').gsap, ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger) => void,
  dependencies: React.DependencyList = []
) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      callback(gsap, ScrollTrigger);
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

export { gsap, ScrollTrigger };
