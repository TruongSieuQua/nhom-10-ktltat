import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "antd";
import Form from "antd/es/form";
import images from "assets/images/images";
import CommonButton from "components/Button/CommonButton";
import CustomInput2 from "components/Input/CommonInput2";
import { TError } from "models/Error.interface";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "redux/api/authApi";
import { signIn } from "redux/slices/authSlice";
import { useAppDispatch } from "redux/store";
import { showMessage } from "utils/toast";
import { SignUpFormData, SignUpFormSchema } from "validators/Auth.validators";

interface IRegisterProps {
  id?: any;
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  //const {} = props;
  const navigate = useNavigate();

  const [signUpMutation, signUpResult] = useSignUpMutation();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });
  const onSubmit = async (formData: SignUpFormData) => {
    try {
      const response = await signUpMutation(formData).unwrap();
      dispatch(signIn(response));
      showMessage("Login Successfully", "success");
      navigate("/");
    } catch (error: TError | any) {
      showMessage(error.data.message, "error");
    }
  };
  return (
    <div className="text-sm w-full h-screen flex">
      <div className="fixed top-4 left-4">
        <Link to="/home">
          <img src={images.loginIcon} className="w-16 h-16 object-cover" />
        </Link>
      </div>
      <div
        className="left-pane sm:hidden lg:block lg:w-1/2 2xl:w-2/5"
        style={{
          backgroundImage: `url(${images.loginBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "inset 0 0 0 100vmax rgba(0, 0, 0, .25)",
        }}
      >
        <div
          className="font-sans text-white flex flex-col justify-center relative"
          style={{
            height: "98vh",
            width: "76%",
            maxWidth: "32rem",
            margin: "0 auto",
          }}
        >
          <Typography.Title
            level={1}
            style={{ fontWeight: 700, color: "#fff", marginBottom: 0 }}
          >
            Creation start here
          </Typography.Title>
          <Typography.Title
            level={4}
            style={{ fontWeight: 600, color: "#fff" }}
          >
            {`Access ${1402} free, high-resolution photos you
            can't find anywhere else`}
          </Typography.Title>
          <Typography.Title
            level={5}
            className="absolute bottom-6"
            style={{ fontWeight: 600, color: "Gray" }}
          >
            Powered 2 days ago by KMA
          </Typography.Title>
        </div>
      </div>

      <div className="right-pane sm:w-full lg:w-1/2 2xl:w-3/5 flex flex-col justify-center items-center">
        <div className="max-w-[34rem] w-full px-3">
          <Typography.Title
            level={1}
            className="text-center"
            style={{ fontWeight: 700 }}
          >
            Join Kma Splash
          </Typography.Title>
          <Typography.Paragraph className="pb-[2rem] text-center">
            {"Already have an account? "}
            <Link
              to={"/login"}
              className="text-gray-500 underline hover:text-gray-800"
            >
              Login now!
            </Link>
          </Typography.Paragraph>

          <Form className="flex flex-col">
            <Typography.Paragraph className="text-center">
              {
                "Almost there. To finish creating your account, fill in the missing details below."
              }
            </Typography.Paragraph>
            <Form.Item className="mb-0">
              <Controller
                control={control}
                name="fullName"
                render={({ field }) => (
                  <CustomInput2
                    label="Full Name"
                    type="fullName"
                    {...field}
                    placeholder="Enter your full name"
                    error={errors.fullName?.message}
                  />
                )}
              />
            </Form.Item>
            <Form.Item className="mb-0">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <CustomInput2
                    label="Email"
                    type="email"
                    {...field}
                    placeholder="Enter your email address"
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
                    placeholder="Enter your password"
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
                className="w-full bg-gray-900 hover:bg-gray-800"
              >
                Join
              </CommonButton>
            </Form.Item>
          </Form>

          <Typography.Paragraph style={{ color: "gray" }}>
            {"By joining, you agree to the "}
            <Link to="/terms" className="underline hover:text-gray-800">
              Terms
            </Link>
            {" and "}
            <Link to="/policy" className="underline hover:text-gray-800">
              Private Policy
            </Link>
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
};

export default Register;
