import { UserProfile } from "./userProfile";
import { Navbar } from "./navbar";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Posts } from "./posts";
import { NewPost } from "./newPost";
import { useState, useEffect } from "react";
import { host } from "utils/APIRoutes";
import { useNavigate } from "react-router-dom";

const GeneralPage = () => {
  const navigate = useNavigate();
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const response = await fetch(`${host}/users`, {
      method: "GET",
    });
    const data = await response.json();
    setUsers(data);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  return (
    <Box>
      {/* NAVBAR */}
      <Navbar handleClickOpen={handleClickOpen} />

      {/* HOME */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* USER PROFILE */}
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserProfile />
        </Box>

        <Box
          flexBasis={isNonMobileScreen ? "50%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          {/* NEW POST */}
          <NewPost handleClickOpen={handleClickOpen} />
          {/* ALL POST */}
          <Posts handleClickOpen={handleClickOpen} />
        </Box>

        {/* ALL USERS */}
        {isNonMobileScreen && (
          <Box flexBasis="18%">
            <Typography variant="h3" fontWeight="500">
              USERS
            </Typography>
            <br></br>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <AvatarGroup
                max={5}
                sx={{
                  "& .MuiAvatar-root": {
                    width: "4rem",
                    height: "4rem",
                    fontSize: 25,
                  },
                }}
              >
                {users.map((user) => (
                  <Avatar src={user.picturePath} />
                ))}
              </AvatarGroup>
            </Box>
          </Box>
        )}
      </Box>

      {/* DIALOGUE Box  */}
      <Dialog
        open={open}
        //TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
      >
        <Box
          sx={{
            right: "0",
            display: "flex",
            flexDirection: "row-reverse",
            margin: "1rem 1rem 0 0",
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </Box>
        <DialogTitle sx={{ fontSize: "1.5rem" }}>
          {"Please Login To Continue!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ fontSize: "1rem" }}
          >
            To access our array of features and enjoy a personalized experience,
            kindly log in using your existing account or register if you're new.
            By signing in or creating a new account, you'll unlock "Messaging",
            "Posting" and several other features.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="large" onClick={handleNavigateToLogin}>
            Login
          </Button>
          <Button size="large" onClick={handleNavigateToLogin}>
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GeneralPage;
