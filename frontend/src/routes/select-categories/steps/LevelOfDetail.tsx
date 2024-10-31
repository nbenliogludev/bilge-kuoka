import { CustomComboBox } from "@/components/custom-combo-box";
import { useEffect, useState } from "react";
import { useContentStoreActions, useLevelOfDetail } from "../store/contentStore";

const LevelOfDetail = () => {
  const storedLevelOfDetail = useLevelOfDetail();
  const [searchValue, setSearchValue] = useState(storedLevelOfDetail || "");
  const { updateContent: updateLevelOfDetail } = useContentStoreActions();

  useEffect(() => {
    return () => {
      updateLevelOfDetail({ detail: searchValue });
    };
  }, [searchValue, updateLevelOfDetail]);

  return (
    <div>
      <CustomComboBox
        data={[]}
        label="Detay Seviyesi"
        value={searchValue}
        setValue={setSearchValue}
      />
    </div>
  );
};

export default LevelOfDetail;
