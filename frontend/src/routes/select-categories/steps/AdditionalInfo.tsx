import { useEffect, useState } from "react";
import { useAdditionalInfo, useContentStoreActions } from "../store/contentStore";
import { Textarea } from "@/components/ui/textarea";

type TextareaEvent = React.ChangeEvent<HTMLTextAreaElement>

const AdditionalInfo = () => {
  const storedAdditionalInfo = useAdditionalInfo();
  const [additionalInfo, setAdditionalInfo] = useState(storedAdditionalInfo || "");
  const { updateContent: updateAdditionalInfo } = useContentStoreActions();


  const handleTextChange = (e: TextareaEvent) => {
    setAdditionalInfo(e.target.value);
  }

  useEffect(() => {
    updateAdditionalInfo({ additionalInfo: additionalInfo });
  }, [additionalInfo, updateAdditionalInfo]);

  return (
    <div>
      <Textarea value={additionalInfo} onChange={handleTextChange} placeholder="Ek bilgi girin." />
    </div>
  );
};

export default AdditionalInfo;
