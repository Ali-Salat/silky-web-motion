
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'glow';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  animationType?: 'pulse' | 'shake' | 'bounce' | 'none';
  children: React.ReactNode;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  className,
  variant = 'default',
  size = 'default',
  animationType = 'none',
  children,
  ...props
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
    
    if (animationType !== 'none') {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };
  
  return (
    <Button
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        variant === 'glow' && 'bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_15px_rgba(var(--primary),0.5)]',
        animationType === 'pulse' && isAnimating && 'animate-pulse',
        animationType === 'bounce' && isAnimating && 'animate-bounce',
        animationType === 'shake' && isAnimating && 'animate-[shake_0.5s_ease-in-out]',
        className
      )}
      variant={variant === 'glow' ? 'default' : variant}
      size={size}
      onClick={handleClick}
      {...props}
    >
      {children}
      <span className="absolute inset-0 w-full h-full bg-white/30 scale-0 rounded-md transition-transform duration-500 ease-out origin-center group-hover:scale-100" />
    </Button>
  );
};

export default AnimatedButton;
