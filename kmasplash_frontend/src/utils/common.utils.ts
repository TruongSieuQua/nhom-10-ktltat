import { RcFile } from "antd/es/upload";
import { CategoryName } from "models/post.interrface";

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const vnLabel = (label: CategoryName) => {
  const objects: any = {
    [CategoryName.PEOPLE]: "Mọi người",
    [CategoryName.ANIMALS]: "Động vật",
    [CategoryName.FOOD]: "Đồ ăn ngon",
    [CategoryName.NATURE]: "Cảnh đẹp",
  };
  return objects[label];
};
