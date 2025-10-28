import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/shadcn/popover";

export function PopoverDemo() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Open popover</Button>
            </PopoverTrigger>

            <PopoverContent className="w-80 1text-[.65rem]">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="leading-none font-medium">Dimensions</h4>
                        <p className="text-muted-foreground text-sm">
                            Set the dimensions for the layer.
                        </p>
                    </div>
                    
                    <div className="grid gap-2">
                        <div className={rowClasses}>
                            <Label className={labelClasses} htmlFor="width">Width</Label>
                            <Input
                                id="width"
                                defaultValue="100%"
                                className={inputClasses}
                            />
                        </div>
                        <div className={rowClasses}>
                            <Label className={labelClasses} htmlFor="maxWidth">Max. width</Label>
                            <Input
                                id="maxWidth"
                                defaultValue="300px"
                                className={inputClasses}
                            />
                        </div>
                        <div className={rowClasses}>
                            <Label className={labelClasses} htmlFor="height">Height</Label>
                            <Input
                                id="height"
                                defaultValue="25px"
                                className={inputClasses}
                            />
                        </div>
                        <div className={rowClasses}>
                            <Label className={labelClasses} htmlFor="maxHeight">Max. height</Label>
                            <Input
                                id="maxHeight"
                                defaultValue="none"
                                className={inputClasses}
                            />
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

const rowClasses = "grid grid-cols-3 items-center gap-4";
const labelClasses = "text-xs font-normal";
const inputClasses = "col-span-2 h-8";
