import { useRef, useState } from "react"; //https://github.com/xcvrys/UI-project/blob/main/src/components/Eye.tsx
import { motion } from "motion/react";
import { useMouseMove } from "./useMouseMove";

export function EyeV3({ offsetX = 0, offsetY = 0 }: EyeProps) {

    const [position, setPosition] = useState({ x: -1.5, y: 3 });
    const eyeRef = useRef<HTMLDivElement>(null);

    useMouseMove((x, y) => {
        if (eyeRef.current) {
            const eyeRect = eyeRef.current.getBoundingClientRect();
            const eyeX = eyeRect.left + eyeRect.width / 2;
            const eyeY = eyeRect.top + eyeRect.height / 2;

            const distanceX = x - eyeX;
            const distanceY = y - eyeY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            const limitedDistanceX = (distanceX / distance) * Math.min(distance, 10);
            const limitedDistanceY = (distanceY / distance) * Math.min(distance, 20);

            setPosition({ x: limitedDistanceX, y: limitedDistanceY });
        }
    });

    return (
        <span className="relative inline-block" ref={eyeRef}>
            <span className="text-9xl">
                O
            </span>

            <motion.span
                className="w-8 h-8 bg-black rounded-full "
                style={{
                    position: "absolute",
                    left: `calc(50% + ${position.x + offsetX}px)`,
                    top: `calc(50% + ${position.y + offsetY}px)`,
                    transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0, }}
                animate={{ scale: 1, }}
                transition={{ delay: 1, duration: 0.15, }} />
        </span>
    );
}

type EyeProps = { offsetX?: number; offsetY?: number; };
