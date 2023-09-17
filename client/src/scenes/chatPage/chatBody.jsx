import { Typography, Box, useTheme, InputBase } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Send } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import Message from "./message";
import { useState } from "react";
import { useSelector } from "react-redux";

const ChatBody = () => {

  const currentUser = useSelector((state) => state.currentUser);
  const theme = useTheme();
  const background = theme.palette.neutral.light;
  const inputColor = theme.palette.neutral.light;

  

  const [message, setMessage] = useState("");
  const handleSendMessage = (e) => {
    e.preventDefault();
    setMessage("");
  };


  return (
    <Box display="flex" flexDirection="column">
      <FlexBetween
        padding=".5rem 0"
        paddingLeft="1rem"
        backgroundColor={background}
        max-height="5rem"
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <img
          src={currentUser.sender.picturePath}
            style={{
              width: "4rem",
              height: "4rem",
              borderRadius: "50%",
            }}
          />
          <Typography variant="h3" pl="1rem">
            {currentUser.sender.name}
          </Typography>
        </Box>
        <MoreVertIcon
          fontSize="large"
          sx={{
            mr: "2rem",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
      </FlexBetween>

      <Box overflow="auto" height="calc(100vh - 14rem)">
        <Message text="hgwevcf fdeyfde fge" />
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        maxHeight="1rem"
      >
        <EmojiEmotionsIcon sx={{ fontSize: "2rem", margin: "0 0.7rem" }} />
        <InputBase
          placeholder="What's on your mind..."
          sx={{
            width: "100%",
            backgroundColor: inputColor,
            borderRadius: "10px",
            padding: ".5rem 2rem",
          }}
        />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Send
            onClick={handleSendMessage}
            sx={{ fontSize: "2rem", margin: "0 0.7rem" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBody;
