import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import images from "assets/images/images";

const LikeAnimation = (props: any) => {
  const { like } = props;
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (like) {
      animationRef.current.setDirection(1);
      animationRef.current.goToAndPlay(
        animationRef.current.getDuration(),
        false,
      );
    } else {
      animationRef.current.setDirection(-1);
      animationRef.current.goToAndPlay(0, true);
    }
  }, [like]);

  return (
    <Lottie
      animationData={images.likeAction}
      lottieRef={animationRef}
      loop={false}
    />
  );
};

export default LikeAnimation;
