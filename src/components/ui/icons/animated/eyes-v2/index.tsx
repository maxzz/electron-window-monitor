import { motion, useAnimate } from 'motion/react';
import { useEffect } from 'react';

type EyeMovement = { x: number; y: number; };

type AnimationScope = ReturnType<typeof useAnimate>[0];
type AnimateFunction = ReturnType<typeof useAnimate>[1];

export function EyesFollowCursor(): JSX.Element {
    const [scopeLeft, animateLeft] = useAnimate();
    const [scopeRight, animateRight] = useAnimate();

    useEffect(
        () => {
            function handleMouseMove(e: MouseEvent): void {
                async function animateEye(scope: AnimationScope, animate: AnimateFunction): Promise<void> {
                    const movement = scope.current && getEyeMovement(scope.current, e);
                    if (movement) {
                        const { x, y } = movement;
                        await animate(scope.current, { x, y }, { duration: 0.1, type: "spring", bounce: 0, stiffness: 1000, damping: 50, });
                    }
                }

                animateEye(scopeLeft, animateLeft);
                animateEye(scopeRight, animateRight);
            }

            window.addEventListener('mousemove', handleMouseMove);
            return function cleanup() {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }, [animateLeft, animateRight]
    );

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

function getEyeMovement(eye: Element, e: MouseEvent): EyeMovement | undefined {

    const eyeRect = eye.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    // Calculate distance and angle
    const deltaX = e.clientX - eyeCenterX;
    const deltaY = e.clientY - eyeCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Maximum radius the pupil can move (in pixels)
    const maxRadius = 8;

    // Calculate scale factor to limit movement
    const scale = Math.min(1, maxRadius / Math.max(1, distance));

    // Apply scaled movement
    const x = deltaX * scale;
    const y = deltaY * scale;

    return { x, y };
}

