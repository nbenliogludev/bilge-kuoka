import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { baseApi } from "@/utils/api";
import { useContent, useContentStoreActions, useSavedDocuments } from "@/routes/select-categories/store/contentStore";
import { Icons } from "./ui/icons";
import { v4 as uuidv4 } from 'uuid';

interface ArticleHintsProps {
    text: string;
    documentId: string;
    numberOfHints: number;
}

const fetchRelatedArticles = async (article: string) => {
    const { data } = await baseApi.post("related-articles", {
        article,
    });
    return data;
};

const ArticleHints: React.FC<ArticleHintsProps> = ({ text, documentId, numberOfHints }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["relatedArticles", text],
        queryFn: () => fetchRelatedArticles(text),
        enabled: !!text,
    });

    const navigate = useNavigate();
    const { age, detail, additionalInfo } = useContent();
    const savedDocuments = useSavedDocuments();
    const currentDocumentContent = savedDocuments.find(doc => doc.id === documentId)?.content;
    const {saveNewDocument} = useContentStoreActions();
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
            const transactionId = uuidv4();
            navigate(`/${transactionId}`);
            if (currentDocumentContent) {
                saveNewDocument({ id: transactionId, data: response.data.data[0], content: currentDocumentContent });
            }
        } catch (error) {
            console.error("Failed to fetch full article:", error);
        } finally {
            setLoadingTitle(null); // Reset loading state
        }
    };

    return (
        <ScrollArea className="w-full rounded-md" dir="ltr">
            {isLoading ? (
                    <div className="flex w-full items-center justify-center"><Icons.spinner className="mr-2 w-8 animate-spin" /></div>
                ) : 
                <div
                className="grid gap-4 w-full"
                style={{
                    gridTemplateColumns: `repeat(${numberOfHints}, minmax(0, 1fr))`,
                }}
            >
                {data?.data?.slice(0, numberOfHints).map((articleTitle: string, index: number) => (
                    <Card
                        key={index}
                        className={`w-full cursor-pointer pt-6 ${loadingTitle === articleTitle ? "opacity-50 pointer-events-none" : ""}`}
                        onClick={() => handleHintClick(articleTitle)} // Call handleHintClick with title
                    >
                        <CardContent>
                            {loadingTitle === articleTitle ? 
                                <div className="flex h-full justify-center items-center">
                                    <Icons.spinner className="mr-2 w-8 animate-spin" />
                                </div> :
                                <div className="text-sm">
                                    <p>{articleTitle}</p>
                                </div>}
                        </CardContent>
                        
                    </Card>
                ))}
            </div>}
        </ScrollArea>
    );
};

export default ArticleHints;
