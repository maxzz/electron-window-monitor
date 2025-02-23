import { motion, useAnimate } from 'motion/react';
import { useEffect, RefObject } from 'react';

interface EyeMovement {
  rotation: number;
  distance: number;
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
        
        const radian = Math.atan2(clientY - eyeCenterY, clientX - eyeCenterX);
        const rotation = radian * (180 / Math.PI);
        const distance = Math.min(3, Math.hypot(clientX - eyeCenterX, clientY - eyeCenterY) / 100);
        
        return { rotation, distance };
      }

      async function animateEye(
        scope: AnimationScope, 
        animate: AnimateFunction
      ): Promise<void> {
        const movement = moveEye(scope);
        if (!movement) return;
        
        const { rotation, distance } = movement;
        await animate(
          scope.current,
          { 
            transform: `rotate(${rotation}deg) translateX(${distance}px)` 
          },
          { duration: 0.1 }
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
        >
          <div className="w-full h-full bg-black rounded-full" />
        </motion.div>
      </div>
      <div className="relative w-16 h-16 bg-white rounded-full shadow-inner">
        <motion.div
          ref={scopeRight}
          className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-full h-full bg-black rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}