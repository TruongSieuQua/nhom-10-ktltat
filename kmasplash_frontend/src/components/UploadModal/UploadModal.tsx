import { CloudUploadOutlined, ReloadOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Form, Image, Modal, Row, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import CommonButton from "components/Button/CommonButton";
import CustomInput2 from "components/Input/CommonInput2";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { showMessage } from "utils/toast";

import { useUploadImage } from "hooks/useUploadImage";
import { TError } from "models/Error.interface";
import { CreatePost, Post } from "models/post.interrface";
import {
  useCreatePostMutation,
  useGetCategoriesQuery,
  useUpdatePostMutation,
  useUploadImageMutation,
} from "redux/api/postApi";
import { PostForm, PostValidatorSchema } from "validators/Post.validator";
import { tagRender } from "./components/tagRender";
import { loadingRef } from "Provider/GlobalUiContainer";
import { useNavigate } from "react-router";

const UploadModal = React.forwardRef((props: any, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createPostMutate, result] = useCreatePostMutation();
  const [uploadImage, { isLoading }] = useUploadImageMutation();
  const [updatePost] = useUpdatePostMutation();
  const navigate = useNavigate();
  const [urlLink, setUrlLink] = useState<string | undefined>(undefined);
  const [post, setPost] = useState<Post>();
  const { data } = useGetCategoriesQuery();
  const { selectedImage, handleImageRemove, customRequest, imageUpload } =
    useUploadImage();
  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
    setValue,
    reset,
  } = useForm<PostForm>({
    resolver: zodResolver(PostValidatorSchema),
    defaultValues: {
      title: "",
      description: "",
      categories: [],
    },
  });
  React.useImperativeHandle(ref, () => ({
    show,
    hide,
  }));
  if (isLoading) {
    loadingRef.current?.show();
  }
  const show = (post?: Post) => {
    if (post) {
      setPost(post);
      if (post?.fileName) {
        setValue("fileName", post.fileName);
        setUrlLink(post?.fileName);
      }
      if (post.URL) {
        setValue("URL", post?.URL);
        setUrlLink(post?.URL);
      }
      setValue("title", post?.title || "");
      setValue("description", post?.description || "");
      setValue(
        "categories",
        post?.categories.map((item: any) => item._id) || [],
      );
    } else {
      refreshImage();
      reset();
    }
    clearErrors();
    setIsModalOpen(true);
  };

  const hide = () => {
    setIsModalOpen(false);
    handleImageRemove();
  };
  const refreshImage = () => {
    handleImageRemove();
    setUrlLink(undefined);
  };
  const onSubmit = React.useCallback(
    async (formData: CreatePost) => {
      try {
        let data = {
          ...formData,
        };
        if (imageUpload) {
          const imageUploadResponse = await uploadImage(imageUpload).unwrap();
          data = {
            ...formData,
            fileName:
              "https://kmaunsplash.s3.ap-southeast-2.amazonaws.com/" +
              imageUploadResponse.key,
          };
        }
        if (post) {
          const response = await updatePost({
            postId: post._id,
            method: "PATCH",
            body: formData,
          }).unwrap();
          hide();
          showMessage("Sửa bài viết thành công", "success");
        } else {
          const response = await createPostMutate(data).unwrap();
          showMessage("Tạo bài viết thành công", "success");
          navigate(`/post/${response._id}`);
        }
        reset();
        clearErrors();
        refreshImage();
      } catch (error: TError | any) {
        showMessage(error.data.message, "error");
      }
    },
    [imageUpload, post],
  );

  return (
    <>
      <Modal
        onCancel={hide}
        open={isModalOpen}
        width={880}
        footer={false}
        centered={true}
      >
        <Row>
          <Col
            sm={24}
            xs={12}
            lg={8}
            xl={8}
            className="item-center justify-center"
          >
            {selectedImage || urlLink ? (
              <div className="h-full relative">
                <Image
                  src={selectedImage || urlLink}
                  width={"100%"}
                  height={"100%"}
                  alt="Selected"
                  className="mt-auto object-contain"
                />
                <Button
                  type="text"
                  className="absolute top-2 left-2"
                  onClick={refreshImage}
                  icon={<ReloadOutlined />}
                />
              </div>
            ) : (
              <div className="flex flex-col  justify-center items-center">
                <Upload.Dragger
                  showUploadList={false}
                  customRequest={customRequest}
                  onRemove={handleImageRemove}
                  className="bg-gray-200 border-2 border-dashed border-gray-400 flex-1 rounded-lg p-8 py-40 text-center"
                >
                  <>
                    <CloudUploadOutlined className="text-4xl mb-4" />
                    <p className="text-gray-600 text-lg">
                      Drag and drop your files here or click to browse
                    </p>
                  </>
                </Upload.Dragger>
                <Form.Item className="mb-0">
                  <Controller
                    control={control}
                    name="URL"
                    render={({ field }) => (
                      <CustomInput2
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          setUrlLink(e.target.value);
                        }}
                        bordered={false}
                        style={{
                          borderBottom: "1px solid grey",
                          borderRadius: 0,
                        }}
                        className="text-2xl font-bold tracking-wider border-[2px] pb-2 border-b-[2px]"
                        placeholder="Lưu từ trang"
                        error={errors.URL?.message}
                      />
                    )}
                  />
                </Form.Item>
              </div>
            )}
          </Col>
          <Col sm={24} xs={12} lg={16} xl={16} className="h-[34rem]">
            <Form className="w-full h-full px-4 mt-4 flex flex-col">
              <Form.Item className="mb-0">
                <Controller
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <CustomInput2
                      {...field}
                      bordered={false}
                      style={{
                        borderBottom: "1px solid grey",
                        borderRadius: 0,
                      }}
                      className="text-2xl font-bold tracking-wider border-[2px] pb-2 border-b-[2px]"
                      placeholder="Tạo tiêu đề "
                      error={errors.title?.message}
                    />
                  )}
                />
              </Form.Item>
              <Form.Item>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <TextArea
                      maxLength={300}
                      {...field}
                      bordered={false}
                      style={{
                        borderBottom: "1px solid grey",
                        borderRadius: 0,
                        height: 120,
                        resize: "none",
                      }}
                      className="text-md font-bold tracking-wider border-[2px] pb-2 border-b-[2px] mt-12"
                      placeholder="Cho mọi người biết về bức mình của bạn nhé !"
                      // error={errors.description?.message}
                    />
                  )}
                />
              </Form.Item>
              {data && (
                <Form.Item>
                  <Controller
                    control={control}
                    name="categories"
                    render={({ field }) => (
                      <Select
                        mode="multiple"
                        showArrow
                        {...field}
                        tagRender={tagRender}
                        autoClearSearchValue
                        fieldNames={{
                          label: "value",
                          value: "_id",
                        }}
                        disabled={!!post}
                        bordered={false}
                        placeholder="Chọn danh mục "
                        style={{
                          borderBottom: "1px solid grey",
                          borderRadius: 0,
                          width: "100%",
                        }}
                        className="text-md font-bold tracking-wider mt-12"
                        options={data}
                      />
                    )}
                  />
                </Form.Item>
              )}
              <Form.Item style={{ marginTop: "auto", marginBottom: "2.25rem" }}>
                <CommonButton
                  type="primary"
                  disabled={
                    !imageUpload && isLoading && result.isLoading && !urlLink
                  }
                  onClick={handleSubmit(onSubmit)}
                  className="w-full bg-gray-900"
                >
                  {post ? "Sửa bài viết" : "Đăng Bài"}
                </CommonButton>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
});
export default React.memo(UploadModal);
