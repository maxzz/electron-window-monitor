import { useEffect } from "react";

export const useMouseMove = (callback: (x: number, y: number) => void) => {
    useEffect(
        () => {
            function handleMouseMove(e: MouseEvent) {
                callback(e.clientX, e.clientY);
            }

            window.addEventListener("mousemove", handleMouseMove);

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };
        }, [callback]
    );
};
