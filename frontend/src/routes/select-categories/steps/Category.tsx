import { CustomComboBox } from "@/components/custom-combo-box";
import { useEffect, useState } from "react";
import { useContentStoreActions, useMainCategory } from "../store/contentStore";
import axios from "axios";
import {
  useQuery,
} from '@tanstack/react-query'

const mainCategories = [
  {
    value: "matematik",
    label: "Matematik",
  },
  {
    value: "tarih",
    label: "Tarih",
  },
  {
    value: "coğrafya",
    label: "Coğrafya",
  },
  {
    value: "türkçe",
    label: "Türkçe",
  },
  {
    value: "edebiyat",
    label: "Edebiyat",
  },
  {
    value: "fizik",
    label: "Fizik",
  },
  {
    value: "kimya",
    label: "Kimya",
  },
  {
    value: "Biyoloji",
    label: "Biyoloji",
  },
];

const fetchCategories = async (query: string) => {
  const { data } = await axios.get("http://45.147.46.138:8080/api/categories", {
    params: { query }, // query parametresini URL'ye ekliyoruz
  });
  return data;
};

const Category = () => {
  const storedMainCategory = useMainCategory();
  const [searchValue, setSearchValue] = useState(storedMainCategory || "");
  const { updateContent: updateMainCategoryInStore } = useContentStoreActions();

  const { data, error, isLoading } = useQuery({
    queryKey: ["query", searchValue],
    queryFn: () => fetchCategories(searchValue),
    enabled: !!searchValue,
  });

  console.log(data, 'payload')
  

  useEffect(() => {
    return () => {
        updateMainCategoryInStore({ mainCategory: searchValue });
    };
  }, [searchValue, updateMainCategoryInStore]);

  return (
    <div>
      <CustomComboBox
        data={mainCategories}
        label="Kategori"
        value={searchValue}
        setValue={setSearchValue}
      />
    </div>
  );
};

export default Category;
