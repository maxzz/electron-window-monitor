import { motion, useAnimate } from 'motion/react';
import { useEffect } from 'react';

export function EyesFollowCursor(): JSX.Element {
    const [scopeLeft, animateLeft] = useAnimate();
    const [scopeRight, animateRight] = useAnimate();

    useEffect(
        () => {
            function handleMouseMove(e: MouseEvent): void {
                animateEye(scopeLeft, animateLeft, e);
                animateEye(scopeRight, animateRight, e);
            }

            window.addEventListener('mousemove', handleMouseMove);

            return function cleanup() {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }, [animateLeft, animateRight]
    );

    return (
        <div className="flex items-center justify-center gap-4 p-4">
            <div className="relative size-16 bg-white rounded-full shadow-inner">
                <motion.div
                    ref={scopeLeft}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-6"
                    initial={{ x: 0, y: 0 }}
                >
                    <div className="size-full bg-black rounded-full" />
                </motion.div>
            </div>

            <div className="relative size-16 bg-white rounded-full shadow-inner">
                <motion.div
                    ref={scopeRight}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-6"
                    initial={{ x: 0, y: 0 }}
                >
                    <div className="size-full bg-black rounded-full" />
                </motion.div>
            </div>
        </div>
    );
}

type EyeMovement = { x: number; y: number; };
type AnimationScope = ReturnType<typeof useAnimate>[0];
type AnimateFunction = ReturnType<typeof useAnimate>[1];

async function animateEye(scope: AnimationScope, animate: AnimateFunction, e: MouseEvent): Promise<void> {
    const movement = scope.current && getEyeMovement(scope.current, e);
    if (movement) {
        await animate(scope.current, movement, { duration: 0.1, type: "spring", bounce: 0, stiffness: 500, damping: 40, });
    }
}

function getEyeMovement(eye: Element, e: MouseEvent): EyeMovement | undefined {
    if (!eye.parentElement) {
        return;
    }

    const eyeRect = eye.parentElement.getBoundingClientRect();
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

