import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { baseApi } from "@/utils/api";

interface ArticleHintsProps {
    text: string;
    numberOfHints: number;
}

const fetchRelatedArticles = async (article: string) => {
    const { data } = await baseApi.post("related-articles", {
        article,
    });
    return data;
};

const ArticleHints: React.FC<ArticleHintsProps> = ({ text, numberOfHints }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["relatedArticles", text],
        queryFn: () => fetchRelatedArticles(text),
        enabled: !!text,
    });
    console.log(text);

    return (
        <ScrollArea className="w-full p-4 rounded-md" dir="ltr">
            <div
                className="grid gap-4 w-full"
                style={{
                    gridTemplateColumns: `repeat(${numberOfHints}, minmax(0, 1fr))`,
                }}
            >
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    data?.data?.slice(0, numberOfHints).map((articleTitle: string, index: number) => (
                        <Card key={index} className="w-full">
                            <a href="#">
                                <div className="text-gray-500 text-sm">
                                    {articleTitle}
                                </div>
                            </a>
                        </Card>
                    ))
                )}
            </div>
        </ScrollArea>
    );
};

export default ArticleHints;
