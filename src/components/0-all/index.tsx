import { Section1Header } from "../1-header";
import { Section2Main } from "../2-main";
import { Section3Footer } from "../3-footer";

export function AppLayout() {
    return (<>
        <div className="py-4 bg-primary-100 h-screen grid grid-rows-[auto_1fr_auto] gap-4">
            <Section1Header className="-mt-4" />
            <Section2Main className="mx-4 max-w-2xl" />
            <Section3Footer className="mx-4 max-w-2xl" />
        </div>
    </>);
}
