import ArticleHints from "@/components/article-hints";
import MarkdownRenderer from "@/utils/MarkDownRenderer";
import { useParams } from "react-router-dom";
import { useSavedDocuments } from "../select-categories/store/contentStore";

const ResultPage = () => {
  const { id } = useParams();

  const savedDocuments = useSavedDocuments();
  const document = savedDocuments.find((doc) => doc.id === id);
  const data = document?.data ?? "Sonuç bulunamadı veya bir hata oluştu";

  const [header, ...contentArray] = data.split("\n");
  const content = contentArray.join("\n");

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex flex-col items-center text-center mx-12 my-3 ">
        <h1 className="font-bold text-3xl">
          <MarkdownRenderer markdownText={header} />
        </h1>
      </div>

      {/* Article Hints Section with adjusted spacing */}

      {content && <div className="flex mx-12 my-3 items-center">
        <div className="bg-white dark:bg-primary-foreground border-[1px] shadow-lg rounded-lg mx-auto p-6 space-y-6">
          <MarkdownRenderer markdownText={content} />
        </div>
      </div>}

      <div className="mx-12 my-3"> {/* Adjusted top and bottom margins */}
        {id && <ArticleHints text={content} numberOfHints={4} documentId={id}/>}
      </div>
    </div>
  );
};

export default ResultPage;
