import { zodResolver } from "@hookform/resolvers/zod";
import Form from "antd/es/form";
import Title from "antd/es/typography/Title";
import CommonButton from "components/Button/CommonButton";
import CustomInput2 from "components/Input/CommonInput2";
import { TError } from "models/Error.interface";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useChangePasswordMutation } from "redux/api/authApi";
import { showMessage } from "utils/toast";
import {
  ChangePasswordFormData,
  ChangePasswordFormSchema,
} from "validators/Auth.validators";
import Layout from "./Layout";

interface ChangePasswordProps {
  id?: string;
}

const ChangePassword: React.FunctionComponent<ChangePasswordProps> = (
  props,
) => {
  const [chPasswordMutate, chPasswordResult] = useChangePasswordMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (formData: ChangePasswordFormData) => {
    try {
      const response = await chPasswordMutate({
        password: formData.password,
        newPassword: formData.newPassword,
      }).unwrap();
      showMessage("Change password successfully", "success");
      // navigate("/");
    } catch (error: TError | any) {
      // showToastError(error);

      showMessage(error.data.message, "error");
    }
  };
  return (
    <Layout>
      <div>
        <Title level={4} style={{ fontWeight: 700, marginBottom: "2rem" }}>
          Change password
        </Title>
        <Form>
          <div className="flex flex-col">
            <Form.Item className="mb-0">
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <CustomInput2
                    label="Current password"
                    type="password"
                    {...field}
                    error={errors.password?.message}
                  />
                )}
              />
            </Form.Item>
            <Form.Item className="mb-0">
              <Controller
                control={control}
                name="newPassword"
                render={({ field }) => (
                  <CustomInput2
                    label="New password"
                    type="password"
                    {...field}
                    error={errors.newPassword?.message}
                  />
                )}
              />
            </Form.Item>
            <Form.Item className="mb-0">
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <CustomInput2
                    label="Password confirmation"
                    type="password"
                    {...field}
                    error={errors.confirmPassword?.message}
                  />
                )}
              />
            </Form.Item>

            <CommonButton
              onClick={handleSubmit(onSubmit)}
              type="primary"
              className="bg-[#1677ff] hover:bg-[#4090ff]"
            >
              Change password
            </CommonButton>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default ChangePassword;
