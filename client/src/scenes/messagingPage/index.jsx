import { Box, Divider } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { host } from "utils/APIRoutes";
import Contacts from "./contacts";
import Welcome from "components/Welcome";
import ChatContainer from "./chatContainer";
import NavbarPage from "scenes/navbar";
import { useTheme } from "@emotion/react";
import { io } from "socket.io-client";

const MessagingPage = () => {
  const socket = useRef();
  const theme = useTheme();
  const background = theme.palette.background.alt;
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const currentChat = useSelector((state) => state.currentChat);
  console.log(currentChat);
  const [contacts, setContacts] = useState([]);
  //const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(()=>{
    socket.current = io(host);
    socket.current.emit("add-user",user._id)
  },[])
  
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const response = await fetch(`${host}/chat/getusers/${user._id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setContacts(data);
      }
    };
    fetchData();
  }, []);

  // const handleChatChange = (chat) => {
  //   setCurrentChat(chat);
  // };

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
          {/* <Contacts contacts={contacts} changeChat={handleChatChange} /> */}
          <Contacts contacts={contacts}  />
        </Box>
        <Divider orientation="vertical" />
        <Box width="78%">
          {currentChat === null ? (
            <Welcome />
          ) : (
            //<ChatContainer currentChat={currentChat} socket={socket} />
            <ChatContainer socket={socket} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default MessagingPage;
