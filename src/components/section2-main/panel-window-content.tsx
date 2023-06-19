import { sawContentStrAtom } from "@/store";
import { useAtomValue } from "jotai";

export function SawContentPanel() {
    const sawContentStr = useAtomValue(sawContentStrAtom);
    const controls = sawContentStr;
    return (
        <div className="my-4">
            <div className="pt-4 pb-1 font-semibold">
                Second Window Content
            </div>

            <div className="text-sm grid grid-cols-[auto_1fr] gap-x-2">
                Not now
            </div>
        </div>
    );
}
