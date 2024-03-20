import { CloudUploadOutlined } from "@ant-design/icons";
import { Space, Typography, Upload, Image, Divider, Button, Row } from "antd";
import Header from "components/Header/Header";
import PinterestLayout from "components/ImageManager/PinterestLayout";
import * as React from "react";
import { useState } from "react";
import { showMessage } from "utils/toast";

interface VisualProps {
  id?: string;
  //image?:
}

const Visual: React.FC<VisualProps> = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (file: any) => {
    const reader: any = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
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
  const onSubmit = async (formData: any) => {
    //
  };

  return (
    <>
      <Header />
      <div className="w-full max-w-7xl m-[0 auto] p-4">
        <Space className="w-full flex-col justify-center py-8 px-6">
          <Typography.Title
            level={1}
            style={{ fontWeight: 600, marginBottom: 0 }}
          >
            Visual search
          </Typography.Title>
          <Typography.Text>
            Try to upload an image to find similar images
          </Typography.Text>
          <Space className="w-56 h-56 items-center">
            {selectedImage ? (
              <Image
                src={selectedImage}
                width={"100%"}
                height={"100%"}
                alt="Selected"
                className="mt-auto object-contain"
              />
            ) : (
              <Upload.Dragger
                showUploadList={false}
                customRequest={customRequest}
                onRemove={handleImageRemove}
                className="block h-full bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg text-center"
              >
                <>
                  <CloudUploadOutlined className="text-4xl mb-4" />
                  <p className="text-gray-600 text-lg">
                    Drag and drop your files here or click to browse
                  </p>
                </>
              </Upload.Dragger>
            )}
          </Space>
          <Space>
            <Button type="primary" className="w-full bg-[#1677ff]">
              Find
            </Button>
            <Button
              onClick={() => {
                setSelectedImage(null);
              }}
            >
              Clear
            </Button>
          </Space>
        </Space>
        <Divider>Result</Divider>
        {/* <PinterestLayout /> */}
      </div>
    </>
  );
};

export default Visual;
