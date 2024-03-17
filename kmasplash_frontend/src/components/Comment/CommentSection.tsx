import { Comment as AntdComment } from "@ant-design/compatible";
import { List, Tooltip } from "antd";
import images from "assets/images/images";
import { Comment } from "models/post.interrface";
import moment from "moment";
import React, { ComponentProps } from "react";

interface CommentSectionProps extends ComponentProps<"div"> {
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = (props) => {
  const { comments, ...restProps } = props;

  return (
    <List
      className="comment-list overflow-y-auto"
      header={`${comments.length} replies`}
      itemLayout="horizontal"
      dataSource={comments}
      {...restProps}
      renderItem={(comment) => (
        <AntdComment
          //actions={item}
          datetime={
            <Tooltip title={moment(comment.createdAt).fromNow()}>
              <span>{moment(comment.createdAt).fromNow()}</span>
            </Tooltip>
          }
          className="text-base"
          author={comment?.user?.fullName}
          avatar={comment?.user?.avatar || images.avatar}
          content={comment?.comment}
        />
      )}
    />
  );
};

export default CommentSection;
