import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "./ui/card";

interface ArticleHintsProps {
    text: string;
    numberOfHints: number;
}

const ArticleHints: React.FC<ArticleHintsProps> = ({ text, numberOfHints }) => {
    return (
        <ScrollArea className="w-full p-4 rounded-md" dir="ltr">
            <div
                className="grid gap-4 w-full"
                style={{
                    gridTemplateColumns: `repeat(${numberOfHints}, minmax(0, 1fr))`,
                }}
            >
                {Array.from({ length: numberOfHints }).map((_, index) => (
                    <Card key={index} className="w-full">
                        <a href="#">
                            <div className="font-bold text-lg">Hint {index + 1}</div>
                            <div className="text-gray-500 text-sm">
                                {text}
                            </div>
                        </a>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
};

export default ArticleHints;
