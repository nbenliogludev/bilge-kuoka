import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { baseApi } from "@/utils/api";
import { useContent } from "@/routes/select-categories/store/contentStore";
// update path to match your store location

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

    const navigate = useNavigate();
    const { age, detail, additionalInfo } = useContent(); // Get data from store

    const handleHintClick = async (articleTitle: string) => {
        try {
            const response = await baseApi.post("/get-full-article", {
                title: articleTitle,
                age,
                detail,
                additionalInfo,
            });

            navigate("/result", { state: { data: response.data } }); // Navigate with full article data
        } catch (error) {
            console.error("Failed to fetch full article:", error);
        }
    };

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
                        <Card
                            key={index}
                            className="w-full cursor-pointer"
                            onClick={() => handleHintClick(articleTitle)} // Call handleHintClick with title
                        >
                            <div className="text-gray-500 text-sm">
                                {articleTitle}
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </ScrollArea>
    );
};

export default ArticleHints;
