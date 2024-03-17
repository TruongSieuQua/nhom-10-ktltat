import * as React from "react";
import { Link } from "react-router-dom";
import { WithTranslation, useTranslation } from "react-i18next";

import images from "assets/images/images";
import { Form } from "antd";
import CustomInput2 from "components/Input/CommonInput2";
import CommonButton from "components/Button/CommonButton";

interface ForgetPasswordProps extends WithTranslation {
  id?: any;
}

const ForgetPassword: React.FunctionComponent<ForgetPasswordProps> = (
  props,
) => {
  const { t } = useTranslation();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center p-3 xs:w-full md:w-7/12 lg:w-5/12">
        <Link to="/home" className="mb-6">
          <img src={images.loginIcon} className="w-16 h-16 object-cover" />
        </Link>
        <div className="text-2xl font-bold text-center mb-2">
          {t("forgotPassword.title")}
        </div>
        <div className="text-sm text-center mb-8">
          {t("forgotPassword.subtitle")}
        </div>
        <Form className="w-full">
          <Form.Item>
            <CustomInput2
              label="Email"
              type="email"
              placeholder="Enter your Password"
            />
          </Form.Item>

          <Form.Item>
            <CommonButton
              type="primary"
              className="bg-[#1677ff] hover:bg-[#4090ff]"
            >
              Send password reset instructions
            </CommonButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
