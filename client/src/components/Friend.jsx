import { PersonAddOutlined, PersonRemoveOutlined, PlayLesson } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setNotFriends, setPosts } from "state/index";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { host } from "utils/APIRoutes";
import { useState } from "react";

const Friend = ({ friendId, name, subtitle, userPicturePath, postId }) => {
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
  const hoverBackground = palette.background.default;
  const background = palette.neutral.light;

  const isFriend = friends.find((friend) => friend._id === friendId);
  const isMyPost = friendId === user._id ? true : false;

   const [toggleDelete, setToggleDelete] = useState(false);

   const handleDeleteToggle = () => {
     setToggleDelete(!toggleDelete);
   };

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

    const notResponse = await fetch(`${host}/users/${user._id}/notFriends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const notData = await notResponse.json();
    console.log(notData);
    dispatch(setNotFriends({ notFriends: notData }));
  };

  const deletePost = async () => {
    const response = await fetch(`${host}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    dispatch(setPosts({ posts: data }));
  };

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
        {!isMyPost && (
          <IconButton
            onClick={() => patchFriend()}
            sx={{
              backgroundColor: primaryLight,
              p: "0.6rem",
            }}
          >
            {isFriend ? (
              <PersonRemoveOutlined sx={{ color: primaryDark }} />
            ) : (
              <PersonAddOutlined sx={{ color: primaryDark }} />
            )}
          </IconButton>
        )}
      </FlexBetween>

      {isMyPost && postId && (
        <Box
          sx={{
            position: "relative",
          }}
        >
          <IconButton>
            <MoreVertIcon
              onClick={handleDeleteToggle}
              sx={{ fontSize: "25px" }}
            />
          </IconButton>
          {toggleDelete && (
            <Box
              sx={{
                width: "fit-content",
                whiteSpace: "nowrap",
                position: "absolute",
                top: "100%",
                right: "10%",
                zIndex: "12",
              }}
            >
              <Box
                onClick={() => deletePost()}
                sx={{
                  padding: "0.5rem 1rem",
                  //border: "solid black 1px",
                  borderRadius: "4px",
                  backgroundColor: background,
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: hoverBackground,
                  },
                }}
              >
                <Typography variant="h5" fontWeight="300">
                  <DeleteIcon /> Delete Post
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </FlexBetween>
  );
};

export default Friend;
