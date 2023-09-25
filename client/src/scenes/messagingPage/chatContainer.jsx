import { Typography, Box, useTheme } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FlexBetween from "components/FlexBetween";
import ChatInput from "./chatInput";
import Message from "./message";
import { useDispatch, useSelector } from "react-redux";
import { host } from "utils/APIRoutes";
import { useEffect, useState } from "react";
import { setNotification } from "state";
import { useNavigate } from "react-router-dom";

const ChatContainer = ({ currentChat, socket }) => {
  //const currentChat = useSelector((state) => state.currentChat);
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const background = theme.palette.neutral.light;
  const primaryLight = theme.palette.primary.light;

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  // useEffect(() =>{
  //   console.log("---------"+currentChat._id);
  // },[currentChat]);

  useEffect(() => {
    const getMessages = async () => {
      const messageBody = {
        from: _id,
        to: currentChat._id,
      };
      const response = await fetch(`${host}/chat/getmsg`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageBody),
      });
      const data = await response.json();
      setMessages(data);
    };
    getMessages();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const messageBody = {
      from: _id,
      to: currentChat._id,
      message: msg,
    };
    await fetch(`${host}/chat/addmsg`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });
    //const data = await response.json();
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: _id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({
          fromSelf: false,
          from: msg.from,
          message: msg.message,
        });
      });
    }
  }, [socket.current]);

  useEffect(() => {
    if (arrivalMessage) {
      if (arrivalMessage.from === currentChat._id) {
        setMessages((prev) => [...prev, arrivalMessage]);
      } else {
        console.log("notification");
        dispatch(setNotification({notification: arrivalMessage}));
        //dispatch(setNotification({notification: [arrivalMessage, ...notification]}));
      }
    }
    //arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

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
            src={currentChat.picturePath}
            style={{
              width: "4rem",
              height: "4rem",
              borderRadius: "50%",
            }}
          />
          <Typography
            onClick={() => navigate(`/profile/${currentChat._id}`)}
            sx={{
              pl: "1rem",
              "&:hover": {
                cursor: "pointer",
                color: primaryLight,
              },
            }}
            variant="h3"
          >
            {currentChat.firstName}
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
        {messages.map((message, index) => (
          <Message message={message} key={index} />
        ))}
      </Box>

      <ChatInput handleSendMsg={handleSendMsg} />
    </Box>
  );
};

export default ChatContainer;
