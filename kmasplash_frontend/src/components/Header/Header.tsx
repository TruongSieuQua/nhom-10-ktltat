import { Avatar, Dropdown, Menu } from "antd";
import images from "assets/images/images";
import CommonAvatar from "components/Avatar/CommonAvatar";
import DropdownSearch from "components/Dropdown/DropdownSearch";
import withAuthReducerHOC from "HOC/withAuthReducerHOC";
import { TError } from "models/Error.interface";
import { modalRef } from "Provider/GlobalUiContainer";
import React from "react";
import { useNavigate } from "react-router";
import { useLogOutMutation } from "redux/api/authApi";
import { AuthState, signOut } from "redux/slices/authSlice";
import { useAppDispatch } from "redux/store";
import styled from "styled-components";
import { showMessage } from "utils/toast";
const { Item } = Menu;

function Header({ auth }: { auth: AuthState }): JSX.Element {
  const navigate = useNavigate();
  const { isSignedIn, user } = auth;
  const [logOutMutation, logOutMutationResult] = useLogOutMutation();
  const dispatch = useAppDispatch();
  const menu = React.useMemo(
    () => (
      <Menu>
        <Menu.Item
          key={0}
          onClick={() => {
            if (user) {
              navigate(`/profile/${user._id}`);
            }
          }}
        >
          View Profile
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            if (user) {
              navigate("/account");
            }
          }}
          key={1}
        >
          Account Settings
        </Menu.Item>
        <Menu.Item
          key={2}
          onClick={async () => {
            try {
              const response = await logOutMutation(null).unwrap();
              dispatch(signOut());
              showMessage("Log out successfully");
            } catch (error: TError | any) {
              showMessage(error.data.message, "error");
            }
          }}
        >
          Log Out
        </Menu.Item>
      </Menu>
    ),
    [],
  );
  return (
    <div className="flex justify-between items-center gap-3 h-16 ">
      <Avatar
        size={48}
        style={{}}
        src={images.loginIcon}
        className="shrink-0"
        onClick={() => {
          navigate("/");
        }}
      />

      <DropdownSearch />

      <Menu
        mode="horizontal"
        multiple
        className="w-1/4 border-none bg-transparent"
      >
        <MenuItem className="text-grey-100 font-medium" key="explore">
          Explore
        </MenuItem>

        {isSignedIn ? (
          <MenuItem
            className="text-grey-100 font-medium border rounded-lg "
            key="submit"
            onClick={() => {
              modalRef?.current?.show();
            }}
          >
            Submit a photo
          </MenuItem>
        ) : (
          <MenuItem
            className="text-grey-100 font-medium border rounded-lg "
            key="login"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </MenuItem>
        )}
      </Menu>
      {isSignedIn && user && (
        <Dropdown overlay={menu} key={6} trigger={["hover"]}>
          <CommonAvatar user={user} className="shrink-0 my-auto bg-[#f56a00]" />
        </Dropdown>
      )}
    </div>
  );
}

const MenuItem = styled(Item)``;

export default withAuthReducerHOC(styled(Header)``);
