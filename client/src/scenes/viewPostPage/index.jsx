import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  Send,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  InputBase,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setViewPostUser } from "state";
import Navbar from "scenes/navbar";

const ViewPostPage = () => {
  const postData = useSelector((state) => state.viewPostUser);
  //console.log(postData);

  const {
    _id,
    userId,
    firstName,
    lastName,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  } = postData;
  const name = `${firstName} ${lastName}`;

  // const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  //const loggedInUserId = useSelector((state) => state.user._id);
  const loggedInUser = useSelector((state)=>state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 700px)");
  const isLiked = Boolean(likes[loggedInUser._id]);
  const likeCount = Object.keys(likes).length;
  const [comment, setComment] = useState("");

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  // useEffect(async () => {

  //   const response = await fetch(`http://localhost:3001/posts/${_id}/like`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ commentUserIds: comments }),
  //   });
  // }, []);

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${_id}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUser._id }),
    });
    const updatedPost = await response.json();
    dispatch(setViewPostUser({ viewPostUser: updatedPost }));
  };

  const submitComment = async () => {
    if (comment === "") return;

    const commentBody = {
      userId: loggedInUser._id,
      commentText: comment,
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      picturePath: loggedInUser.picturePath,
    };
    const response = await fetch(`http://localhost:3001/posts/${_id}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentBody),
    });
    const updatedPost = await response.json();
    setComment("");
    dispatch(setViewPostUser({ viewPostUser: updatedPost }));
  };

  return (
    <Box>
      <Navbar />
      <WidgetWrapper
        m="1rem 0"
        width={isNonMobileScreens ? "50%" : "100%"}
        marginLeft={isNonMobileScreens ? "25%" : undefined}
      >
        <Friend
          friendId={userId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <Typography variant="h4" color={main} sx={{ mt: "1rem", cursor: "pointer" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}

        <FlexBetween gap="0.3rem">
          <FlexBetween>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <InputBase
            placeholder="Comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            sx={{
              ml: "4%",
              width: "80%",
              backgroundColor: palette.neutral.light,
              borderRadius: "1rem",
              padding: ".2rem 1rem",
            }}
          />
          <IconButton
            sx={{
              mr: "3%",
            }}
          >
            <Send onClick={submitComment} />
          </IconButton>
        </FlexBetween>

        <Box>
          {comments.map((comment, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="left"
              margin=".6rem 0"
              width="100%"
            >
              <Box display="flex" alignItems="center" justifyContent="center" marginBottom="0.4rem" flex="1">
                <img
                  src={`http://localhost:3001/assets/${comment.commenterPicturePath}`}
                  style={{
                    borderRadius: "50%",
                    width: "2.5rem",
                    height: "2.5rem",
                  }}
                />
              </Box>
              <Box marginLeft="1rem" flex="8">
                <Typography
                  variant="h6"
                  sx={{ color: main }}
                >{`${comment.commenterFirstName} ${comment.commenterLastName}`}</Typography>
                <Typography variant="h5" sx={{overflowWrap: "break-word"}}>{comment.commentText}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* {isComments && (
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )} */}
      </WidgetWrapper>
    </Box>
  );
};

export default ViewPostPage;
