
// AnimatedText.tsx - Pure JavaScript approach without imports
function AnimatedText(props) {
  const { items = [], interval = 3000, className = '' } = props;
  let currentIndex = 0;
  let isVisible = true;
  let intervalId = null;
  let element = null;
  
  function initialize() {
    if (items.length <= 1) return;
    
    intervalId = setInterval(() => {
      fadeOut();
      
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateText();
        fadeIn();
      }, 300); // Wait for fade-out animation to complete
      
    }, interval);
    
    return () => intervalId && clearInterval(intervalId);
  }
  
  function fadeOut() {
    if (!element) return;
    element.style.opacity = '0';
    element.style.transform = 'translateY(8px)';
  }
  
  function fadeIn() {
    if (!element) return;
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }
  
  function updateText() {
    if (!element) return;
    element.textContent = items[currentIndex];
  }
  
  return {
    mount: function(containerElement) {
      element = document.createElement('span');
      element.className = `inline-block transition-all duration-300 ${className}`;
      element.style.opacity = '1';
      element.textContent = items[currentIndex] || '';
      
      containerElement.appendChild(element);
      initialize();
    },
    unmount: function() {
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  };
}

// For compatibility with the existing React structure
function AnimatedTextReactWrapper(props) {
  const spanRef = React.useRef(null);
  const animatedTextRef = React.useRef(null);
  
  React.useEffect(() => {
    if (spanRef.current && !animatedTextRef.current) {
      animatedTextRef.current = AnimatedText(props);
      animatedTextRef.current.mount(spanRef.current.parentNode);
      spanRef.current.remove();
    }
    
    return () => {
      if (animatedTextRef.current) {
        animatedTextRef.current.unmount();
        animatedTextRef.current = null;
      }
    };
  }, [props.items, props.interval]);
  
  return React.createElement('span', { 
    ref: spanRef,
    className: `inline-block transition-all duration-300 ${props.className || ''}`,
    style: { opacity: 0 }
  }, props.items && props.items[0] || '');
}

export default AnimatedTextReactWrapper;
