import { useEffect, useState } from "react";
import { host } from "utils/APIRoutes";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  ShareOutlined,
  PersonAddOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";

export const Posts = ({ handleClickOpen }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await fetch(`${host}/posts`, {
      method: "GET",
    });
    const data = await response.json();
    setPosts(data);
  };
  useEffect(() => {
    getPosts();
  }, []);

  const handleClick = () => {
    handleClickOpen();
  };

  return (
    <>
      {posts.map(
        ({
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
        }) => (
          <WidgetWrapper m="2rem 0">
            <FlexBetween>
              <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box>
                  <Typography
                    onClick={handleClick}
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
                    {firstName} {lastName}
                  </Typography>
                  <Typography color={medium} fontSize="0.75rem">
                    {location}
                  </Typography>
                </Box>
              </FlexBetween>
              <IconButton
                sx={{
                  backgroundColor: primaryLight,
                  p: "0.6rem",
                }}
              >
                <PersonAddOutlined
                  onClick={handleClick}
                  sx={{ color: primaryDark }}
                />
              </IconButton>
            </FlexBetween>

            <Typography color={main} sx={{ mt: "1rem", cursor: "pointer" }}>
              {description}
            </Typography>
            {picturePath && (
              <img
                width="100%"
                height="auto"
                cursor="pointer"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                src={picturePath}
              />
            )}
            <FlexBetween mt="0.25rem">
              <FlexBetween gap="1rem">
                <FlexBetween gap="0.3rem">
                  <IconButton>
                    <FavoriteBorderOutlined onClick={handleClick} />
                  </IconButton>
                  <Typography>{Object.keys(likes).length}</Typography>
                </FlexBetween>

                <FlexBetween gap="0.3rem">
                  <IconButton>
                    <ChatBubbleOutlineOutlined onClick={handleClick} />
                  </IconButton>
                  <Typography>{comments.length}</Typography>
                </FlexBetween>
              </FlexBetween>

              <IconButton>
                <ShareOutlined />
              </IconButton>
            </FlexBetween>
          </WidgetWrapper>
        )
      )}
    </>
  );
};
