import {
  CloseOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeFilled,
  FacebookFilled,
  HeartOutlined,
  LeftOutlined,
  LinkOutlined,
  MailOutlined,
  QuestionCircleOutlined,
  SaveOutlined,
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
  Modal,
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
import images from "assets/images/images";
import LikeAnimation from "components/Animation/LikeAnimation";
import CommonAvatar from "components/Avatar/CommonAvatar";
import CommentSection from "components/Comment/CommentSection";
import CustomInput2 from "components/Input/CommonInput2";
import { TError } from "models/Error.interface";
import { Post } from "models/post.interrface";
import moment from "moment";
import { modalRef } from "Provider/GlobalUiContainer";
import * as React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router";
import {
  useCommentPostMutation,
  useLikePostMutation,
  useUpdatePostMutation,
} from "redux/api/postApi";
import { useAppSelector } from "redux/store";
import { getRandomColor } from "utils/randomColor";
import { showMessage } from "utils/toast";
import { CommentForm, CommentValidatorSchema } from "validators/Post.validator";

const PostDetail = React.forwardRef((props: any, ref) => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(true);
  const [deletePost] = useUpdatePostMutation();
  const [commentMutate] = useCommentPostMutation();
  const [isLiked, setIsLiked] = useState(false);
  const [likePost, { isLoading, isSuccess }] = useLikePostMutation();
  const [post, setPost] = useState<Post>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  /**Form Add Comment*/
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
  const sendComment = async (comment: CommentForm) => {
    try {
      if (post && user) {
        const response = await commentMutate({
          postId: post._id,
          body: comment,
        }).unwrap();
        setPost(response);
        reset();
      } else {
        showMessage("Post not found", "error");
      }
      return;
    } catch (error: any) {
      showMessage(error.message, "error");
    }
  };
  React.useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  const show = (value: Post) => {
    setPost(value);
    if (user) {
      setIsLiked(value?.likes?.includes(user._id));
    }
    setIsModalOpen(true);
  };

  const hide = () => {
    setIsModalOpen(false);
  };
  const moreMenu = React.useMemo(
    () => (
      <Menu style={{ fontSize: "20px" }}>
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
                hide();
                showMessage("Delete Post Success !");
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
    [[post]],
  );
  const handleLike = React.useCallback(async () => {
    if (post?._id && user) {
      try {
        const response: any = await likePost({
          postId: post._id,
        });
        const isLike = response.data?.likes?.includes(user._id);
        setIsLiked(isLike);
      } catch (e: any) {
        showMessage(e.message, "error");
      }
    }
  }, [post?._id]);
  const handleCopyClick = React.useCallback(() => {
    // navigator.clipboard.writeText(`${API_URL_WEB}/post/${post?._id}`);
    // message.info("Share moments with your friends", 2.5);
    navigate(`/post/${post?._id}`);
  }, [post?._id]);

  return (
    <Modal
      onCancel={hide}
      open={isModalOpen}
      width={1280}
      centered
      closable={false}
      footer={false}
    >
      {post ? (
        <Row className="sm:gap-4 lg:gap-0">
          {/**Left pane */}
          <Col
            sm={24}
            lg={12}
            className="sm:max-h-[54rem] lg:h-[92vh] rounded-lg overflow-hidden grid grid-cols-1 place-items-stretch"
          >
            {/**Post image */}
            {/* <Image
              src={post?.URL || post?.fileName}
              width={"100%"}
              height={"100%"}
              className={classStyle["image"]}
              alt="Mountain image"
            /> */}

            <LazyLoadImage
              src={post?.URL || post?.fileName}
              alt={post.title}
              effect="blur"
              className="rounded-lg w-full h-full  "
            />
            {/**Go back */}
            <Button
              type="primary"
              shape="circle"
              onClick={() => {
                hide();
              }}
              className={`${classStyle["button"]} absolute left-4 top-4`}
            >
              <LeftOutlined />
            </Button>
          </Col>
          {/* Right pane */}
          <Col sm={24} lg={12}>
            <Row className="h-full sm:pl-0 lg:pl-8">
              {/**Post Header */}
              <Col
                sm={24}
                className="flex justify-between sticky top-0 left-0 z-10 h-16 bg-white"
              >
                <Space>
                  {/**Share menu */}
                  <Dropdown
                    overlay={shareMenu}
                    trigger={["click"]}
                    placement="bottomLeft"
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
                  <Button
                    type="primary"
                    shape="circle"
                    className={`${classStyle["button"]}`}
                    onClick={handleCopyClick}
                  >
                    <EyeFilled />
                  </Button>
                  {/**Like this image */}
                  {user && (
                    <Button
                      type="text"
                      shape="circle"
                      onClick={handleLike}
                      className={`${classStyle["button"]}`}
                      style={{ padding: 0 }}
                    >
                      <LikeAnimation like={isLiked} />
                    </Button>
                  )}
                  {user && post?.user._id === user._id && (
                    <Button
                      type="ghost"
                      shape="circle"
                      onClick={() => {
                        modalRef?.current?.show(post);
                        hide();
                      }}
                      className={`${classStyle["button"]}`}
                    >
                      <EditOutlined />
                    </Button>
                  )}
                </Space>
                <Space>
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
              {/**Post Body */}
              <Col className="w-full sm:h-full lg:h-[80vh] overflow-x-hidden lg:overflow-y-auto scrollbar-hide">
                <Row gutter={[32, 32]}>
                  {/**Post detail */}
                  <Col span={24}>
                    {/**post title */}
                    <Typography.Title level={2} style={{ fontWeight: "700" }}>
                      {post?.title}
                    </Typography.Title>
                    {/**post content */}
                    <Typography.Paragraph strong className="text-lg">
                      {post?.description}
                    </Typography.Paragraph>
                    {/**post categoty */}
                    {post.categories.map((category: any) => {
                      return (
                        <Tag
                          key={category._id}
                          color={getRandomColor()}
                          onClick={() => {
                            navigate(`/${category.value}`);
                          }}
                          className="text-base px-2 py-1"
                        >
                          {category.value}
                        </Tag>
                      );
                    })}
                  </Col>
                  {/*Uploader*/}
                  <Col span={24} className="flex items-center justify-between">
                    <Space>
                      {post && post.user ? (
                        <CommonAvatar size={42} user={post.user} />
                      ) : (
                        <></>
                      )}
                      <Space direction="vertical" size={2}>
                        <Typography.Text strong className="text-lg">
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
                    {isFollow ? (
                      <Button type="primary" size="large" danger>
                        Following
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        size="large"
                        className="bg-[#1677ff]"
                      >
                        Follow
                      </Button>
                    )}
                  </Col>
                  {/**Add Comment */}
                  {user && (
                    <Col span={24} className="flex mt-12">
                      <div className="w-full flex  gap-2">
                        <CommonAvatar style={{}} size={48} user={user} />
                        {/**comment input*/}
                        <Form.Item className="w-full">
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
                  <Col span={24} className="grow flex-col justify-between">
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
    </Modal>
  );
});

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
  button: "w-12 h-12 leading-3 text-base text-[#111] bg-[#e2e2e2] ",
  image: " object-center ",
};

export default PostDetail;
