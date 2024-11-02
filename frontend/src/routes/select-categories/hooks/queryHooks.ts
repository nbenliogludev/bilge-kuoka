import { baseApi } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

const postCategoryData = async (categoryData: {
    mainCategory: string;
    innerCategory: string;
    age: string;
    detail: string;
    additionalInfo: string;
  }) => {
    const { data } = await baseApi.post("generateContent", categoryData);
    return data;
  };
  

export const usePostCategoryData = () => {
    return useMutation({
      mutationFn: postCategoryData,
      retry: 5,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    });
  };