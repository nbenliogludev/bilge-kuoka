import ArticleHints from "@/components/article-hints";

export default function Stats() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold">Stats</h1>
      <p className="text-gray-500">Welcome to the stats page.</p>
      <h1 className="text-2xl font-bold mb-4">Article Hints</h1>
      <ArticleHints text={"This is a helpful hint to guide you through the article."} numberOfHints={3} />
    </div>
  );
}
