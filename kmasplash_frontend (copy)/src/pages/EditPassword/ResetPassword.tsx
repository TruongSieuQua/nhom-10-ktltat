import * as React from "react";
import { useTranslation, WithTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Form } from "antd";
import images from "assets/images/images";
import CommonButton from "components/Button/CommonButton";
import CustomInput2 from "components/Input/CommonInput2";

interface ResetPasswordProps extends WithTranslation {
  id?: any;
}

const ResetPassword: React.FunctionComponent<ResetPasswordProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center p-3 xs:w-full md:w-7/12 lg:w-5/12">
        <Link to="/home" className="w-16 h-16 mb-6">
          <img src={images.loginIcon} className="w-full h-full object-cover" />
        </Link>
        <div className="text-2xl font-bold text-center mb-2">
          {t("changePassword.title")}
        </div>
        <div className="text-sm text-center mb-8">
          {t("changePassword.subtitle")}
        </div>
        <Form className="w-full">
          <Form.Item className="mb-0">
            <CustomInput2
              label="New password"
              type="password"
              placeholder="Enter your new password"
            />
          </Form.Item>

          <Form.Item>
            <CustomInput2
              label="Confirmed new password"
              type="password"
              placeholder="Re-enter your new password"
            />
          </Form.Item>

          <Form.Item>
            <CommonButton
              type="primary"
              className="bg-[#1677ff] hover:bg-[#4090ff]"
            >
              Change Password
            </CommonButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
