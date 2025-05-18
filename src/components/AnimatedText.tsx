
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  items: string[];
  interval?: number;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  items,
  interval = 3000,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (items.length <= 1) return;
    
    const intervalId = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        setIsVisible(true);
      }, 300); // Wait for fade-out animation to complete
      
    }, interval);
    
    return () => clearInterval(intervalId);
  }, [items, interval]);
  
  return (
    <span
      className={cn(
        'inline-block transition-all duration-300',
        isVisible ? 'opacity-100' : 'opacity-0 translate-y-2',
        className
      )}
    >
      {items[currentIndex]}
    </span>
  );
};

export default AnimatedText;
