import {
  CloseOutlined,
  EditOutlined,
  EllipsisOutlined,
  FacebookFilled,
  HeartOutlined,
  LinkOutlined,
  MailOutlined,
  QuestionCircleOutlined,
  SendOutlined,
  ShareAltOutlined,
  TwitterCircleFilled,
} from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Col,
  Form,
  Image,
  message,
  Popconfirm,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import Button from "antd/es/button";
import Dropdown from "antd/es/dropdown";
import Menu from "antd/es/menu";
import LikeAnimation from "components/Animation/LikeAnimation";
import CommonAvatar from "components/Avatar/CommonAvatar";
import CommentSection from "components/Comment/CommentSection";
import PinterestLayout from "components/ImageManager/PinterestLayout";
import CustomInput2 from "components/Input/CommonInput2";
import CommonFullLoading from "components/Loading/Loading";
import MainLayout from "layout/MainLayout";
import { TError } from "models/Error.interface";
import moment from "moment";
import { loadingRef, modalRef } from "Provider/GlobalUiContainer";
import * as React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router";
import {
  useCommentPostMutation,
  useGetPostByIdQuery,
  useLikePostMutation,
  useUpdatePostMutation,
} from "redux/api/postApi";
import { useAppSelector } from "redux/store";
import { API_URL_WEB } from "services/apiService";
import { getRandomColor } from "utils/randomColor";
import { showMessage } from "utils/toast";
import { CommentForm, CommentValidatorSchema } from "validators/Post.validator";

