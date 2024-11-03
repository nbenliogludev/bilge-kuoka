import { baseApi } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

const getArticleDetails = async (categoryData: {
    article: string;
    sentence: string;
    age: string;
    detail: string;
    additionalInfo: string;
  }) => {
    const { data } = await baseApi.post("article-detail", categoryData);
    return data;
  };
  

export const useGetArticleDetails = () => {
    return useMutation({
      mutationFn: getArticleDetails,
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    });
  };