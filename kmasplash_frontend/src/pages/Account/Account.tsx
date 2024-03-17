import { zodResolver } from "@hookform/resolvers/zod";
import { Col, Row, Typography } from "antd";
import Form from "antd/es/form";
import Upload from "antd/es/upload";
import CommonAvatar from "components/Avatar/CommonAvatar";
import CommonButton from "components/Button/CommonButton";
import {
  default as CommonInput2,
  default as CustomInput2,
} from "components/Input/CommonInput2";
import withAuthReducerHOC from "HOC/withAuthReducerHOC";
import { useUploadImage } from "hooks/useUploadImage";
import { TError } from "models/Error.interface";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "redux/api/authApi";
import { useUploadImageMutation } from "redux/api/postApi";
import { AuthState, updateProfile } from "redux/slices/authSlice";
import { useAppDispatch } from "redux/store";
import { API_URL } from "services/apiService";
import { showMessage } from "utils/toast";
import {
  UpdateAuthFormData,
  UpdateAuthSchema,
} from "validators/Auth.validators";
import Layout from "./Layout";
const { Text, Link } = Typography;

interface EditProfileProps {
  auth: AuthState;
}

const EditProfile: React.FunctionComponent<EditProfileProps> = ({ auth }) => {
  const { user } = auth;
  const [updateMutation, updateResult] = useUpdateProfileMutation();
  const dispatch = useAppDispatch();
  const { selectedImage, handleImageRemove, customRequest, imageUpload } =
    useUploadImage();
  const [uploadImage, uploadImageResult] = useUploadImageMutation();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    clearErrors,
  } = useForm<UpdateAuthFormData>({
    resolver: zodResolver(UpdateAuthSchema),
    defaultValues: {
      fullName: user?.fullName,
      bio: user?.bio,
      location: user?.location,
      userName: user?.userName,
      portfolio: user?.portfolio,
      facebookId: user?.facebookId,
      instagramId: user?.instagramId,
      avatar: user?.avatar,
    },
  });

  const onSubmit = React.useCallback(
    async (formData: UpdateAuthFormData) => {
      try {
        let data = {
          ...formData,
        };
        if (imageUpload) {
          const imageUploadResponse = await uploadImage(imageUpload).unwrap();
          data = {
            ...formData,
            avatar:
              "https://kmaunsplash.s3.ap-southeast-2.amazonaws.com/" +
              imageUploadResponse.key,
          };
        }
        const response = await updateMutation(data).unwrap();
        dispatch(updateProfile(response));
        showMessage("Update profile successfully", "success");
        // navigate("/");
        handleImageRemove();
      } catch (error: TError | any) {
        // showToastError(error);

        showMessage(error.data.message, "error");
      }
    },
    [imageUpload],
  );
  return (
    <Layout>
      <div>
        <Typography.Title level={4} style={{ fontWeight: 700 }}>
          Edit profile
        </Typography.Title>
        <Form>
          <Row gutter={[16, 16]}>
            {user && (
              <Controller
                control={control}
                name="avatar"
                render={({ field }) => (
                  <Col
                    sm={24}
                    lg={8}
                    className="flex justify-center  items-center"
                  >
                    <Upload.Dragger
                      showUploadList={false}
                      customRequest={customRequest}
                      onRemove={handleImageRemove}
                      className="border-none  bg-transparent "
                    >
                      <CommonAvatar
                        {...field}
                        source={selectedImage || user.avatar}
                        user={user}
                        size={240}
                        // action={() => {}}
                        className="my-auto  bg-[#f56a00]"
                      />
                    </Upload.Dragger>
                  </Col>
                )}
              />
            )}

            <Col sm={24} lg={16}>
              <Row>
                <Col sm={24}>
                  <Form.Item className="mb-0">
                    <Controller
                      control={control}
                      name="fullName"
                      render={({ field }) => (
                        <CustomInput2
                          label="Full name"
                          type="text"
                          className={"text-base p-2"}
                          {...field}
                          error={errors.fullName?.message}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col sm={24}>
                  <Form.Item className="mb-0">
                    <CustomInput2
                      label="Email"
                      type="email"
                      className={"text-base p-2"}
                      value={user?.email || "my@example.com"}
                      disabled
                      error={errors.fullName?.message}
                    />
                  </Form.Item>
                </Col>
                <Col sm={24}>
                  <Form.Item className="mb-0">
                    <Controller
                      control={control}
                      name="userName"
                      render={({ field }) => (
                        <CustomInput2
                          label="Username"
                          type="text"
                          className={"text-base p-2"}
                          {...field}
                          error={errors.userName?.message}
                        />
                      )}
                    />
                  </Form.Item>
                  <Text type="secondary" className="text-sm">{`${
                    API_URL + user?._id
                  }`}</Text>
                </Col>
              </Row>
            </Col>
          </Row>
          <Typography.Title
            level={4}
            style={{ fontWeight: 700, marginTop: "1rem", marginBottom: "1rem" }}
          >
            About
          </Typography.Title>
          <Row gutter={16}>
            <Col sm={24} md={12}>
              <Form.Item className="mb-0">
                <Controller
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <CustomInput2
                      label="Location"
                      type="text"
                      className={"text-base p-2"}
                      {...field}
                      error={errors.location?.message}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item className="mb-0">
                <Controller
                  control={control}
                  name="portfolio"
                  render={({ field }) => (
                    <CustomInput2
                      label="Personal site/portfolio"
                      type="text"
                      className={"text-base p-2"}
                      {...field}
                      error={errors.portfolio?.message}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item className="mb-0">
                <Controller
                  control={control}
                  name="bio"
                  render={({ field }) => (
                    <CustomInput2
                      label="Bio"
                      type="text-area"
                      style={{ height: "6.875rem" }}
                      maxLength={250}
                      {...field}
                      error={errors.bio?.message}
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
          <Typography.Title level={4} style={{ fontWeight: 700 }}>
            Social
          </Typography.Title>
          <Row gutter={16}>
            <Col sm={24} md={12}>
              <Form.Item className="mb-0">
                <Controller
                  control={control}
                  name="facebookId"
                  render={({ field }) => (
                    <CommonInput2
                      prefix="/"
                      label="Facebook"
                      className={"text-base p-2"}
                      {...field}
                      error={errors.facebookId?.message}
                      placeholder="Your facebook id"
                    />
                  )}
                />
              </Form.Item>
              <Typography.Text
                type="secondary"
                className="text-[#767676]  text-sm"
              >
                So that we can feature you on /
                <Link href={`https://www.facebook.com/${"facebook"}`}>
                  {"facebook"}
                </Link>
              </Typography.Text>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item className="mb-0">
                <Controller
                  control={control}
                  name="instagramId"
                  render={({ field }) => (
                    <CommonInput2
                      prefix="@"
                      label="Instagram ID"
                      className={"text-base p-2"}
                      {...field}
                      error={errors.instagramId?.message}
                      placeholder="Your twitter username"
                    />
                  )}
                />
              </Form.Item>
              <Typography.Text
                type="secondary"
                className="text-[#767676]  text-sm"
              >
                So that we can feature you on @
                <Link href={`https://twitter.com/${"twitter"}`}>
                  {"twitter"}
                </Link>
              </Typography.Text>
            </Col>
            <Col sm={24} style={{ marginTop: "3rem" }}>
              <CommonButton
                onClick={handleSubmit(onSubmit)}
                disabled={
                  !!updateResult?.isLoading ||
                  !!uploadImageResult?.isLoading ||
                  (!isDirty && !imageUpload)
                }
                type="primary"
                className={"bg-[#1677ff] hover:bg-[#4090ff]"}
              >
                Update account
              </CommonButton>
            </Col>
          </Row>
        </Form>
      </div>
    </Layout>
  );
};

export default withAuthReducerHOC(EditProfile);
