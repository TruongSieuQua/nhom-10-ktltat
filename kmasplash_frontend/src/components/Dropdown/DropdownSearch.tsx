import {
  CameraOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputRef,
  Row,
  Space,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import images from "assets/images/images";
import axios from "axios";
import CommonButton from "components/Button/CommonButton";
import CustomInput2 from "components/Input/CommonInput2";
import { useUploadImage } from "hooks/useUploadImage";
import Lottie from "lottie-react";
import { loadingRef } from "Provider/GlobalUiContainer";
import * as React from "react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { vnLabel } from "utils/common.utils";
import { showMessage } from "utils/toast";
import { DetectSchema } from "validators/Post.validator";
import { z } from "zod";

const synth = window.speechSynthesis;
const DropdownSearch = React.forwardRef((props: any, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = React.useRef<InputRef>();
  const [urlLink, setUrlLink] = useState<string | undefined>();
  const { selectedImage, handleImageRemove, customRequest, imageUpload } =
    useUploadImage();
  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
    setValue,
    reset,
  } = useForm<z.infer<typeof DetectSchema>>({
    resolver: zodResolver(DetectSchema),
    defaultValues: {
      URL: undefined,
    },
  });
  const imageSample = useMemo(
    () => [
      {
        id: "1497034825429",
        url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      },
      {
        id: "1514888286974",
        url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=843&q=80",
      },
      {
        id: "1631947430066",
        url: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=930&q=80",
      },
    ],
    [],
  );
  const speak = React.useCallback((text: string) => {
    const msg = new SpeechSynthesisUtterance(`${text}`);
    const voices = synth.getVoices();
    msg.voice = voices[73];
    // msg.rate = 0.9;
    synth.speak(msg);
  }, []);

  const handleAIPerdiction = React.useCallback(() => {
    loadingRef.current.show();
    const params = urlLink?.length
      ? {
          params: {
            api_key: "cDzmrh9mOstV1Ho76gEM",
            image: urlLink,
          },
        }
      : {
          params: {
            api_key: "cDzmrh9mOstV1Ho76gEM",
          },
          data: selectedImage,
        };
    axios({
      method: "POST",
      url: "https://detect.roboflow.com/unsplash-detection/1",
      ...params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(function (response: any) {
        if (response.data.predictions.length === 0) {
          speak(
            "Xin lỗi chúng tôi không thể tìm thấy thông tin bạn đang yêu cầu !",
          );
        } else {
          const label = response.data.predictions[0].class;
          speak(`Đang hiển thị kết quả tìm kiếm cho  ${vnLabel(label)}`);
          setTimeout(() => {
            navigate(`/${label}`);
            hide();
          }, 2000);
        }
      })
      .catch(function (error: any) {
        showMessage(error.message, "error");
      })
      .finally(() => {
        loadingRef.current.hide();
      });
  }, [selectedImage, urlLink]);

  const uploadImageAnimation = useMemo(() => {
    return <Lottie animationData={images.uploadImage} className="w-64 h-64" />;
  }, []);

  React.useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  const show = () => {
    setIsOpen(true);
  };

  const hide = () => {
    setIsOpen(false);
    setUrlLink(undefined);
    handleImageRemove();
  };

  return (
    <div className="w-full relative" onClick={hide}>
      <Input
        placeholder="Search high resolution images"
        maxLength={30}
        onKeyDown={(e) => {
          if (e.key === "Enter" && inputRef.current?.input?.value) {
            navigate(`/search?q=${inputRef.current.input.value}`);
          }
        }}
        min={2}
        enterKeyHint={true}
        prefix={
          <SearchOutlined
            onClick={() => {
              if (inputRef.current?.input?.value) {
                navigate(`/search?q=${inputRef.current.input.value}`);
              }
            }}
          />
        }
        ref={inputRef}
        suffix={
          <CameraOutlined
            onClick={(e) => {
              show();
              e.stopPropagation();
            }}
          />
        }
        className={"w-full p-2 rounded-full px-5 border-[#eee] border"}
        {...props}
      />
      {isOpen && (
        <>
          <div
            className="w-[1.6rem] h-[1.6rem] z-50 rotate-45
             bg-white border-l border-t solid border-[#ccc] 
             absolute top-[3.2rem] right-[0.95rem]"
          ></div>
          <div
            className="absolute right-0
            w-[28rem] h-[32rem]
            bg-white rounded p-4
            border-[#ccc] border-solid border-[1px]
            z-40
            sm:translate-x-1/3 lg:translate-x-0 "
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Space.Compact block className="h-[2rem] flex justify-between">
              <Typography.Title level={5} style={{ marginBottom: 0 }}>
                Visual Search
              </Typography.Title>
              <Tooltip
                placement="rightBottom"
                title={"Tha hinh anh vao de tim kiem"}
              >
                <Typography.Text type="secondary" className="underline">
                  Need help?
                </Typography.Text>
              </Tooltip>
            </Space.Compact>
            <Row className="h-full  ">
              {selectedImage || urlLink ? (
                <>
                  <Col span={24} className=" items-center  justify-center">
                    <Space.Compact block className="rounded-lg overflow-hidden">
                      <Image
                        src={selectedImage || urlLink}
                        width={"100%"}
                        height={"24rem"}
                        className="object-cover"
                      />
                    </Space.Compact>
                    <Space className=" w-full items-center  justify-center  mt-4">
                      <CommonButton
                        type="primary"
                        onClick={handleAIPerdiction}
                        icon={<SearchOutlined color="black" className="mb-2" />}
                        className="bg-[#B6D8F2]  justify-center"
                        size="large"
                      >
                        Search out
                      </CommonButton>
                      <CommonButton
                        type="primary"
                        size="large"
                        className="bg-[#F4CFDF]  justify-center"
                        icon={<ReloadOutlined color="black" className="mb-2" />}
                        onClick={() => {
                          setUrlLink(undefined);
                          handleImageRemove();
                        }}
                      >
                        Try Again
                      </CommonButton>
                    </Space>
                  </Col>
                </>
              ) : (
                <>
                  <Col span={24} className="flex flex-col relative">
                    <Upload.Dragger
                      showUploadList={false}
                      customRequest={customRequest}
                      onRemove={handleImageRemove}
                      className="border-2 border-dashed border-gray-400 rounded-lg"
                    >
                      <div className="h-64 mx-20 mb-12 relative">
                        {/* <CloudUploadOutlined className="text-4xl mb-4" /> */}
                        {uploadImageAnimation}
                        <Typography.Paragraph className="absolute top-4 w-full text-lg text-center text-gray-600">
                          Drag and drop your files <br /> here or click to
                          browse
                        </Typography.Paragraph>
                        <div
                          className="absolute -bottom-20 w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Divider>Or</Divider>
                          <Form.Item>
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
                      </div>
                    </Upload.Dragger>
                    <Typography.Paragraph className="text-gray-600 text-center mt-2">
                      Or try one of the examples below:
                    </Typography.Paragraph>
                    <Space className="justify-center">
                      {imageSample.map((image) => (
                        <Image
                          key={image.id}
                          src={image.url}
                          preview={false}
                          width={80}
                          height={56}
                          className="object-cover rounded"
                          onClick={() => setUrlLink(image.url)}
                        />
                      ))}
                    </Space>
                  </Col>
                </>
              )}
            </Row>
          </div>
          <div
            className="fixed top-0 left-0 right-0 bottom-0 z-30"
            onClick={hide}
          ></div>
        </>
      )}
    </div>
  );
});

export default DropdownSearch;
