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
    <div className="flex flex-col items-center mt-4">
      <div className="flex flex-col items-center text-center m-8">
        <h1 className="font-bold text-3xl">
          <MarkdownRenderer markdownText={header} />
        </h1>
      </div>

      <div className="flex m-8 items-center">
        <div className="bg-white dark:bg-primary-foreground border-[1px] shadow-lg rounded-lg mx-auto p-6 space-y-6">
          <MarkdownRenderer markdownText={content} />
        </div>
      </div>

      {/* Article Hints Section */}
      <div className="w-full p-6">
        <ArticleHints text={content} numberOfHints={4} /> {/* Pass relevant props */}
      </div>
    </div>
  );
};

export default ResultPage;
