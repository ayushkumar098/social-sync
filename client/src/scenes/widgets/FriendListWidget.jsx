
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setNotFriends } from "state/index";
import { host } from "utils/APIRoutes";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const neutralLight = palette.neutral.light;
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const notFriends = useSelector((state) => state.user.notFriends);

  const getFriends = async () => {
    const response = await fetch(`${host}/users/${userId}/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  const getNotFriends = async () => {
    const response = await fetch(`${host}/users/${userId}/notFriends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setNotFriends({ notFriends: data }));
  };

  useEffect(() => {
    getFriends();
    getNotFriends();
  }, []);

  return (
    <WidgetWrapper>

      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ m: "1.5rem 0" }}
      >
        Friends
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
      {notFriends && (
        <>
          <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{ m: "1.5rem 0" }}
          >
            Other Users
          </Typography>

          <Box display="flex" flexDirection="column" gap="1.5rem">
            {notFriends &&
              notFriends.map((friend) => (
                <Friend
                  key={friend._id}
                  friendId={friend._id}
                  name={`${friend.firstName} ${friend.lastName}`}
                  subtitle={friend.occupation}
                  userPicturePath={friend.picturePath}
                />
              ))}
          </Box>
        </>
      )}
    </WidgetWrapper>
  );
};

export default FriendListWidget;
