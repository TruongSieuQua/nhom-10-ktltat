import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Grid, Image, Modal, Row, Space } from "antd";
import Form from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import Typography from "antd/es/typography";
import Title from "antd/es/typography/Title";
import images from "assets/images/images";
import CommonButton from "components/Button/CommonButton";
import CustomInput2 from "components/Input/CommonInput2";
import { exists } from "i18next";
import { url } from "inspector";
import { User } from "models/auth.interface";
import { Collection } from "models/collection.interface";
import { Post } from "models/post.interrface";
import * as React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
const { Text } = Typography;

const CollectionAdd: any = React.forwardRef((props: any, ref) => {
  const { user, post, collections = [] } = props;
  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm();
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  React.useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  const show = () => {
    setIsModalOpen(true);
  };

  const hide = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      onCancel={hide}
      open={isModalOpen}
      width={896}
      centered
      footer={false}
    >
      <Row className="h-[32rem] overflow-hidden">
        <Col sm={0} md={12}>
          <div className="flex">
            <Image
              src={images.mountain}
              rootClassName="w-full h-[32rem]"
              alt=""
            />
          </div>
        </Col>
        <Col sm={24} md={12} className="px-8">
          <div className="w-full flex flex-col gap-4">
            <Title level={3} style={{ fontWeight: 700, marginBottom: "2rem" }}>
              Add to Collection
            </Title>
            <Button
              size="large"
              onClick={() => {
                setAddFormVisible(true);
              }}
            >
              New Collection
            </Button>
            {post?._id &&
              collections &&
              collections.map(
                (collection: {
                  posts: {
                    some: (arg0: (postItem: any) => boolean) => any;
                    length: string;
                  };
                  name: any;
                }) => {
                  const exist = collection.posts.some(
                    (postItem: { _id: any }) => postItem._id === post._id,
                  );
                  return (
                    <div
                      key={post._id}
                      className="p-5 flex flex-col rounded bg-black bg-opacity-25 hover:bg-opacity-50 relative"
                      style={exist ? { backgroundColor: "#8fbc8f" } : undefined}
                      onClick={(event) => {
                        //handleClick();
                      }}
                    >
                      <Text>{collection.posts.length + " photos"}</Text>
                      <Title level={4} style={{ fontWeight: 700, margin: 0 }}>
                        {collection?.name || "adadad"}
                      </Title>
                      <div className="text-lg absolute top-6 right-5">
                        {exist ? <CheckOutlined /> : <PlusOutlined />}
                      </div>
                    </div>
                  );
                },
              )}
          </div>
          {/**Collection Add Form*/}
          {addFormVisible && (
            <div className="absolute top-0 left-0 w-full h-full px-8 bg-white z-20">
              <Form className="flex flex-col h-full">
                <Title
                  level={3}
                  style={{ fontWeight: 700, marginBottom: "2rem" }}
                >
                  Create new collection
                </Title>
                <Form.Item className="mb-0">
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <CustomInput2
                        label="Name"
                        {...field}
                        placeholder="Collection name"
                        //error={errors.email?.message}
                      />
                    )}
                  />
                </Form.Item>
                <Form.Item className="mb-0">
                  <Typography.Text
                    className="text-base inline-block mb-1 pr-1"
                    strong
                  >
                    Description
                  </Typography.Text>
                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                      <TextArea
                        rows={4}
                        placeholder="Describe your collection"
                        maxLength={200}
                      />
                    )}
                  />
                </Form.Item>
                <div className="flex justify-around gap-12 mt-auto">
                  <CommonButton
                    onClick={() => {
                      setAddFormVisible(false);
                    }}
                  >
                    Cancel
                  </CommonButton>
                  <CommonButton
                    type="primary"
                    className="bg-[#1677ff] hover:bg-[#4090ff]"
                  >
                    Create collection
                  </CommonButton>
                </div>
              </Form>
            </div>
          )}
        </Col>
      </Row>
    </Modal>
  );
});

export default CollectionAdd;
