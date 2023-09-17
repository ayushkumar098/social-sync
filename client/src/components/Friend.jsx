import {
  PersonAddOutlined,
  PersonRemoveOutlined,
  Message,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setCurrentUser } from "state/index";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { host } from "utils/APIRoutes";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(`${host}/users/${user._id}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  // const combinedId =
  //     currentUser.uid > user.uid
  //       ? currentUser.uid + user.uid
  //       : user.uid + currentUser.uid;

  const goToChat = async() => {
    const combinedId =
      friendId > user._id ? friendId + user._id : user._id + friendId;
    const fullName = `${user.firstName} ${user.lastName}`;
    const body = {
      conversationId: combinedId,
      firstSender: {
        userId: user._id,
        name: fullName,
        picturePath: user.picturePath,
      },
      secondSender: {
        userId: friendId,
        name: name,
        picturePath: userPicturePath,
      },
    };

    const response = await fetch(`${host}/chat/createChat`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    var data = await response.json();

    if (data.firstSender.userId === user._id) {
      // Omit firstSender
      const { firstSender, ...rest } = data;
      data = { ...rest, sender: { ...data.secondSender } };
    } else {
      // Omit secondSender
      const { secondSender, ...rest } = data;
      data = { ...rest, sender: { ...data.firstSender } };
    }
    dispatch(setCurrentUser({ currentUser: data }));
    navigate("/message");
  }

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      <IconButton onClick={() => goToChat()}>
        <Message />
      </IconButton>

      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
