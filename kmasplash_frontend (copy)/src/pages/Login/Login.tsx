import { zodResolver } from "@hookform/resolvers/zod";
import images from "assets/images/images";

import { FacebookFilled } from "@ant-design/icons";
import { Avatar, Form, Space, Typography } from "antd";
import CommonButton from "components/Button/CommonButton";
import CustomInput2 from "components/Input/CommonInput2";
import { TError } from "models/Error.interface";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { WithTranslation } from "react-i18next";
import { HistoryRouterProps, Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "redux/api/authApi";
import { signIn } from "redux/slices/authSlice";
import { useAppDispatch } from "redux/store";
import { showMessage } from "utils/toast";
import { SignInFormData, SignInFormSchema } from "validators/Auth.validators";
interface ILoginProps extends WithTranslation {
  history?: HistoryRouterProps;
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const { t } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signInMutation, signInResult] = useSignInMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (formData: SignInFormData) => {
    try {
      const response = await signInMutation(formData).unwrap();
      dispatch(signIn(response));
      showMessage("Login Successfully", "success");
      navigate("/");
    } catch (error: TError | any) {
      // showToastError(error);

      showMessage(error.data.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="sm:w-full max-w-3xl px-4 flex flex-col items-center">
        <Space className="flex-col">
          <Link to="/home">
            <Avatar
              shape="circle"
              className="w-16 h-16 object-cover "
              src={images.loginIcon}
            />
          </Link>
          <Typography.Title
            level={3}
            style={{ fontWeight: 700, marginBottom: 0 }}
          >
            Login
          </Typography.Title>
          <Typography.Text>Welcome back</Typography.Text>
        </Space>

        <Space.Compact block className="flex-col gap-4 mt-6">
          <CommonButton
            type="primary"
            className="w-full bg-blue-500 mx-[auto]"
            icon={<FacebookFilled className="align-baseline" />}
          >
            Login with Facebook
          </CommonButton>
          <Typography.Paragraph className="text-center">
            OR
          </Typography.Paragraph>
        </Space.Compact>
        <Form className="w-full px-4 mt-4">
          <Form.Item className="mb-0">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <CustomInput2
                  label="Email"
                  type="email"
                  {...field}
                  placeholder="Enter your email"
                  error={errors.email?.message}
                />
              )}
            />
          </Form.Item>
          <Form.Item>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <CustomInput2
                  label="Password"
                  type="password"
                  {...field}
                  placeholder="Enter your Password"
                  error={errors.password?.message}
                />
              )}
            />
          </Form.Item>
          <Form.Item>
            <CommonButton
              type="primary"
              htmlType="submit"
              onClick={handleSubmit(onSubmit)}
              className="w-full bg-gray-900"
            >
              Log In
            </CommonButton>
          </Form.Item>
        </Form>
      </div>
      <Typography.Paragraph style={{ color: "gray" }}>
        {"Don't have an account? "}
        <Link
          to={"/register"}
          className="text-sm text-gray-500 underline hover:text-gray-800"
        >
          Register now!
        </Link>
      </Typography.Paragraph>
    </div>
  );
};

export default Login;
