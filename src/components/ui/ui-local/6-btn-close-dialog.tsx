import * as DialogPrimitive from "@radix-ui/react-dialog";
import { SymbolCross } from "@/components/ui/icons";

export function DialogCloseButton() {
    return (
        <DialogPrimitive.Close className={closeButtonClasses} tabIndex={-1}>
            <SymbolCross className="size-3 stroke-2 group-hover:stroke-3" />
            <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
    );
}

const closeButtonClasses = "\
group \
absolute \
right-3 \
top-3 \
size-7 \
rounded-sm \
ring-0 \
ring-offset-background \
transition-colors \
hover:bg-red-500 \
hover:text-white \
grid place-items-center";
