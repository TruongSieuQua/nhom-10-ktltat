import { DeleteOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import images from "assets/images/images";
import React from "react";
import { Link } from "react-router-dom";

interface CollectionsProps {
  id?: string;
}

const Collections: React.FunctionComponent<CollectionsProps> = (props) => {
  return (
    <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
      <Collection />
    </div>
  );
};

interface CollectionProps {
  id?: string;
  postList?: {
    index?: { id: string };
  }[];
}

const confirm = () => {
  message.info("Clicked on Yes.");
};

const Collection: React.FunctionComponent<CollectionProps> = (props) => {
  const { postList } = props;
  // to="/collections/collectionID"
  return (
    <div>
      <div className="w-full aspect-[10/7] flex gap-1 overflow-hidden mb-4 hover:bg-white hover:bg-opacity-90 relative">
        <div className="absolute top-0 left-0 w-full h-full z-10 bg-[#111] bg-opacity-0 hover:bg-opacity-30">
          <div
            className="absolute top-2 right-2"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Popconfirm
              title="Delete the collection"
              description="Are you sure to delete this collection?"
              okText="Yes"
              cancelText="No"
              onConfirm={confirm}
            >
              <Button
                type="primary"
                className="text-lg flex justify-center items-center w-10 h-10"
                danger
              >
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        </div>
        <div className=" basis-2/3">
          <div className="w-full h-full bg-slate-200">
            <img src={images.mountain} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="basis-1/3 flex flex-col gap-1">
          <div className="w-full h-1/2 bg-slate-200">
            <img src={images.mountain} className="w-full h-full object-cover" />
          </div>
          <div className="w-full h-1/2 bg-slate-200">
            <img src={images.mountain} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      <div className="text-lg font-semibold">People</div>
      <div>
        {"7 "}&nbsp;photo &middot; Curated by&nbsp;
        <Link to="" className="text-[#111] font-semibold underline">
          {"Nguyen Truong"}
        </Link>
      </div>
    </div>
  );
};

export default Collections;
