import { Input } from "antd";
import React, { useRef } from "react";

import {
  SearchOutlined,
  HeartOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import UploadImageModal from "components/UploadImageModal/UploadImageModal";

function SearchInput(props: any): JSX.Element {
  const imageInputRef = useRef<any>();

  return (
    <>
      <Input
        placeholder="Search high resolution images"
        prefix={<SearchOutlined />}
        suffix={
          <CameraOutlined
            onClick={() => {
              imageInputRef.current.show();
            }}
          />
        }
        className={"w-full p-2 rounded-full px-5 border-[#eee] border"}
        {...props}
      />
      <UploadImageModal ref={imageInputRef} />
    </>
  );
}

export default SearchInput;
