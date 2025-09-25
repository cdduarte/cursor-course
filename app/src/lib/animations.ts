/**
 * Animation utilities for Linear-style smooth animations
 * Provides reusable animation configurations and utilities
 */

export interface AnimationConfig {
  duration: string;
  delay?: string;
  easing: string;
  fillMode: string;
}

// Linear-style fade in from bottom animation
export const fadeInUp: AnimationConfig = {
  duration: '0.8s',
  easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // ease-out
  fillMode: 'both'
};

// Staggered animation delays for multiple elements
export const staggerDelays = {
  first: '0ms',
  second: '150ms', 
  third: '300ms',
  fourth: '450ms',
  fifth: '600ms'
};

// Animation class names
export const animationClasses = {
  fadeInUp: 'animate-fade-in-up',
  fadeInUpDelayed: 'animate-fade-in-up-delayed',
  fadeInUpLate: 'animate-fade-in-up-late',
  pulseGlow: 'animate-pulse-glow',
  subtleJiggle: 'animate-subtle-jiggle'
};

/**
 * Utility function to apply staggered animations to elements
 * @param elements - Array of element selectors or refs
 * @param baseDelay - Base delay in milliseconds
 * @param staggerInterval - Delay between each element
 */
export const applyStaggeredAnimation = (
  elements: (string | HTMLElement)[],
  baseDelay: number = 0,
  staggerInterval: number = 150
) => {
  elements.forEach((element, index) => {
    const el = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement
      : element;
    
    if (el) {
      el.style.animationDelay = `${baseDelay + (index * staggerInterval)}ms`;
      el.classList.add(animationClasses.fadeInUp);
    }
  });
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Conditionally apply animation based on user preferences
 */
export const safeAnimate = (element: HTMLElement, animationClass: string) => {
  if (!prefersReducedMotion()) {
    element.classList.add(animationClass);
  } else {
    // Apply instant visibility for reduced motion users
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }
};

/**
 * Intersection Observer hook for triggering animations on scroll
 */
export const createScrollTrigger = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};
