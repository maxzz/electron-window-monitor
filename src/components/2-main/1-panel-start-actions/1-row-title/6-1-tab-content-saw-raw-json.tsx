import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { ButtonCopy } from "../../../ui/ui-local/6-btn-copy";

export function TabContentSawRawJson({ displayContent }: { displayContent: string; }) {
    return (
        <div className="absolute inset-0">
            <ScrollArea className="p-1 size-full bg-muted/50 rounded-md border" parentContentWidth horizontal>
                <pre className="text-xs font-mono">
                    {displayContent}
                </pre>
            </ScrollArea>
            
            <div className="absolute top-1 right-1 z-10">
                <ButtonCopy text={displayContent} title="Copy JSON" />
            </div>
        </div>
    );
}

