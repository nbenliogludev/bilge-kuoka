import { marked } from 'marked';

const MarkdownRenderer = ({ markdownText, className }: { markdownText: string, className?: string }) => {
  // Convert Markdown to HTML
  const htmlContent = marked(markdownText);

  return (
    <div
      className={`prose max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownRenderer;
