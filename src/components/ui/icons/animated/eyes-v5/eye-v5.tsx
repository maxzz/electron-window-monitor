// import { transform } from 'framer-motion';
import { useEffect, useState } from 'react'; //https://github.com/Kuldeepsinghrajpoot/ochiClone/blob/main/src/components/Eye.tsx

export function EyeV5() {
    const [Rotate, setRotate] = useState<number>(0);

    useEffect(
        () => {
            function handleMouseMove(e: MouseEvent) {
                let mousex: number = e.clientX;
                let mousey: number = e.clientY;
                let deltaX: number = mousex - window.innerWidth / 2;
                let deltaY: number = mousey - window.innerHeight / 2;

                let Rotate: number = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
                setRotate(Rotate + 180);
            }

            window.addEventListener('mousemove', handleMouseMove);
        }, []
    );

    // Eye section
    console.log(Rotate);

    return (
        <div className="1h-screen relative 1w-full overflow-hidden">
            <div data-scroll data-scroll-speed="-0.7" className='relative h-full flex justify-center items-center text-center  bg-cover w-full 1bg-[url("https://ochi.design/wp-content/uploads/2022/05/Top-Viewbbcbv-1-scaled.jpg")]'>

                <div className="flex justify-between gap-20   rounded-full">
                    <div className="size-[15rem] bg-white rounded-full  flex justify-center items-center">
                        <div className="size-[10rem] bg-black flex justify-center items-center rounded-full">
                            <div className='absolute uppercase text-4xl  font-bold'>play</div>

                            <div className="size-full flex justify-center  items-center">
                                <div className="w-1 h-full lineforcircle" style={{ transform: `translate(-0%,-0%) rotate(${Rotate}deg)` }}>
                                    <div className={`size-[2rem] bg-white flex justify-center rotate-[${Rotate}deg] rounded-full`}>
                                        {/* PLAY */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="size-[15rem] bg-white rounded-full  flex justify-center items-center">
                        <div className="size-[10rem] bg-black flex justify-center items-center rounded-full">
                            <div className='absolute uppercase text-4xl  font-bold'>play</div>

                            <div className="size-full flex justify-center  items-center">
                                <div className="w-1 h-full lineforcircle" style={{ transform: `translate(-0%,-0%) rotate(${Rotate}deg)` }}>
                                    <div className={`size-[2rem] bg-white flex justify-center rotate-[${Rotate}deg] rounded-full`}>
                                        {/* PLAY */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
