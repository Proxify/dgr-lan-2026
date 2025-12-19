'use client';

import { useEffect, useRef } from 'react';

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  appear() {
    this.isIdle = false;

    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }

    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }

    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }

    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;

    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }

    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }

    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

interface PixelCanvasProps {
  colors?: string[];
  gap?: number;
  speed?: number;
  noFocus?: boolean;
  className?: string;
}

export function PixelCanvas({
  colors = ['#00d4ff', '#ff2a6d', '#00ff41'],
  gap = 5,
  speed = 35,
  noFocus = false,
  className = '',
}: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>();
  const timePreviousRef = useRef<number>(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const timeInterval = 1000 / 60;

    const clampedGap = Math.max(4, Math.min(50, gap));
    const throttle = 0.001;
    const clampedSpeed = reducedMotion
      ? 0
      : Math.max(0, Math.min(100, speed)) * throttle;

    const getDistanceToCanvasCenter = (x: number, y: number) => {
      const dx = x - canvas.width / 2;
      const dy = y - canvas.height / 2;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const createPixels = () => {
      pixelsRef.current = [];
      for (let x = 0; x < canvas.width; x += clampedGap) {
        for (let y = 0; y < canvas.height; y += clampedGap) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          const delay = reducedMotion ? 0 : getDistanceToCanvasCenter(x, y);
          pixelsRef.current.push(
            new Pixel(canvas, ctx, x, y, color, clampedSpeed, delay)
          );
        }
      }
    };

    const init = () => {
      const rect = container.getBoundingClientRect();
      // Use ceil to ensure full coverage, add small buffer to prevent gaps
      const width = Math.ceil(rect.width) + 2;
      const height = Math.ceil(rect.height) + 2;

      canvas.width = width;
      canvas.height = height;

      createPixels();
    };

    const animate = (fnName: 'appear' | 'disappear') => {
      animationRef.current = requestAnimationFrame(() => animate(fnName));

      const timeNow = performance.now();
      const timePassed = timeNow - timePreviousRef.current;

      if (timePassed < timeInterval) return;

      timePreviousRef.current = timeNow - (timePassed % timeInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < pixelsRef.current.length; i++) {
        pixelsRef.current[i][fnName]();
      }

      if (pixelsRef.current.every((pixel) => pixel.isIdle)) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      }
    };

    const handleAnimation = (name: 'appear' | 'disappear') => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animate(name);
    };

    const handleMouseEnter = () => handleAnimation('appear');
    const handleMouseLeave = () => handleAnimation('disappear');

    const handleFocusIn = (e: FocusEvent) => {
      if (container.contains(e.relatedTarget as Node)) return;
      handleAnimation('appear');
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (container.contains(e.relatedTarget as Node)) return;
      handleAnimation('disappear');
    };

    init();

    const resizeObserver = new ResizeObserver(() => init());
    resizeObserver.observe(container);

    const parent = container.parentElement;
    if (parent) {
      parent.addEventListener('mouseenter', handleMouseEnter);
      parent.addEventListener('mouseleave', handleMouseLeave);

      if (!noFocus) {
        parent.addEventListener('focusin', handleFocusIn as EventListener);
        parent.addEventListener('focusout', handleFocusOut as EventListener);
      }
    }

    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (parent) {
        parent.removeEventListener('mouseenter', handleMouseEnter);
        parent.removeEventListener('mouseleave', handleMouseLeave);
        if (!noFocus) {
          parent.removeEventListener('focusin', handleFocusIn as EventListener);
          parent.removeEventListener('focusout', handleFocusOut as EventListener);
        }
      }
    };
  }, [colors, gap, speed, noFocus]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
