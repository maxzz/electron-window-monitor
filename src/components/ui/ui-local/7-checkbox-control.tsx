import { type ReactNode } from "react";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import { checkboxClasses } from "../../2-main/8-shared-styles";

type CheckboxControlProps = {
    label: ReactNode;
    title?: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
};

export function CheckboxControl({ label, title, checked, onCheckedChange }: CheckboxControlProps) {
    return (
        <label className="w-max flex items-center gap-x-1 cursor-pointer" title={title}>
            <Checkbox
                className={checkboxClasses}
                checked={checked}
                onCheckedChange={(v) => onCheckedChange(!!v)}
            />
            <div className="select-none">
                {label}
            </div>
        </label>
    );
}

