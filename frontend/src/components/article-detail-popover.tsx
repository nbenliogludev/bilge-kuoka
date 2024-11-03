import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import MarkdownRenderer from "@/utils/MarkDownRenderer";
type CustomPopoverProps = {
    isOpen: boolean;
    onToggle: (open: boolean) => void;
    headerText: string;
    contentText: string;
  };

export function ArticleDetailPopOver({ isOpen, onToggle, headerText, contentText }: CustomPopoverProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
        <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
            <DialogTitle>
                <MarkdownRenderer markdownText={headerText} />
            </DialogTitle>        
        </DialogHeader>
            <DialogDescription>
                <MarkdownRenderer markdownText={contentText} />
            </DialogDescription>
        </DialogContent>
    </Dialog>
  )
}
