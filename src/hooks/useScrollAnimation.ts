import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  toggleActions?: string;
  scrub?: boolean | number;
  markers?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      start = 'top 80%',
      toggleActions = 'play none none none',
    } = options;

    gsap.fromTo(
      element,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [options]);

  return ref;
}

export function useStaggerAnimation<T extends HTMLElement>(
  containerSelector: string,
  childSelector: string
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    
    gsap.fromTo(
      children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [containerSelector, childSelector]);

  return ref;
}

export function useCountUpAnimation(
  endValue: number,
  options: { duration?: number; suffix?: string } = {}
) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { duration = 2, suffix = '' } = options;

    const counter = { value: 0 };

    gsap.to(counter, {
      value: endValue,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        element.textContent = Math.floor(counter.value).toLocaleString() + suffix;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [endValue, options]);

  return ref;
}
