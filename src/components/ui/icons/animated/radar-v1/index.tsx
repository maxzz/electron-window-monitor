import css from './radar.module.css';

export function IconRadarV1() {
    return (
        <div className="relative 1bg-[#081E3F] overflow-hidden flex items-center justify-center">
            <div className={css["loader-radar"]}></div>
        </div>
    );
}
