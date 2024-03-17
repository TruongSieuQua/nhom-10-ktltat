import {
  AppstoreOutlined,
  EditOutlined,
  HeartFilled,
  PictureOutlined,
} from "@ant-design/icons";
import { Col, Row, Tabs, TabsProps, Typography } from "antd";
import CommonAvatar from "components/Avatar/CommonAvatar";
import CommonFullLoading from "components/Loading/Loading";
import withAuthReducerHOC from "HOC/withAuthReducerHOC";
import MainLayout from "layout/MainLayout";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetUserProfileQuery } from "redux/api/authApi";
import { AuthState } from "redux/slices/authSlice";
import Collections from "./Collections";
import Photos from "./Photos";

interface ProfileProps {
  auth: AuthState;
}

const Profile: React.FunctionComponent<ProfileProps> = ({ auth }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const {
    data: user,
    isLoading,
    isError,
    isFetching,
  } = useGetUserProfileQuery(id || auth.user?._id || "1223");
  const onChange = (key: string) => {
    console.log(key);
  };
  if (isError) {
    navigate("/notFound");
  }
  if (isFetching || isLoading) {
    return <CommonFullLoading />;
  }
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex items-center">
          <PictureOutlined />
          Photos
        </div>
      ),
      children: <Photos userId={id} />,
    },
    {
      key: "2",
      label: (
        <div className="flex items-center">
          <HeartFilled className="fill-red" />
          Likes
        </div>
      ),
      children: <Photos userId={id} />,
    },
    {
      key: "3",
      label: (
        <div className="flex items-center">
          <AppstoreOutlined />
          Collections
        </div>
      ),
      children: <Collections />,
    },
  ];

  return (
    <MainLayout>
      <div className="text-base max-w-[82.5rem] mx-auto mt-30 mb-16 px-4">
        <Row gutter={24} className="h-36 mt-14 mb-16">
          <Col sm={8} className="text-right">
            {user && (
              <CommonAvatar
                user={user}
                size={136}
                className="my-auto bg-[#f56a00]"
              />
            )}
          </Col>
          <Col sm={16} className="flex flex-col gap-3">
            <div className="flex items-center gap-6">
              <Typography.Title
                level={1}
                style={{ fontWeight: 700, marginBottom: "0.5rem" }}
              >
                {user?.fullName}
              </Typography.Title>
              {auth.user?._id === id && (
                <Link
                  to="/account"
                  className="flex justify-center items-center gap-2 px-3 py-1 border-solid border-2 rounded hover:border-blue-300 hover:fill-blue-300"
                >
                  <EditOutlined />
                  <div>Edit profile</div>
                </Link>
              )}
            </div>
            <Typography.Text>
              {user?.bio ||
                "Passionate about KMA Splash. Sharing insights, knowledge, and experiences."}
            </Typography.Text>
          </Col>
        </Row>
        <div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </MainLayout>
  );
};

export default withAuthReducerHOC(Profile);
