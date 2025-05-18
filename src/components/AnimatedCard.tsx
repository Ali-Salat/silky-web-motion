
import React, { useEffect, useRef } from 'react';

type AnimatedCardProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title = '',
  description = '',
  icon = null,
  className = '',
  onClick = () => {}
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const element = containerRef.current;
    let titleElement: HTMLHeadingElement | null = null;
    let progressBar: HTMLDivElement | null = null;
    let iconContainer: HTMLDivElement | null = null;
    
    // Find elements
    titleElement = element.querySelector('h3');
    progressBar = element.querySelector('.progress-bar');
    iconContainer = element.querySelector('.icon-container');
    
    // Event handlers
    const handleMouseEnter = () => {
      element.classList.add('shadow-lg', 'border-primary/20');
      
      if (titleElement) {
        titleElement.classList.add('gradient-text');
      }
      
      if (progressBar) {
        progressBar.style.width = '100%';
      }
      
      if (iconContainer) {
        iconContainer.style.transform = 'scale(1.1)';
      }
    };
    
    const handleMouseLeave = () => {
      element.classList.remove('shadow-lg', 'border-primary/20');
      
      if (titleElement) {
        titleElement.classList.remove('gradient-text');
      }
      
      if (progressBar) {
        progressBar.style.width = '0';
      }
      
      if (iconContainer) {
        iconContainer.style.transform = 'scale(1)';
      }
    };
    
    // Add event listeners
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('click', onClick);
    
    // Cleanup function
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('click', onClick);
    };
  }, [onClick]);
  
  return (
    <div 
      ref={containerRef}
      className={`group p-6 rounded-lg border bg-card text-card-foreground shadow transition-all duration-300 hover-lift cursor-pointer ${className}`}
    >
      {icon && (
        <div className="icon-container mb-4 text-primary transition-all duration-300 transform">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold transition-all duration-300">
        {title}
      </h3>
      <p className="mt-2 text-muted-foreground">
        {description}
      </p>
      <div 
        className="progress-bar h-1 bg-gradient-to-r from-primary to-accent mt-4 transition-all duration-500 ease-out" 
        style={{ width: '0' }}
      />
    </div>
  );
};

export default AnimatedCard;
