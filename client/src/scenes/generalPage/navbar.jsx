import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  FormControl,
  useTheme,
  useMediaQuery,
  Divider,
  Button,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Menu,
  Close,
} from "@mui/icons-material";
import { setMode } from "state/index";

import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { useDispatch } from "react-redux";

export const Navbar = ({ handleClickOpen }) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  const dispatch = useDispatch();
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const handleClick = () => {
    handleClickOpen();
  };

  return (
    <>
      <FlexBetween padding="1rem 6%" backgroundColor={alt} maxHeight="5rem">
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/")}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            SocialSync
          </Typography>
        </FlexBetween>

        {/* DESKTOP NAV */}
        {isNonMobileScreen ? (
          <FlexBetween gap="2rem">
            {/* SEARCH FUNCTIONALITY */}

            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>

            {/* COLOR THEME FUNCTIONALITY */}
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>

            {/* MESSAGE FUNCTIONALITY */}
            <IconButton>
              <Message
                onClick={handleClick}
                sx={{ fontSize: "25px" }}
                //onClick={}
              />
            </IconButton>

            {/* NOTIFICATION FUNCTIONALITY */}
            <IconButton>
              <Notifications onClick={handleClick} sx={{ fontSize: "25px" }} />
            </IconButton>

            {/* LOGIN FUNCTIONALITY */}
            <Button variant="contained" onClick={() => navigate("/login")}>
              LOGIN
            </Button>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}

        {/* MOBILE VIEW */}
        {!isNonMobileScreen && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              {/* SEARCH FUNCTIONALITY */}
              <IconButton>
                <Search onClick={handleClick} />
              </IconButton>
              <IconButton>
                <Message onClick={handleClick} sx={{ fontSize: "25px" }} />
              </IconButton>
              <IconButton>
                <Notifications
                  onClick={handleClick}
                  sx={{ fontSize: "25px" }}
                />
              </IconButton>
              {/* LOGIN FUNCTIONALITY */}
              <Button variant="contained" onClick={() => navigate("/login")}>
                LOGIN
              </Button>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </>
  );
};
