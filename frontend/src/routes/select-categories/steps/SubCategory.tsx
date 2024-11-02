import { CustomComboBox } from "@/components/custom-combo-box";
import { useEffect, useState } from "react";
import { useContentStoreActions, useMainCategory, useSubCategory } from "../store/contentStore";
import { useQuery } from "@tanstack/react-query";
import { baseApi } from "@/utils/api";

const fetchCategories = async (query: string, category: string) => {
  const { data } = await baseApi.get("inner-categories", {
    params: { query, category },
  });
  return data;
};

const SubCategory = () => {
  const storedSubCategory = useSubCategory();
  const storedCategory = useMainCategory();
  const [searchValue, setSearchValue] = useState(storedSubCategory || "");
  const { updateContent: updateSubCategoryInStore } = useContentStoreActions();

  const { data, isLoading } = useQuery({
    queryKey: ["query", searchValue],
    queryFn: () => fetchCategories(searchValue, storedCategory),
    enabled: !!searchValue,
  });

  useEffect(() => {
    updateSubCategoryInStore({ innerCategory: searchValue });
  }, [searchValue, updateSubCategoryInStore]);

  return (
    <div>
      <CustomComboBox
        data={data?.data ?? []}
        loading={isLoading}
        label="Konu"
        value={searchValue}
        setValue={setSearchValue}
      />
    </div>
  );
};

export default SubCategory;
