import { CustomComboBox } from "@/components/custom-combo-box";
import { useEffect, useState } from "react";
import { useContentStoreActions, useMainCategory } from "../store/contentStore";

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

const Category = () => {
  const storedMainCategory = useMainCategory();
  const [mainCategory, setMainCategory] = useState(storedMainCategory || "");
  const { updateContent: updateMainCategoryInStore } = useContentStoreActions();

  useEffect(() => {
    return () => {
        updateMainCategoryInStore({ mainCategory: mainCategory });
    };
  }, [mainCategory, updateMainCategoryInStore]);

  return (
    <div>
      <CustomComboBox
        data={mainCategories}
        label="Kategori"
        value={mainCategory}
        setValue={setMainCategory}
      />
    </div>
  );
};

export default Category;
