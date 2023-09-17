import { Typography, Box, Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "state/index";

const ChatBarItem = ({ userChatItem }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentUser({ currentUser : userChatItem}));
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        sx={{ "&:hover": { cursor: "pointer" } }}
        onClick={handleClick}
      >
        <img
          src={userChatItem.sender.picturePath}
          style={{
            width: "4rem",
            height: "4rem",
            margin: "1rem",
            borderRadius: "50%",
          }}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap=".4rem"
        >
          <Typography variant="h4">{userChatItem.sender.name}</Typography>
          <Typography variant="p5">Friends Last Text</Typography>
        </Box>
      </Box>
      <Divider variant="middle" />
    </>
  );
};

export default ChatBarItem;
