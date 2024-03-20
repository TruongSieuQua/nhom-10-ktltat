import React from "react";
import { Input, Form, Typography, InputProps } from "antd";

interface CustomInputProps extends InputProps {
  label?: string;
  error?: string;
}

const CustomInput2: React.FC<CustomInputProps> = ({
  label,
  error,
  ...rest
}) => {
  return (
    <>
      {label && (
        <Typography.Text className="text-base inline-block mb-1 pr-1" strong>
          {label}
        </Typography.Text>
      )}
      <Form.Item
        className="flex-column"
        validateStatus={error ? "error" : ""}
        help={<Typography.Text type="danger">{error}</Typography.Text>}
      >
        <Input size="large" {...rest} />
      </Form.Item>
    </>
  );
};

export default CustomInput2;
