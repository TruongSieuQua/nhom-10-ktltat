import { Dropdown, MenuProps, Image, Space, Avatar } from "antd";
import Title from "antd/es/typography/Title";
import images from "assets/images/images";
import * as React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

interface AccountProps {
  id?: string;
  children?: React.ReactNode;
}

const Account: React.FunctionComponent<AccountProps> = ({ children }) => {
  const navigate = useNavigate();
  const [selectedUrlPath, setSelectedUrlPath] = useState(
    window.location.pathname,
  );
  const updateSelectedUrlPath = (path: string) => {
    setSelectedUrlPath(path);
  };

  return (
    <div className="w-full">
      <Space className="w-full h-16 justify-between px-5 bg-white fixed top-0 left-0 z-10">
        <Link to="/home">
          <Avatar src={images.loginIcon} size={54} />
        </Link>
        <Space className="w-16 h-16"></Space>
        <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
          <Avatar src={images.mountain} size={48} />
        </Dropdown>
      </Space>
      <div className="mx-[auto] flex sm:flex-col md:flex-row pt-32">
        <div className="sm:text-center md:text-left md:basis-1/4 px-3 mb-6">
          <div className="w-full">
            <Title level={4} style={{ fontWeight: 700, marginBottom: "2rem" }}>
              Account settings
            </Title>
            <Space.Compact direction="vertical">
              {navLinks.map((link) => {
                return (
                  <Link
                    key={link.id}
                    to={link.to}
                    className={classStyle["link"]}
                    style={
                      link.to === selectedUrlPath
                        ? { color: "#111", textDecoration: "underline" }
                        : undefined
                    }
                    onClick={() => {
                      updateSelectedUrlPath(link.to);
                    }}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </Space.Compact>
          </div>
        </div>
        <div className="md:basis-3/4 px-3 mb-16">{children}</div>
      </div>
    </div>
  );
};

const classStyle = {
  link: "w-full text-[#767676] p-2 hover:text-[#111]",
};

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link to="/profile">View profile</Link>,
  },
  {
    key: "2",
    label: <Link to="/profile">Stats</Link>,
  },
  {
    key: "3",
    label: <Link to="/account">Account settings</Link>,
  },
  {
    key: "4",
    label: <button className="">Logout</button>,
  },
];

const navLinks = [
  {
    id: "profile",
    to: "/account",
    title: "Edit profile",
  },
  {
    id: "hiring",
    to: "/account/hiring",
    title: "Hiring",
  },
  {
    id: "d-history",
    to: "/account/downloads",
    title: "Download history",
  },
  {
    id: "e-settings",
    to: "/account/settings",
    title: "Email settings",
  },
  {
    id: "chg-password",
    to: "/account/password",
    title: "Change password",
  },
  {
    id: "connect",
    to: "/account/connect",
    title: "Connect accounts",
  },
  {
    id: "application",
    to: "/account/application",
    title: "Application",
  },
  {
    id: "close-account",
    to: "/account/disable",
    title: "Close account",
  },
];

export default Account;
