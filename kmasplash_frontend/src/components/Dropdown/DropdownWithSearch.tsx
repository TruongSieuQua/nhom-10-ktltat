import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, Input, Menu } from "antd";
import { useRef, useState } from "react";
import React from "react";

interface Options {
  id: string;
  name: string;
}

interface DropdownWithSearchProps {
  options: Options[];
  selected?: Options;
  setSelected?: (selected: Options) => void;
}

const DropdownWithSearch: React.FC<DropdownWithSearchProps> = ({
  options,
  selected,
  setSelected,
  ...restProps
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const buttonRef = useRef<HTMLDivElement>(null);

  function handleClick(option: Options) {
    if (buttonRef.current != null) {
      buttonRef.current.innerText = option.name;
    }
    if (setSelected) {
      setSelected(option);
    }
  }

  const menu = (
    <Menu className="right-20">
      <div className="p-2">
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined className="text-gray-400" />}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          {options
            .filter((option) =>
              option.name.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((filtedOption) => (
              <Menu.Item
                key={filtedOption.id}
                onClick={() => {
                  handleClick(filtedOption);
                }}
                {...restProps}
              >
                {filtedOption.name}
              </Menu.Item>
            ))}
        </div>
      </div>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <div
        className="ant-dropdown-link w-full h-full flex justify-end items-center gap-1.5 px-3"
        onClick={(e) => e.preventDefault()}
      >
        <div ref={buttonRef} className="text-right">
          {selected?.name}
        </div>
        <div className="text-sm">
          <DownOutlined />
        </div>
      </div>
    </Dropdown>
  );
};

export default DropdownWithSearch;
