import images from "assets/images/images";
import Lottie from "lottie-react";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const LoadingCat = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setIsVisible(true);
    },
    hide: () => {
      setIsVisible(false);
    },
  }));

  const modalStyles = `fixed inset-0 flex items-center justify-center z-50  ${
    isVisible ? "visible" : "invisible"
  }`;

  const overlayStyles =
    "fixed inset-0 bg-white bg-opacity-32 rounded-2xl shadow-md backdrop-blur-lg border border-white border-opacity-45 opacity-75";

  return (
    <div className={modalStyles}>
      <div className={overlayStyles} />
      <Lottie animationData={images.catLoading} className="w-48 h-48" />
    </div>
  );
});

export default LoadingCat;
