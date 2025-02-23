'use client';
import { useState, useEffect, useRef } from 'react'; //https://github.com/Olly-E/Rebrand/blob/main/src/app/Components/EyeMouseAnimation.tsx
import { motion } from 'motion/react';

export const EyeV6 = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(
        () => {
            function handleMouseMove(e: MouseEvent) {
                setMousePosition({ x: e.clientX, y: e.clientY });
            }

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }, []
    );

    return (
        <div className="-1mb-[155.12px] w-[311.33px] h-[155.12px] bg-red-state flex items-center relative justify-center">
            {/* Eyes Container */}
            <div className="flex gap-10">
                {[0, 1].map((index) => (
                    <Eye mousePosition={mousePosition} key={index} />
                ))}
            </div>
        </div>
    );
};

export function Eye({ mousePosition, }: { mousePosition: { x: number; y: number; }; }) {
    const eyeRef = useRef<HTMLDivElement | null>(null);
    const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

    const eyeSize = 40;
    const pupilSize = 10;
    const movementRange = eyeSize - pupilSize;

    useEffect(
        () => {
            if (!eyeRef.current) return;

            const { left, top, width, height } = eyeRef.current.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            // Calculate offset
            const deltaX = mousePosition.x - centerX;
            const deltaY = mousePosition.y - centerY;

            // Normalize movement within range
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
            let pupilX = deltaX;
            let pupilY = deltaY;

            if (distance > movementRange) {
                const angle = Math.atan2(deltaY, deltaX);
                pupilX = Math.cos(angle) * movementRange;
                pupilY = (Math.sin(angle) * movementRange) / 3;
            }

            setPupilPos({ x: pupilX, y: pupilY });
        }, [mousePosition]
    ); // Run effect when mouse moves

    return (
        <div ref={eyeRef} className="relative w-[85.97px] h-[41px] bg-white rounded-full flex items-center justify-center overflow-hidden shadow-lg">
            {/* Pupil */}
            <motion.div
                className="absolute size-[30px] bg-black rounded-full"
                animate={{ x: pupilPos.x, y: pupilPos.y }}
                transition={{ type: 'tween', ease: 'easeOut', duration: 0.1 }} // Faster & Smoother
            />
        </div>
    );
}
