import { useState } from "react";
import { Typography, Box, Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCurrentChat } from "state";

const Contacts = ({ contacts, changeChat }) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (contact, index) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  // const dispatch = useDispatch();

  // const changeCurrentChat = (contact,index)=>{
  //   dispatch(setCurrentChat({currentChat: contact}));
  // }

  return (
    <>
      {contacts.map((contact, index) => (
        <Box key={contact._id}>
          <Box
            onClick={() => changeCurrentChat(contact, index)}
            display="flex"
            flexDirection="row"
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <img
              src={contact.picturePath}
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
              <Typography variant="h4">{contact.firstName}</Typography>
              <Typography variant="p5">Friends Last Text</Typography>
            </Box>
          </Box>
          <Divider variant="middle" />
        </Box>
      ))}
    </>
  );
};
export default Contacts;
