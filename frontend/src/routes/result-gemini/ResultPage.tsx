import ArticleHints from "@/components/article-hints";
import MarkdownRenderer from "@/utils/MarkDownRenderer";
import { useParams } from "react-router-dom";
import { useSavedDocuments } from "../select-categories/store/contentStore";
import TextSelectorWithButton from "@/components/text-selector-with-button";
import { useState } from "react";
import { ArticleDetailPopOver } from "@/components/article-detail-popover";
import { useGetArticleDetails } from "./hooks/queryHooks";

export interface ArticleDetailResponse {
  contextInfo: string;
  article: string;
  sentence: string;
}

const ResultPage = () => {
  const { id } = useParams();
  
  const [selectedText, setSelectedText] = useState<string>('');
  const [showArticleDetail, setShowArticleDetail] = useState(false);
  const [articleDetailData, setArticleDetailData] =
    useState<ArticleDetailResponse>({
      contextInfo: "",
      article: "",
      sentence: "",
    });

  const mutation = useGetArticleDetails();

  const savedDocuments = useSavedDocuments();
  const document = savedDocuments.find((doc) => doc.id === id);
  const data = document?.data ?? "Sonuç bulunamadı veya bir hata oluştu";

  const [header, ...contentArray] = data.split("\n");
  const content = contentArray.join("\n");

  const [headerText, ...contentTextArray] = (articleDetailData.contextInfo).split("\n");
  const contentText = contentTextArray.join("\n");

  const onGetArticleDetails = () => {
    if (!selectedText) {return;}
    const payload = {
      article: data,
      sentence: selectedText,
      age: document?.content.age ?? '',
      detail: document?.content.detail ?? '',
      additionalInfo: document?.content.additionalInfo ?? '',
    }

    mutation.mutate(payload, {
      onSuccess: (data: ArticleDetailResponse) => {
        console.log("Data submitted successfully:", data);
        setArticleDetailData(data);
        setShowArticleDetail(true);
        setSelectedText('');
      },
      onError: (error: unknown) => {
        console.error("Error submitting data:", error);
      }
    });
  }

  return (
    <div className="flex flex-col items-center max-w-[80%] my-8">
      
      <div className="flex flex-col items-center text-center mx-4 my-3 ">
        <MarkdownRenderer className="font-bold text-3xl" markdownText={header} />
      </div>

      {content && <div className="flex mx-4 my-3 items-center">
        <div className="bg-primary-foreground border-[1px] shadow-lg rounded-lg mx-auto p-6 space-y-6">
          <TextSelectorWithButton 
            setSelectedText={setSelectedText} 
            onClick={onGetArticleDetails}
            loading={mutation.isPending}
          >
            <MarkdownRenderer className="space-y-4" markdownText={content} />
          </TextSelectorWithButton>
        </div>
      </div>}

      <div className="mx-4 my-3">
        {id && <ArticleHints text={content} numberOfHints={4} documentId={id}/>}
      </div>
      {articleDetailData && (
        <ArticleDetailPopOver 
          isOpen={showArticleDetail} 
          onToggle={setShowArticleDetail} 
          headerText={headerText}
          contentText={contentText} 
        />
      )}
    </div>
  );
};

export default ResultPage;
