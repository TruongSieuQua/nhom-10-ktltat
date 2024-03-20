import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Col, Image, Modal, Row, Upload } from "antd";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreatePostMutation } from "redux/api/postApi";
import { showMessage } from "utils/toast";

const UploadImageModal = React.forwardRef((props: any, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [createPostMutate, result] = useCreatePostMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm();
  React.useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  const show = () => {
    setIsModalOpen(true);
  };

  const hide = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };
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
      <Modal onCancel={hide} open={isModalOpen} width={640} footer={false}>
        <Row className="justify-center" gutter={16}>
          <Col sm={24} className="h-96 mt-8">
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
          </Col>
          <Col sm={16} className="mt-4">
            <Button type="primary" className="w-full bg-[#1677ff]">
              Find
            </Button>
          </Col>
          <Col sm={8} className="mt-4">
            <Button
              className="w-full"
              onClick={() => {
                handleImageRemove();
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
});

export default UploadImageModal;
