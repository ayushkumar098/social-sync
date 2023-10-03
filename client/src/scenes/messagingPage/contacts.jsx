import { useState } from "react";
import { Typography, Box, Divider, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

const Contacts = ({ contacts, changeChat }) => {
  const theme = useTheme();
  const chatNotification = theme.palette.primary.main;

  const notifications = useSelector((state) => state.notification);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (contact, index) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {contacts.map((contact, index) => {
        const uniqueNotifications = {};
        // Iterate through the notifications array
        notifications.forEach((notification) => {
          // Check if the notification's 'from' property matches the 'userId'
          if (notification.from === contact._id) {
            // Store the notification in the uniqueNotifications object with its id as the key
            uniqueNotifications[notification.msgId] = notification;
          }
        });
        // Convert the uniqueNotifications object back to an array
        const uniqueNotificationsArray = Object.values(uniqueNotifications);

        return (
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
                flexDirection="row"
                alignItems="center"
                width="10rem"
                justifyContent="space-between"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  gap=".4rem"
                >
                  <Typography variant="h4">{contact.firstName}</Typography>
                  {/* <Typography variant="p5">Friends Last Text</Typography> */}
                </Box>
                <Box>
                  {uniqueNotificationsArray.length > 0 && (
                    <Typography
                      sx={{
                        display: "inline-block",
                        backgroundColor: chatNotification,
                        color: "white",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        textAlign: "center",
                        lineHeight: "30px",
                      }}
                    >
                      {uniqueNotificationsArray.length}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
            <Divider variant="middle" />
          </Box>
        );
      })}
    </>
  );
};
export default Contacts;
