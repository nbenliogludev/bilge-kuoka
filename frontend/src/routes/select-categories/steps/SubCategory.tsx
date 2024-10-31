import { CustomComboBox } from "@/components/custom-combo-box";
import { useEffect, useState } from "react";
import { useContentStoreActions, useSubCategory } from "../store/contentStore";

const SubCategory = () => {
  const storedSubCategory = useSubCategory();
  const [searchValue, setSearchValue] = useState(storedSubCategory || "");
  const { updateContent: updateSubCategoryInStore } = useContentStoreActions();

  useEffect(() => {
    return () => {
      updateSubCategoryInStore({ innerCategory: searchValue });
    };
  }, [searchValue, updateSubCategoryInStore]);

  return (
    <div>
      <CustomComboBox
        data={[]}
        label="Konu"
        value={searchValue}
        setValue={setSearchValue}
      />
    </div>
  );
};

export default SubCategory;
