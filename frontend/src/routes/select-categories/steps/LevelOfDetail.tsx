import { CustomComboBox } from "@/components/custom-combo-box";
import { useEffect, useState } from "react";
import { useContentStoreActions, useLevelOfDetail } from "../store/contentStore";

const levelOfDetails = [
  {
    value: "1",
    label: "1 - Az detaylı",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
  {
    value: "6",
    label: "6",
  },
  {
    value: "7",
    label: "7",
  },
  {
    value: "8",
    label: "8",
  },
  {
    value: "9",
    label: "9",
  },
  {
    value: "10",
    label: "10 - Çok detaylı",
  },
];

const LevelOfDetail = () => {
  const storedLevelOfDetail = useLevelOfDetail();
  const [levelOfDetail, setLevelOfDetail] = useState(storedLevelOfDetail || "");
  const { updateContent: updateLevelOfDetail } = useContentStoreActions();

  useEffect(() => {
    updateLevelOfDetail({ detail: levelOfDetail });
  }, [levelOfDetail, updateLevelOfDetail]);

  return (
    <div>
      <CustomComboBox
        data={levelOfDetails}
        label="Detay Seviyesi"
        value={levelOfDetail}
        setValue={setLevelOfDetail}
      />
    </div>
  );
};

export default LevelOfDetail;
