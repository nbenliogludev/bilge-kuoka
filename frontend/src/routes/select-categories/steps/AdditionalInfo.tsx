import { CustomComboBox } from "@/components/custom-combo-box";
import { useEffect, useState } from "react";
import { useAdditionalInfo, useContentStoreActions } from "../store/contentStore";

const AdditionalInfo = () => {
  const storedAdditionalInfo = useAdditionalInfo();
  const [searchValue, setSearchValue] = useState(storedAdditionalInfo || "");
  const { updateContent: updateAdditionalInfo } = useContentStoreActions();

  useEffect(() => {
    return () => {
      updateAdditionalInfo({ additionalInfo: searchValue });
    };
  }, [searchValue, updateAdditionalInfo]);

  return (
    <div>
      <CustomComboBox
        data={[]}
        label="Ek Bilgi"
        value={searchValue}
        setValue={setSearchValue}
      />
    </div>
  );
};

export default AdditionalInfo;
