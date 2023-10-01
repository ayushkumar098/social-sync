import { Typography, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";
import "./styles.scss";

const Message = ({ message }) => {
  const theme = useTheme();
  const background = theme.palette.neutral.light;
  const ownerBackground = theme.palette.primary.light;
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      className={`message ${message.fromSelf ? "owner" : "nonOwner"}`}
      ref={ref}
      margin="10px"
      width="fit-content"
      maxwidth="80%"
      p="10px"
      word-wrap="break-word"
    >
      <Typography className="messageContent" variant="h5" color="white">
        {message.message}
      </Typography>
      <Typography variant="p" className="messageTime">
        {/* {message.time} */}
      </Typography>
    </div>
  );
};

export default Message;
 // if (message.fromSelf) {
  //   return (
  //     <Box
  //       display="flex"
  //       flexDirection="column"
  //       margin="20px"
  //       ref={ref}
  //       width="fit-content"
  //       maxwidth="80%"
  //       p="10px"
  //     >
  //       <Typography
  //         variant="h5"
  //         maxWidth="80%"
  //         padding="10px 20px"
  //         borderRadius="0px 10px 10px 10px"
  //         wordWrap="break-word"
  //         width="fit-content"
  //         sx={{backgroundColor: ownerBackground}}
  //       >
  //         {message.message}
  //       </Typography>
  //       <Typography variant="p">{/* {message.time} */}</Typography>
  //     </Box>
  //   );
  // } else {
  //   return (
  //     <Box
  //       display="flex"
  //       flexDirection="column"
  //       margin="20px"
  //       ref={ref}
  //       width="fit-content"
  //       maxwidth="80%"
  //       p="10px"
  //       alignItems="flex-end"
  //     >
  //       <Typography
  //         variant="h5"
  //         maxWidth="80%"
  //         padding="10px 20px"
  //         borderRadius="10px 0px 10px 10px"
  //         wordWrap="break-word"
          
  //         sx={{ backgroundColor: "#fff", width:"fit-content" }}
  //       >
  //         {message.message}
  //       </Typography>
  //       <Typography variant="p">{/* {message.time} */}</Typography>
  //     </Box>
  //   );
  // }