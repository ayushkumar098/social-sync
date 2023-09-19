import "scenes/chatPage/styles.scss";
import { Typography, Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { _id } = useSelector((state) => state.user);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const createdAtFromMongoDB = new Date(message.created_at);
  // Create an Intl.DateTimeFormat object with the desired options
  const dateTimeFormatter = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "numeric",
    hour12: false, // Use 24-hour format
    timeZone: "Asia/Kolkata", // Set the time zone to Indian Standard Time
  });
  const formattedTime = dateTimeFormatter.format(createdAtFromMongoDB);

  return (
    <div
      className={`message ${
        message.senderId === _id && "owner"
      }`}
      ref={ref}
      bgcolor="red"
      margin="10px"
      width="fit-content"
      maxWidth="80%"
      p="10px"
      word-wrap="break-word"
    >
      <Typography className="messageContent" variant="h5">
        {message.text}
      </Typography>
      <Typography variant="p" className="messageTime">
        {formattedTime}
      </Typography>
    </div>
  );
};

export default Message;
