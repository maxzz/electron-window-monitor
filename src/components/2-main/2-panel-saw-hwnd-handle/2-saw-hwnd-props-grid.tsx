import { classNames } from "@/utils";
import { type GetTargetWindowResult } from "@/x-electron/xternal-to-renderer/7-napi-calls";

export function PropsGridOrEmpty({ saw }: { saw: GetTargetWindowResult | null; }) {
    return (<>
        {saw
            ? <PropsGrid saw={saw} />
            : (
                <div className="p-4 text-sm text-muted-foreground text-center border rounded-md">
                    No JSON data
                </div>
            )}
    </>);
}

export function PropsGrid({ saw }: { saw: GetTargetWindowResult; }) {
    return (
        <div className="text-xs border border-border rounded-sm grid grid-cols-[auto_1fr] divide-y divide-border">
            <GridRow name="caption"   /**/ value={saw.caption} />
            <GridRow name="classname" /**/ value={saw.classname} />
            <GridRow name="process"   /**/ value={saw.process} />
            <GridRow name="browser"   /**/ value={saw.isBrowser ? 'yes' : 'no'} />
            <GridRow name="hwnd"      /**/ value={(saw?.hwnd || '').replace(/^0x00000000/, '0x')} />
        </div>
    );
}

function GridRow({ name, value, className, highlight }: { name: string; value: string; className?: string; highlight?: boolean; }) {
    return (
        <div className="grid grid-cols-subgrid col-span-full">
            <div className="px-2 py-1.5 h-full text-xs">
                {name}
            </div>

            <div className={classNames("py-1.5 border-l border-border px-2", className, highlight && value && "bg-primary-300/30")}>
                {value}
            </div>
        </div>
    );
}
