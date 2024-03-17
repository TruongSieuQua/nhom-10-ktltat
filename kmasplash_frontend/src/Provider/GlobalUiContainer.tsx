import LoadingCat from "components/Loading/LoadingCat";
import UploadModal from "components/UploadModal/UploadModal";
import PostDetail from "pages/Post/PostDetail";
import React from "react";
import { useAppSelector } from "redux/store";

export const postDetailRef = React.createRef<any>();
export const modalRef = React.createRef<any>();
export const loadingRef = React.createRef<any>();

function GlobalUiContainer() {
  const { isSignedIn } = useAppSelector((state) => state.auth);
  return (
    <>
      {isSignedIn && <UploadModal ref={modalRef} />}
      <PostDetail ref={postDetailRef} />
      <LoadingCat ref={loadingRef} />
    </>
  );
}

export default GlobalUiContainer;
