import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { baseApi } from "@/utils/api";
import { useContent } from "@/routes/select-categories/store/contentStore";

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
    const { age, detail, additionalInfo } = useContent();
    const [loadingTitle, setLoadingTitle] = useState<string | null>(null);

    const handleHintClick = async (articleTitle: string) => {
        setLoadingTitle(articleTitle); // Set loading state specific to the clicked article

        try {
            const response = await baseApi.post("/get-full-article", {
                title: articleTitle,
                age,
                detail,
                additionalInfo,
            });

            navigate("/result", { state: { data: response.data.data } });
        } catch (error) {
            console.error("Failed to fetch full article:", error);
        } finally {
            setLoadingTitle(null); // Reset loading state
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
                    <div>Loading related articles...</div>
                ) : (
                    data?.data?.slice(0, numberOfHints).map((articleTitle: string, index: number) => (
                        <Card
                            key={index}
                            className={`w-full cursor-pointer ${loadingTitle === articleTitle ? "opacity-50 pointer-events-none" : ""}`}
                            onClick={() => handleHintClick(articleTitle)} // Call handleHintClick with title
                        >
                            <div className="text-gray-500 text-sm">
                                {loadingTitle === articleTitle ? "Loading..." : articleTitle}
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </ScrollArea>
    );
};

export default ArticleHints;
