import { Typography } from "@mui/material";
import { useEffect, useRef } from "react";


const Message = ({message}) => {
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
      className={`message ${message.fromSelf ? "owner": "nonOwner"}`}
      ref={ref}
      bgcolor="red"
      margin="10px"
      width="fit-content"
      maxwidth="80%"
      p="10px"
      word-wrap="break-word"
    >
      <Typography className="messageContent" variant="h5">
        {message.message}
      </Typography>
      <Typography variant="p" className="messageTime">
        12:30
      </Typography>
    </div>
  );
}

export default Message;
