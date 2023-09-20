import { Box, useTheme, InputBase, IconButton } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Send } from "@mui/icons-material";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import { host } from "utils/APIRoutes";

const ChatInput = ({ handleSendMsg }) => {
  const theme = useTheme();
  const inputColor = theme.palette.neutral.light;
  const [isEmojiVisible, setIsEmojiVisible] = useState(false);
  const [message, setMessage] = useState("");

  // add emoji
  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setMessage(message + emoji);
  };

  const sendChat = async (event) => {
    event.preventDefault();
    if (message.length > 0) {
      handleSendMsg(message);
      setMessage("");
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && sendChat(e);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      maxHeight="1rem"
    >
      <IconButton onClick={() => setIsEmojiVisible(!isEmojiVisible)}>
        <EmojiEmotionsIcon sx={{ fontSize: "2rem", margin: "0 0.7rem" }} />
      </IconButton>
      {isEmojiVisible && (
        <Box sx={{ position: "absolute", bottom: "10%", marginLeft: "10px" }}>
          <Picker
            data={data}
            emojiSize={30}
            emojiButtonSize={35}
            onEmojiSelect={addEmoji}
            maxFrequentRows={0}
          />
        </Box>
      )}
      <InputBase
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onKeyDown={handleKey}
        placeholder="What's on your mind..."
        sx={{
          width: "100%",
          backgroundColor: inputColor,
          borderRadius: "10px",
          padding: ".5rem 2rem",
          fontSize: "1rem",
        }}
      />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Send
          onClick={sendChat}
          sx={{ fontSize: "2rem", margin: "0 0.7rem" }}
        />
      </Box>
    </Box>
  );
};

export default ChatInput;
