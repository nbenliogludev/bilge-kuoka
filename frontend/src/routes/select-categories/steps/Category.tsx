import { CustomComboBox } from "@/components/custom-combo-box";
import { useEffect, useState } from "react";
import { useContentStoreActions, useMainCategory } from "../store/contentStore";
import {
  useQuery,
} from '@tanstack/react-query'
import { baseApi } from "@/utils/api";

const fetchCategories = async (query: string) => {
  const { data } = await baseApi.get("categories", {
    params: { query },
  });
  return data;
};

const Category = () => {
  const storedMainCategory = useMainCategory();
  const [searchValue, setSearchValue] = useState(storedMainCategory || "");
  const { updateContent: updateMainCategoryInStore } = useContentStoreActions();

  const { data, isLoading } = useQuery({
    queryKey: ["query", searchValue],
    queryFn: () => fetchCategories(searchValue),
    enabled: !!searchValue,
    retry: 5,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  console.log(data?.data, 'payload')

  useEffect(() => {
    updateMainCategoryInStore({ mainCategory: searchValue });
  }, [searchValue, updateMainCategoryInStore]);

  return (
    <div>
      <CustomComboBox
        data={data?.data ?? []}
        loading={isLoading}
        label="Kategori"
        value={searchValue}
        setValue={setSearchValue}
      />
    </div>
  );
};

export default Category;
