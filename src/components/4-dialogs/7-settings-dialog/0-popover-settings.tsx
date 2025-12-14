import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover";
import { Button } from "@/components/ui/shadcn/button";
import { IconSettings } from "@/components/ui/icons/normal/28-settings";
import { InputMaxControls } from "./3-input-max-controls";
import { ChkboxXmlFormat } from "./4-chkbox-xml-format";
import { ChkboxIconAutoUpdate } from "./5-chkbox-icon-auto-update";
import { ChkboxLargeIcon } from "./6-chkbox-icon-large";

export function PopoverSettings() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="size-6" title="Options">
                    <IconSettings className="size-5" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="mx-4 p-2 w-auto">
                <div className="-mx-2 mb-2 px-2 pb-2 space-y-1 border-b border-slate-500/50">
                    <h4 className="text-sm leading-none">
                        Options
                    </h4>
                    <p className="text-xs text-muted-foreground">
                        Configure detection and display settings.
                    </p>
                </div>
                <div className="grid gap-3 text-xs">
                    <ChkboxIconAutoUpdate />
                    <ChkboxLargeIcon />
                    <ChkboxXmlFormat />
                    <InputMaxControls />
                </div>
            </PopoverContent>
        </Popover>
    );
}
