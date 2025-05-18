
// AnimatedCard.tsx - Pure JavaScript approach without imports
function AnimatedCard(props) {
  const { 
    title = '',
    description = '',
    icon = null,
    className = '',
    onClick = () => {}
  } = props;
  
  let isHovered = false;
  let element = null;
  let titleElement = null;
  let progressBar = null;
  let iconContainer = null;
  
  function handleMouseEnter() {
    if (!element) return;
    isHovered = true;
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
  }
  
  function handleMouseLeave() {
    if (!element) return;
    isHovered = false;
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
  }
  
  return {
    mount: function(containerElement) {
      element = document.createElement('div');
      element.className = `group p-6 rounded-lg border bg-card text-card-foreground shadow transition-all duration-300 hover-lift cursor-pointer ${className}`;
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('click', onClick);
      
      if (icon) {
        iconContainer = document.createElement('div');
        iconContainer.className = 'mb-4 text-primary transition-all duration-300 transform';
        iconContainer.innerHTML = icon;
        element.appendChild(iconContainer);
      }
      
      titleElement = document.createElement('h3');
      titleElement.className = 'text-lg font-semibold transition-all duration-300';
      titleElement.textContent = title;
      element.appendChild(titleElement);
      
      const descElement = document.createElement('p');
      descElement.className = 'mt-2 text-muted-foreground';
      descElement.textContent = description;
      element.appendChild(descElement);
      
      progressBar = document.createElement('div');
      progressBar.className = 'h-1 bg-gradient-to-r from-primary to-accent mt-4 transition-all duration-500 ease-out';
      progressBar.style.width = '0';
      element.appendChild(progressBar);
      
      containerElement.appendChild(element);
    },
    unmount: function() {
      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('click', onClick);
        
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }
    }
  };
}

// For compatibility with the existing React structure
function AnimatedCardReactWrapper(props) {
  const divRef = React.useRef(null);
  const cardRef = React.useRef(null);
  
  React.useEffect(() => {
    if (divRef.current && !cardRef.current) {
      cardRef.current = AnimatedCard(props);
      cardRef.current.mount(divRef.current.parentNode);
      divRef.current.remove();
    }
    
    return () => {
      if (cardRef.current) {
        cardRef.current.unmount();
        cardRef.current = null;
      }
    };
  }, [props.title, props.description, props.icon]);
  
  return React.createElement('div', {
    ref: divRef,
    className: `group p-6 rounded-lg border bg-card text-card-foreground shadow transition-all duration-300 ${props.className || ''}`,
    style: { display: 'none' }
  });
}

export default AnimatedCardReactWrapper;
