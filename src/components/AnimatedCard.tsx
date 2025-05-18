
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  description,
  icon,
  className,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={cn(
        'group p-6 rounded-lg border bg-card text-card-foreground shadow transition-all duration-300',
        'hover-lift cursor-pointer',
        isHovered && 'shadow-lg border-primary/20',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {icon && (
        <div className="mb-4 text-primary transition-all duration-300 transform group-hover:scale-110">
          {icon}
        </div>
      )}
      <h3 className={cn(
        'text-lg font-semibold transition-all duration-300',
        isHovered ? 'gradient-text' : ''
      )}>
        {title}
      </h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
      
      <div className="h-1 w-0 bg-gradient-to-r from-primary to-accent mt-4 transition-all duration-500 ease-out group-hover:w-full" />
    </div>
  );
};

export default AnimatedCard;
