import { type AriaAttributes, type ComponentPropsWithoutRef, type ReactNode, useCallback } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { Accordion, AccordionItem, AccordionContent, useAccordion, AccordionItemAugmentedProps } from "./1-accordion"; //https://motion-primitives.com/docs/accordion
import { Button } from "../shadcn";
import { SymbolChevronDown } from "../icons";
import { appSettings } from "@/store/1-atoms";

type AccordionWithTriggerProps = {
    triggerText: ReactNode;
    keyName: string;
    children: ReactNode;
    triggerClasses?: string;
    contentClasses?: string;
};

export function AccordionWithTrigger({ triggerText, keyName, children, triggerClasses, contentClasses }: AccordionWithTriggerProps) {
    const [open, toggleOpen] = useAccordionState({ keyName });
    return (
        <Accordion
            className="w-full flex flex-col"
            transition={{ type: "spring", stiffness: 420, damping: 40 }}
            variants={variants}
            expandedValue={open ? keyName : undefined}
            onValueChange={toggleOpen}
        >
            <AccordionItem value={keyName}>
                <AccordionTrigger className={triggerClasses}>
                    {triggerText}
                </AccordionTrigger>

                <AccordionContent className={classNames("origin-top", contentClasses)}>
                    {children}
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    );
}

function AccordionTrigger({ children, className, ...rest }: { children: ReactNode; className?: string; } & ComponentPropsWithoutRef<"button">) {
    const { value, expanded: isExpanded, ...restAsProps } = rest as AccordionItemAugmentedProps;
    const { toggleItem } = useAccordion();
    return (
        <Button className={classNames(localTriggerClasses, className)} {...ariaExpandedAttrs(isExpanded)} onClick={() => value !== undefined && toggleItem(value)} {...restAsProps}>
            {children}
            <SymbolChevronDown className={classNames("size-4 text-muted-foreground transition-transform", isExpanded ? "rotate-0" : "-rotate-90")} />
        </Button>
    );
}

function ariaExpandedAttrs(isExpanded: boolean): AriaAttributes {
    return {
        "aria-expanded": isExpanded,
        ...(isExpanded ? { "data-expanded": '' } : { "data-closed": '' }),
    };
}

const variants = {
    expanded: { opacity: 1, scale: 1, },
    collapsed: { opacity: 0, scale: 1, },
};

const localTriggerClasses = "w-full flex items-center justify-between gap-1";

// Utilities

function useAccordionState({ keyName }: { keyName: string; }) {
    const open: boolean = useSnapshot(appSettings).appUi.accordionsOpened[keyName];

    const toggleOpen = useCallback(
        () => {
            appSettings.appUi.accordionsOpened[keyName] = !appSettings.appUi.accordionsOpened[keyName];
        }, [keyName]
    );

    return [open, toggleOpen] as const;
}
