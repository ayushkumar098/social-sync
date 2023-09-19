import { Box, useTheme, InputBase, IconButton } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Send } from "@mui/icons-material";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import { host } from "utils/APIRoutes";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "state/index";

const ChatInput = () => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const { sender } = useSelector((state) => state.currentUser);
  const theme = useTheme();
  const dispatch = useDispatch();
  const inputColor = theme.palette.neutral.light;
  const [message, setMessage] = useState("");
  const [isEmojiVisible, setIsEmojiVisible] = useState(false);

  // add emoji
  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setMessage(message + emoji);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if(!message.length){
        return;
    }
    const combinedId =
      sender.userId > user._id
        ? sender.userId + user._id
        : user._id + sender.userId;
    const messageBody = {
      conversationId: combinedId,
      senderId: user._id,
      text: message,
    };
    const response = await fetch(`${host}/chat/addNewMessage`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });
    var data = await response.json();
    if (data.firstSender.userId === user._id) {
      const { firstSender, ...rest } = data;
      data = { ...rest, sender: { ...data.secondSender } };
    } else {
      const { secondSender, ...rest } = data;
      data = { ...rest, sender: { ...data.firstSender } };
    }
    dispatch(setCurrentUser({ currentUser: data }));
    setMessage("");
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSendMessage(e);
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
          onClick={handleSendMessage}
          sx={{ fontSize: "2rem", margin: "0 0.7rem" }}
        />
      </Box>
    </Box>
  );
};

export default ChatInput;
