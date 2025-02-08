import { Section1Header } from "../1-header";
import { Section2Main } from "../2-main";
import { Section3Footer } from "../3-footer";

export function AppLayout() {
    return (
        <div className="h-screen bg-primary-100 grid grid-rows-[auto_1fr]">
            <Section1Header className="" />
            <div className="py-4 h-full min-h-0 grid grid-rows-[1fr_auto] gap-4">
                <Section2Main className="mni-h-0 mx-4 max-w-2xl" />
                <Section3Footer className="mx-4 max-w-2xl" />
            </div>
        </div>
    );
}
