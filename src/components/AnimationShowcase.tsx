
import React, { useState } from 'react';
import AnimatedCard from './AnimatedCard';
import AnimatedButton from './AnimatedButton';
import AnimatedCounter from './AnimatedCounter';
import AnimatedText from './AnimatedText';

const AnimationShowcase: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold gradient-text">Animated Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <AnimatedButton variant="default" animationType="pulse">
            Pulse Button
          </AnimatedButton>
          <AnimatedButton variant="glow" animationType="bounce">
            Bounce Button
          </AnimatedButton>
          <AnimatedButton variant="outline" animationType="shake">
            Shake Button
          </AnimatedButton>
          <AnimatedButton
            variant="secondary"
            onClick={() => setCount(prev => prev + 10)}
          >
            Increment Counter
          </AnimatedButton>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-bold gradient-text">Animated Counter</h2>
        <div className="p-6 rounded-lg border bg-card">
          <AnimatedCounter 
            targetValue={count} 
            className="text-4xl gradient-text"
            prefix="Count: " 
          />
          <div className="mt-4 space-x-2">
            <AnimatedButton 
              size="sm" 
              onClick={() => setCount(prev => prev + 1)}
            >
              +1
            </AnimatedButton>
            <AnimatedButton 
              size="sm" 
              variant="outline" 
              onClick={() => setCount(prev => (prev > 0 ? prev - 1 : 0))}
            >
              -1
            </AnimatedButton>
            <AnimatedButton 
              size="sm" 
              variant="destructive" 
              onClick={() => setCount(0)}
            >
              Reset
            </AnimatedButton>
          </div>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-bold gradient-text">Animated Text</h2>
        <div className="p-6 rounded-lg border bg-card">
          <p className="text-lg">
            Animation is 
            <AnimatedText 
              items={[" amazing", " beautiful", " captivating", " dynamic"]} 
              className="font-bold gradient-text"
            />
          </p>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-bold gradient-text">Fade Animation</h2>
        <div className="p-6 rounded-lg border bg-card space-y-4">
          <AnimatedButton 
            onClick={() => setIsVisible(!isVisible)} 
            variant="outline"
          >
            Toggle Element
          </AnimatedButton>
          
          <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="p-4 bg-primary/10 rounded-lg">
              <p>This element fades and moves when toggled.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-bold gradient-text">Interactive Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatedCard
            title="Hover Effect"
            description="This card has a smooth hover animation."
          />
          <AnimatedCard
            title="Transition Effects"
            description="This card demonstrates color transitions and scaling."
            className="bg-gradient-to-br from-blue-50 to-purple-50"
          />
          <AnimatedCard
            title="Interactive Elements"
            description="This card combines multiple animation techniques."
          />
        </div>
      </section>
    </div>
  );
};

export default AnimationShowcase;
