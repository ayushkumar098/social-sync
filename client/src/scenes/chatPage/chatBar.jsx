import {  Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import ChatBarItem from "./chatBarItem";

const ChatBar = () => {

  const userChatList = useSelector((state) => state.userChatList);
  //console.log(userChatList.secondSender);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;

  return (
    <Box>
      {userChatList.map((userChatItem) => (
        <ChatBarItem userChatItem={userChatItem}/>
      ))}
    </Box>
  );
};

export default ChatBar;
