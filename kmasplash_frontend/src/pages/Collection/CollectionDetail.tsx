import { ShareAltOutlined } from "@ant-design/icons";
import images from "assets/images/images";
import CommonButton from "components/Button/CommonButton";
import PinterestLayout from "components/ImageManager/PinterestLayout";
import MainLayout from "layout/MainLayout";
import { User } from "models/auth.interface";
import { Collection } from "models/collection.interface";
import * as React from "react";
import { Avatar, Space } from "antd";
import Title from "antd/es/typography/Title";

interface CollectionDetailProps {
  id?: string;
  user: User;
  collection?: Collection;
}

const CollectionDetail: React.FC<CollectionDetailProps> = (props) => {
  const { user, collection } = props;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="pt-14 px-6 pb-4 flex">
          <div className="grow flex flex-col gap-2">
            <Space>
              <Title level={1} style={{ fontWeight: 700 }}>
                People
              </Title>
              <Title level={5}>({"12" + " photos"})</Title>
            </Space>
            <Space className="items-center">
              <Avatar shape="circle" src={user?.avatar} alt="" size={40} />
              <Title level={5} style={{ margin: 0 }}>
                {user?.fullName}
              </Title>
            </Space>
          </div>
          <div className="flex justify-end items-end gap-2">
            <CommonButton style={{ width: "fit-content", height: "2rem" }}>
              Edit
            </CommonButton>

            <CommonButton
              type="primary"
              icon={<ShareAltOutlined />}
              className="bg-[#1677ff] hover:bg-[#4090ff] flex items-center"
              style={{ width: "fit-content", height: "2rem" }}
            >
              Share
            </CommonButton>
          </div>
        </div>
        {/* <PinterestLayout /> */}
      </div>
    </MainLayout>
  );
};

export default CollectionDetail;