const PostDetailScreen = (props: any) => {
  const { user } = useAppSelector((state) => state.auth);
  const params = useParams();
  const navigate = useNavigate();
  const {
    data: post,
    isLoading,
    isError,
    isSuccess: isSuccessPost,
    refetch,
    isFetching,
  } = useGetPostByIdQuery(params.postId);
  const [isFollow, setIsFollow] = useState(true);
  const [deletePost] = useUpdatePostMutation();
  const [commentMutate] = useCommentPostMutation();
  const [likePost, { isSuccess }] = useLikePostMutation();
  const moreMenu = React.useMemo(
    () => (
      <Menu style={{ fontSize: "20px" }}>
        {/* <Menu.Item key="1" icon={<DownloadOutlined />} onClick={downloadImage}>
          Download image
        </Menu.Item> */}
        <Menu.Item key="3" icon={<HeartOutlined />}>
          Add to favorites
        </Menu.Item>

        {user && post && post?.user._id === user._id && (
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            onConfirm={async () => {
              try {
                const response = await deletePost({
                  postId: post?._id,
                  method: "DELETE",
                }).unwrap();
                showMessage("Delete Post Success !");
                navigate("/");
              } catch (error: TError | any) {
                showMessage(error, "error");
              }
            }}
            okType="danger"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Menu.Item
              color="red"
              style={{
                color: "red",
              }}
              onClick={() => {
                //
              }}
              key="4"
              icon={<CloseOutlined color="red" />}
            >
              Delete
            </Menu.Item>
          </Popconfirm>
        )}
      </Menu>
    ),
    [[post?._id]],
  );
  const sendComment = async (comment: CommentForm) => {
    try {
      if (post && user) {
        const response = await commentMutate({
          postId: post._id,
          body: comment,
        }).unwrap();
        reset();
      } else {
        showMessage("Post not found", "error");
      }
      return;
    } catch (error: any) {
      showMessage(error.message, "error");
    }
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CommentForm>({
    resolver: zodResolver(CommentValidatorSchema),
    defaultValues: {
      comment: "",
    },
  });

  const handleCopyClick = React.useCallback(() => {
    navigator.clipboard.writeText(`${API_URL_WEB}/post/${post?._id}`);
    message.info("Share moments with your friends", 2.5);
  }, [post?._id]);

  const handleLike = React.useCallback(async () => {
    if (post?._id && user) {
      try {
        const response: any = await likePost({
          postId: post._id,
        });
        const isLike = response.data?.likes?.includes(user._id);
      } catch (e: any) {
        showMessage(e.message, "error");
      }
    }
  }, [post?._id]);

  /**Form Add Comment*/
  if (isError) {
    navigate("/notFound");
  }
  if (isLoading || isFetching) {
    return <CommonFullLoading />;
  }

  return (
    <MainLayout>
      <div className="w-full max-w-7xl py-4 px-8 h-full bg-white rounded-lg overflow-hidden mx-auto ">
        {post ? (
          <Row gutter={[32, 32]}>
            {/**Post Header */}
            <Col
              span={24}
              sm={24}
              className="flex justify-between bg-white mt-4"
            >
              {/*Uploader*/}
              <Space className="flex items-center justify-between">
                <Space>
                  {post && post.user ? (
                    <CommonAvatar size={48} user={post.user} />
                  ) : (
                    <></>
                  )}
                  <Space direction="vertical" size={2}>
                    <Typography.Text
                      strong
                      className="text-lg text-ellipsis tracking-widest"
                    >
                      {post?.user.fullName}
                    </Typography.Text>
                    <Tooltip title={moment(post.createdAt).fromNow()}>
                      <Typography.Text>
                        {moment(post.createdAt).fromNow()}
                      </Typography.Text>
                    </Tooltip>
                  </Space>
                </Space>
                {/**follow button */}
              </Space>

              <Space>
                {/**Share menu */}
                <Dropdown
                  overlay={shareMenu}
                  trigger={["click"]}
                  placement="bottom"
                >
                  <Button
                    type="primary"
                    shape="circle"
                    className={classStyle["button"]}
                  >
                    <ShareAltOutlined />
                  </Button>
                </Dropdown>
                {/**Copy this post url */}
                {user && (
                  <Button
                    type="primary"
                    shape="circle"
                    className={`${classStyle["button"]}`}
                    onClick={handleCopyClick}
                  >
                    <LinkOutlined />
                  </Button>
                )}
                {/**Like this image */}
                <Button
                  type="text"
                  shape="circle"
                  onClick={handleLike}
                  className={`${classStyle["button"]}`}
                  style={{ padding: "0" }}
                >
                  {user && user._id ? (
                    <LikeAnimation
                      like={post.likes.includes(user && user._id)}
                    />
                  ) : (
                    "Like"
                  )}
                </Button>
                {user && post?.user._id === user._id && (
                  <Button
                    type="ghost"
                    shape="circle"
                    onClick={() => {
                      modalRef?.current?.show(post);
                    }}
                    className={`${classStyle["button"]}`}
                  >
                    <EditOutlined />
                  </Button>
                )}
                {/**More menu */}
                <Dropdown
                  overlay={moreMenu}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <Button
                    type="primary"
                    shape="circle"
                    className={classStyle["button"]}
                  >
                    <EllipsisOutlined />
                  </Button>
                </Dropdown>
              </Space>
            </Col>
            {/**Left pane */}
            <Col
              sm={24}
              lg={12}
              className="sm:max-h-[64rem] lg:max-h-4xl overflow-hidden"
            >
              {/**Post image */}
              <Image
                src={post?.URL || post?.fileName}
                width={"auto"}
                height={"auto"}
                className={classStyle["image"]}
                alt="Mountain image"
              />
            </Col>
            {/* Right pane */}
            <Col sm={24} lg={12} className="sm:max-h-[64rem] lg:max-h-4xl">
              <Row className="h-full">
                {/**Post Body */}
                <Col className="w-full h-full sm:text-center lg:text-left overflow-x-hidden ">
                  <Row gutter={[32, 32]}>
                    {/**Post detail */}
                    <Col span={24}>
                      {/**post title */}
                      <Typography.Title level={2} style={{ fontWeight: "700" }}>
                        {post?.title}
                      </Typography.Title>
                      {/**post content */}
                      <Typography.Paragraph
                        strong
                        className="text-lg text-justify"
                      >
                        {post?.description}
                      </Typography.Paragraph>
                      {/**post categoty */}
                      {post.categories.map((category: any) => {
                        return (
                          <Tag
                            key={category._id}
                            color={getRandomColor()}
                            className="text-base px-2 py-1"
                          >
                            {category.value}
                          </Tag>
                        );
                      })}
                    </Col>
                    {/**Add Comment */}
                    {user && (
                      <Col span={24} className="flex gap-4 mt-12">
                        <div className="w-full flex gap-4">
                          <Avatar
                            size={48}
                            src={user.avatar}
                            alt=""
                            className="shrink-0 bg-[#f56a00]"
                          >
                            {user.fullName}
                          </Avatar>
                          {/**comment input*/}
                          <Form.Item className="w-full mb-0">
                            <Controller
                              control={control}
                              name="comment"
                              render={({ field }) => (
                                <CustomInput2
                                  {...field}
                                  placeholder="Write a comment"
                                  className="grow h-12 rounded-full bg-[#e2e2e2] focus:bg-[white]"
                                  error={errors.comment?.message}
                                />
                              )}
                            />
                          </Form.Item>
                          <Button
                            type="primary"
                            onClick={handleSubmit(sendComment)}
                            shape="circle"
                            className={classStyle["button"]}
                          >
                            <SendOutlined />
                          </Button>
                        </div>
                        {/**User avatar */}
                      </Col>
                    )}
                    {/*Comment section*/}
                    <Col span={24} className="grow flex-col overflow-y-auto">
                      <CommentSection
                        comments={post.comments}
                        style={{ marginBottom: "auto" }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </div>
    </MainLayout>
  );
};

const shareMenu = (
  <Menu>
    <Menu.Item key="1" icon={<FacebookFilled style={{ color: "blue" }} />}>
      Facebook
    </Menu.Item>
    <Menu.Item key="2" icon={<TwitterCircleFilled style={{ color: "blue" }} />}>
      Twitter
    </Menu.Item>
    <Menu.Item key="3" icon={<MailOutlined style={{ color: "red" }} />}>
      Gmail
    </Menu.Item>
  </Menu>
);

const classStyle = {
  button: "w-12 h-12 leading-3 text-base text-[#111] bg-[#e2e2e2] shrink-0",
  image: "w-full h-full object-contain rounded-lg",
};

export default PostDetailScreen;
