import images from "assets/images/images";
import Lottie from "lottie-react";
import React from "react";

function CommonFullLoading(): JSX.Element {
  const classes = "bg-black w-screen h-screen flex items-center justify-center";

  return (
    <div className={classes}>
      <Lottie animationData={images.loading} className="w-48 h-48" />;
    </div>
  );
}

export default CommonFullLoading;
