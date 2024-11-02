import ArticleHints from "@/components/article-hints";
import MarkdownRenderer from "@/utils/MarkDownRenderer";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const data = location.state ?? {
    data: "Sonuç bulunamadı veya bir hata oluştu",
  };

  const [header, ...contentArray] = data.data[0].split("\n");
  const content = contentArray.join("\n");

  return (
    <div className="flex flex-col items-center mt-2">
      <div className="flex flex-col items-center text-center m-3">
        <h1 className="font-bold text-3xl">
          <MarkdownRenderer markdownText={header} />
        </h1>
      </div>

      {/* Article Hints Section with adjusted spacing */}

      <div className="flex m-3 items-center">
        <div className="bg-white dark:bg-primary-foreground border-[1px] shadow-lg rounded-lg mx-auto p-6 space-y-6">
          <MarkdownRenderer markdownText={content} />
        </div>
      </div>

      <div className="w-full mt-2 mb-4"> {/* Adjusted top and bottom margins */}
        <ArticleHints text={content} numberOfHints={4} />
      </div>
    </div>
  );
};

export default ResultPage;
