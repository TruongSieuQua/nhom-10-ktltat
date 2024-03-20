import { Tag } from "antd";
import React from "react";
import { getRandomColor } from "utils/randomColor";

export const tagRender = (props: any) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={getRandomColor()}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      className={"mx-2 items-center justify-center"}
      onClose={onClose}
    >
      {label}
    </Tag>
  );
};
