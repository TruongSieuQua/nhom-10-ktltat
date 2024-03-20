import React, { useEffect, useRef, useState } from "react";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Input, Tag, theme } from "antd";

interface CommonTagProps {
  tags: string[];
  setTags: (newTags: string[]) => void;
}

const CommonTag: React.FC<CommonTagProps> = (props) => {
  const { tags, setTags } = props;

  const { token } = theme.useToken();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
        style={{
          transition: "opacity 0.2s",
          display: "flex",
          alignItems: "center",
          fontSize: "14px",
          padding: "4px 8px",
        }}
        closeIcon={<CloseOutlined />}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: "inline-block", margin: "6px" }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = tags.map(forMap);

  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
    width: "fit-content",
    display: "flex",
    gap: "4px",
    alignItems: "center",
    fontSize: "14px",
    padding: "4px 8px",
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>{tagChild}</div>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag onClick={showInput} style={tagPlusStyle}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};

export default CommonTag;
