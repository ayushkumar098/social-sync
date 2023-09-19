import NavbarPage from "scenes/navbar";
import ChatBar from "./chatBar";
import ChatBody from "./chatBody";

import { useDispatch, useSelector } from "react-redux";
import { host } from "utils/APIRoutes";

import { Box, Divider, useTheme } from "@mui/material";
import { useEffect } from "react";
import { setUserChatList } from "state/index";

const ChatPage = () => {
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const theme = useTheme();
  const background = theme.palette.background.alt;

  const getChatList = async() =>{
    const response = await fetch(`${host}/chat/getFriends/${_id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setUserChatList({userChatList: data}));
  }

  useEffect(() => {
    getChatList();
  }, [currentUser]);
  
  return (
    <>
      <NavbarPage />
      <Box
        display="flex"
        backgroundColor={background}
        margin="1rem"
        height="calc( 100vh - 7rem )"
      >
        <Box width="22%">
          <ChatBar />
        </Box>
        <Divider orientation="vertical" />
        <Box width="78%">
          <ChatBody  />
        </Box>
      </Box>
    </>
  );
};

export default ChatPage;
