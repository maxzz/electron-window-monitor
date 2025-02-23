import { motion, useAnimate } from 'motion/react';
import { useEffect, RefObject } from 'react';

interface EyeMovement {
  x: number;
  y: number;
}

type AnimationScope = ReturnType<typeof useAnimate>[0];
type AnimateFunction = ReturnType<typeof useAnimate>[1];

export function EyesFollowCursor(): JSX.Element {
  const [scopeLeft, animateLeft] = useAnimate();
  const [scopeRight, animateRight] = useAnimate();

  useEffect(function() {
    function handleMouseMove(e: MouseEvent): void {
      const { clientX, clientY } = e;
      
      function moveEye(eyeRef: AnimationScope): EyeMovement | undefined {
        const eye = eyeRef.current;
        if (!eye) return;
        
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        
        // Calculate distance from eye to cursor
        const deltaX = clientX - eyeCenterX;
        const deltaY = clientY - eyeCenterY;
        
        // Calculate the angle between eye and cursor
        const angle = Math.atan2(deltaY, deltaX);
        
        // Maximum movement radius (in pixels)
        const maxRadius = 5;
        
        // Calculate new position with constraints
        const x = Math.cos(angle) * maxRadius;
        const y = Math.sin(angle) * maxRadius;
        
        return { x, y };
      }

      async function animateEye(
        scope: AnimationScope, 
        animate: AnimateFunction
      ): Promise<void> {
        const movement = moveEye(scope);
        if (!movement) return;
        
        const { x, y } = movement;
        await animate(
          scope.current,
          { 
            x,
            y,
          },
          { 
            duration: 0.3,
            ease: "easeOutElastic",
            type: "spring",
            stiffness: 200,
            damping: 15
          }
        );
      }

      animateEye(scopeLeft, animateLeft);
      animateEye(scopeRight, animateRight);
    }

    window.addEventListener('mousemove', handleMouseMove);
    return function cleanup() {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animateLeft, animateRight]);

  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <div className="relative w-16 h-16 bg-white rounded-full shadow-inner">
        <motion.div
          ref={scopeLeft}
          className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2"
          initial={{ x: 0, y: 0 }}
        >
          <div className="w-full h-full bg-black rounded-full" />
        </motion.div>
      </div>
      <div className="relative w-16 h-16 bg-white rounded-full shadow-inner">
        <motion.div
          ref={scopeRight}
          className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2"
          initial={{ x: 0, y: 0 }}
        >
          <div className="w-full h-full bg-black rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}