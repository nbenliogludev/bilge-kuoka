import { marked } from 'marked';

const MarkdownRenderer = ({ markdownText }: {markdownText: string}) => {
  // Convert Markdown to HTML
  const htmlContent = marked(markdownText);

  return (
    <div
      className="prose max-w-none p-6"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownRenderer;
