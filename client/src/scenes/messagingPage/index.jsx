import { Box, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { host } from "utils/APIRoutes";
import Contacts from "./contacts";
import Welcome from "components/Welcome";
import ChatContainer from "./chatContainer";
import NavbarPage from "scenes/navbar";
import { useTheme } from "@emotion/react";

const MessagingPage = () => {
  const theme = useTheme();
  const background = theme.palette.background.alt;
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  
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

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

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
          <Contacts contacts={contacts} changeChat={handleChatChange} />
        </Box>
        <Divider orientation="vertical" />
        <Box width="78%">
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default MessagingPage;
