import { CustomComboBox } from "@/components/custom-combo-box";
import { useEffect, useState } from "react";
import { useAgeRange, useContentStoreActions } from "../store/contentStore";

const ageRanges = [
  {
    value: "7-12",
    label: "7-12",
  },
  {
    value: "12-15",
    label: "12-15",
  },
  {
    value: "12-18",
    label: "12-18",
  },
  {
    value: "18-25",
    label: "18-25",
  },
  {
    value: "25+",
    label: "25+",
  },
];

const AgeRange = () => {
  const storedAgeRange = useAgeRange();
  const [ageRange, setAgeRange] = useState(storedAgeRange || "");
  const { updateContent: updateAgeRangeInStore } = useContentStoreActions();

  console.log("ageRange", ageRange);

  useEffect(() => {
    updateAgeRangeInStore({ age: ageRange });
  }, [ageRange, updateAgeRangeInStore]);

  return (
    <div>
      <CustomComboBox
        data={ageRanges}
        label="Yaş aralığı"
        value={ageRange}
        setValue={setAgeRange}
      />
    </div>
  );
};

export default AgeRange;
