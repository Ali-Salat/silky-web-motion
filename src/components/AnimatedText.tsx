
import React, { useEffect, useRef } from 'react';

const AnimatedText: React.FC<{
  items?: string[];
  interval?: number;
  className?: string;
}> = ({ items = [], interval = 3000, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const currentIndexRef = useRef(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const intervalIdRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Only set up animation if there are multiple items
    if (items.length <= 1 || !containerRef.current) return;
    
    // Create text element
    const element = document.createElement('span');
    element.className = `inline-block transition-all duration-300 ${className}`;
    element.style.opacity = '1';
    element.textContent = items[0] || '';
    
    // Save reference and add to DOM
    elementRef.current = element;
    containerRef.current.appendChild(element);
    
    // Animation functions
    const fadeOut = () => {
      if (!elementRef.current) return;
      elementRef.current.style.opacity = '0';
      elementRef.current.style.transform = 'translateY(8px)';
    };
    
    const fadeIn = () => {
      if (!elementRef.current) return;
      elementRef.current.style.opacity = '1';
      elementRef.current.style.transform = 'translateY(0)';
    };
    
    const updateText = () => {
      if (!elementRef.current) return;
      elementRef.current.textContent = items[currentIndexRef.current];
    };
    
    // Start animation cycle
    intervalIdRef.current = window.setInterval(() => {
      fadeOut();
      
      setTimeout(() => {
        currentIndexRef.current = (currentIndexRef.current + 1) % items.length;
        updateText();
        fadeIn();
      }, 300); // Wait for fade-out animation to complete
      
    }, interval);
    
    // Cleanup function
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      if (elementRef.current && elementRef.current.parentNode) {
        elementRef.current.parentNode.removeChild(elementRef.current);
      }
    };
  }, [items, interval, className]);
  
  // Return a placeholder that the effect will replace with the animated element
  return <span ref={containerRef} className="inline-block">{items[0] || ''}</span>;
};

export default AnimatedText;
