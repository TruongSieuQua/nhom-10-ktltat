import { Button } from "antd";
import Lottie from "lottie-react";
import { useNavigate } from "react-router";
import React from "react";
import images from "assets/images/images";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="container flex sm:flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-lg">
          <Lottie animationData={images.paperPlane} />
        </div>
        <div className="max-w-md">
          <div className="text-6xl font-dark font-bold">404</div>
          <p className="text-3xl md:text-3xl font-light leading-normal">
            Sorry we {"couldn't"} find this page.
          </p>
          <p className="mb-8">
            But {"don't"} worry, you can find plenty of other things on our
            homepage.
          </p>
          <Button
            type="primary"
            className="bg-blue-500"
            size="large"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
