import { useState } from "react";
import { showMessage } from "utils/toast";

export const useUploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUpload, setImageUpload] = useState<any>(undefined);

  const handleImageUpload = (file: File) => {
    const reader: any = new FileReader();
    reader.onload = () => {
      const fileInfo = {
        file: file,
        size: file.size,
        mimetype: file.type,
        originalname: file.name,
      };
      setSelectedImage(reader.result);
      setImageUpload(fileInfo);
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  const customRequest = ({ file }: { file: any }) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      showMessage("Only image files are allowed.", "error");
      return;
    }
    handleImageUpload(file);
  };

  return {
    selectedImage,
    handleImageRemove,
    customRequest,
    imageUpload,
  };
};
