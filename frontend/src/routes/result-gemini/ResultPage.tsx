import MarkdownRenderer from '@/utils/MarkDownRenderer';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const data = location.state ?? { data: 'Sonuç bulunamadı veya bir hata oluştu' };

  console.log('result page', data);

  return (
    <div className='flex flex-col items-center mt-4'>
      <div className="flex flex-col items-center text-center m-8">
        <h1 className="font-bold text-3xl">Sonuç</h1>
      </div>

      <div className="flex m-8 items-center">
        <div className="bg-white dark:bg-primary-foreground border-[1px] shadow-lg rounded-lg mx-auto p-6 space-y-6">
           <MarkdownRenderer markdownText={data.data[0]} />
        </div>
      </div>
    </div>
  )
}

export default ResultPage