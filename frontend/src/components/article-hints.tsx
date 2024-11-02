import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { baseApi } from "@/utils/api";
import { useContent } from "@/routes/select-categories/store/contentStore";
import { Icons } from "./ui/icons";

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
                    <div><Icons.spinner className="mr-2 h-4 w-4 animate-spin" /></div>
                ) : (
                    data?.data?.slice(0, numberOfHints).map((articleTitle: string, index: number) => (
                        <Card
                            key={index}
                            className={`w-full cursor-pointer pt-6 ${loadingTitle === articleTitle ? "opacity-50 pointer-events-none" : ""}`}
                            onClick={() => handleHintClick(articleTitle)} // Call handleHintClick with title
                        >
                             <CardContent>
                                <div className="text-sm">
                                    {loadingTitle === articleTitle ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : articleTitle}
                                </div>
                            </CardContent>
                            
                        </Card>
                    ))
                )}
            </div>
        </ScrollArea>
    );
};

export default ArticleHints;
