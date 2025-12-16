import { classNames } from "@/utils";
import { type GetTargetWindowResult } from "@/x-electron/xternal-to-renderer/7-napi-calls";

export function PropsGrid({ saw }: { saw: GetTargetWindowResult }) {
    return (
        <div className="border-primary-500 border rounded-sm grid grid-cols-[auto_1fr]">
            <GridRow name="caption"   /**/ value={saw.caption} className="font-semibold" highlight={true} />
            <GridRow name="classname" /**/ value={saw.classname} />
            <GridRow name="process"   /**/ value={saw.process} />
            <GridRow name="browser"   /**/ value={saw.isBrowser ? 'yes' : 'no'} />
            <GridRow name="hwnd"      /**/ value={(saw?.hwnd || '').replace(/^0x00000000/, '0x')} />
        </div>
    );
}

function GridRow({ name, value, className, highlight }: { name: string; value: string; className?: string; highlight?: boolean; }) {
    return (<>
        <div className="px-2 py-1.5 h-full border-primary-500 border-b text-xs ">
            {name}
        </div>

        <div className={classNames("py-1.5 border-primary-500 border-l border-b px-2", className, highlight && value && "bg-primary-300/30")}>
            {value}
        </div>
    </>);
}
