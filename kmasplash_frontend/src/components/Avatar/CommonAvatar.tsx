import { Avatar } from "antd";
import { AvatarProps } from "antd/es/skeleton/Avatar";
import { User } from "models/auth.interface";
import React from "react";
import { useNavigate } from "react-router";

interface AvatarCommonProps extends AvatarProps {
  user: User;
  action?: () => void;
  source?: string;
}

const CommonAvatar: React.FC<AvatarCommonProps> = ({
  user,
  action,
  source,
  ...props
}) => {
  const navigate = useNavigate();
  return (
    <Avatar
      src={source || user.avatar}
      style={
        props.style || {
          verticalAlign: "middle",
          alignSelf: "center",
        }
      }
      className={`bg-[#f56a00] ${props.className}`}
      size="large"
      gap={1}
      onClick={() => {
        if (action) {
          action();
        } else {
          navigate(`/profile/${user._id}`);
        }
      }}
      {...props}
    >
      {user.fullName}
    </Avatar>
  );
};

export default CommonAvatar;
