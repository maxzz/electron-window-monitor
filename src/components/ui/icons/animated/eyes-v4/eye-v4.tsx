import { useEffect } from "react"; //https://github.com/jmski/hijon/blob/main/app/components/Eye/index.tsx //https://naruto.fandom.com/wiki/Rinnegan
import { motion } from "motion/react";

export const EyeV4 = () => {
    useEffect(
        () => {
            const handleMouseMove = (e: MouseEvent) => {
                const pupils = document.querySelectorAll(".eye .pupil");

                pupils.forEach((pupil) => {
                    // get x and y position of cursor
                    const rect = pupil.getBoundingClientRect();
                    const pupilCenterX = rect.left + rect.width / 2;
                    const pupilCenterY = rect.top + rect.height / 2;
                    const mouseX = e.pageX;
                    const mouseY = e.pageY;

                    // calculate the distance between the pupil center and the mouse position
                    const distanceX = mouseX - pupilCenterX;
                    const distanceY = mouseY - pupilCenterY;

                    // calculate the maximum distance the pupil can move from the center
                    const maxDistance = Math.min(rect.width, rect.height) / 2;

                    // calculate the normalized distance based on the maximum distance
                    const normalizedDistanceX = Math.max(-1, Math.min(1, distanceX / maxDistance));
                    let normalizedDistanceY = Math.max(-1, Math.min(1, distanceY / maxDistance));

                    // calculate the final translation values
                    const x = normalizedDistanceX * 4 + "px";
                    let y = normalizedDistanceY * 15 + "px";

                    if (pupil.classList.contains("rinnegan")) {
                        y = normalizedDistanceY * 4 + "px";
                    }

                    (pupil as HTMLElement).style.transform = `translate3d(${x}, ${y}, 0px)`;
                });
            };

            window.addEventListener("mousemove", handleMouseMove);

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };
        }, []
    );

    return (
        <div className="flex items-center justify-evenly mx-auto">

            <motion.div
                whileInView={{ scaleY: ["0%", "100%"] }}
                transition={{ delay: 0.2, duration: 1, type: "spring" }}
                className="bg-gradient-to-b from-slate-200 to-white flex justify-center items-center overflow-clip eye eye-shape eye-shape-left"
            >
                <EyeSharingan />
            </motion.div>

            <motion.div
                whileInView={{ scaleY: ["0%", "100%"] }}
                transition={{ delay: 0.2, duration: 1, type: "spring" }}
                className="bg-gradient-to-b from-slate-200 to-white flex justify-center items-center overflow-clip eye eye-shape eye-shape-right"
            >
                <EyeSharingan />
            </motion.div>

            <motion.div
                whileInView={{ scaleY: ["0%", "100%"] }}
                transition={{ delay: 0.2, duration: 1, type: "spring" }}
                className="bg-purple-300 flex justify-center items-center overflow-clip eye eye-shape eye-shape-right rinnegan"
            >
                <RightEyeRinnegan />
            </motion.div>

        </div>
    );
};

function RightEyeRinnegan() {
    return (
        <div className={`size-[21svw] bg-purple-300 ${riCircleClasses}`}>
            <div className={`size-[17svw] bg-purple-300 ${riCircleClasses}`}>
                <div className={`size-[13svw] bg-purple-300 ${riCircleClasses}`}>
                    <div className={`size-[9svw] bg-purple-300 ${riCircleClasses}`}>
                        <div className={`size-[5svw] bg-purple-400 ${riCircleClasses}`}>
                            <div className="size-[1svw] bg-black border-black rounded-full pupil rinnegan"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const riCircleClasses = "\
rounded-full flex justify-center items-center pupil rinnegan \
border border-black \
";

function EyeSharingan() {
    return (
        <div className=" bg-gradient-radial to-red-950 from-red-600 w-[12svw] h-[12svw] border-4 border-black rounded-full flex justify-center items-center pupil overflow-clip">
            <div className="w-[7svw] h-[7svw] pupil">
                <div className="absolute bg-red-700 border border-black w-[7svw] h-[7svw] rounded-full spin">
                    <div className=" absolute mt-[13%] bg-black rounded-full w-[1.5svw] h-[1.5svw] -rotate-[60deg]">
                        <div className="h-2 w-1 md:h-[18px] md:w-[10px] bg-black relative -top-1 md:-top-[9px] left-1 md:left-[0.4svw] rounded-r-[145%] rounded-l-[90%] rotate-[60deg] skew-y-[30deg]"></div>
                    </div>
                    <div className=" absolute mt-[25%] -right-[7%] bg-black rounded-full w-[1.5svw] h-[1.5svw] rotate-[60deg]">
                        <div className="h-2 w-1 md:h-[18px] md:w-[10px] bg-black relative -top-1 d:-top-[9px] left-1 md:left-[0.4svw] rounded-r-[145%] rounded-l-[90%] rotate-[60deg] skew-y-[30deg]"></div>
                    </div>
                    <div className=" absolute mt-[90%] right-[47%] bg-black rounded-full w-[1.5svw] h-[1.5svw] rotate-[160deg]">
                        <div className="h-2 w-1 md:h-[18px] md:w-[10px] bg-black relative -top-1 md:-top-[9px] left-1 md:left-[0.4svw] rounded-r-[145%] rounded-l-[90%] rotate-[60deg] skew-y-[30deg]"></div>
                    </div>
                    {/* Iris */}
                    <div className=" absolute top-[40%] left-[40%] bg-black rounded-full w-[1.5svw] h-[1.5svw]"></div>
                </div>
            </div>
        </div>
    );
}
