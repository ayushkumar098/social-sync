import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Divider,
  Badge,
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
import { useDispatch, useSelector } from "react-redux";
import {
  setMode,
  setLogout,
  setNotification,
  setClearNotification,
} from "state/index";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { host } from "utils/APIRoutes";
import UserImage from "components/UserImage";

const NavbarPage = ({ socket, messagePage }) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const [toggleNotification, setToggleNotification] = useState(false);

  const handleNotificationToggle = () => {
    setToggleNotification(!toggleNotification);
  };

  const [users, setUsers] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        if (messagePage != true) {
          console.log(msg.msgId);
          dispatch(setNotification({ notification: msg }));
        } else {
          console.log(messagePage);
        }
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const response = await fetch(`${host}/chat/getusers/${user._id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUsers(data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchField === "") {
      setFilteredUsers([]);
    } else {
      const newFilteredUsers = users.filter((user) => {
        return user.firstName.toLocaleLowerCase().includes(searchField);
      });
      setFilteredUsers(newFilteredUsers);
    }
  }, [searchField]);

  const onSearchChangeHandler = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const handleOnClickNotification = () => {
    navigate("/message");
    navigate(0);
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
            <FormControl sx={{ width: "20rem" }}>
              <FlexBetween
                onFocus={handleFocus}
                onBlur={handleBlur}
                sx={{
                  backgroundColor: { background },
                  borderRadius: "9px",
                  gap: "3rem",
                  p: "0.1rem 1.5rem",
                  position: "relative",
                }}
              >
                <InputBase
                  placeholder="Search..."
                  onChange={onSearchChangeHandler}
                />
                <IconButton>
                  <Search />
                </IconButton>
              </FlexBetween>

              <Box
                sx={{
                  width: "20rem",
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  zIndex: "2",
                  bgcolor: { background },
                  borderRadius: "2px 2px 10px 10px",
                }}
              >
                {filteredUsers.length > 0 &&
                  filteredUsers.map((item) => {
                    return (
                      <>
                        <Box
                          onClick={() => {
                            navigate(`/profile/${item._id}`);
                            navigate(0);
                          }}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            m: "0.5rem 1rem",
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
                        >
                          <UserImage image={item.picturePath} size="55px" />
                          <Typography
                            variant="h5"
                            fontWeight="300"
                            sx={{
                              pl: "0.5rem",
                              "&:hover": {
                                color: primaryLight,
                              },
                            }}
                          >
                            {item.firstName}
                          </Typography>
                        </Box>
                        <Divider />
                      </>
                    );
                  })}
              </Box>
            </FormControl>

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
                sx={{ fontSize: "25px" }}
                onClick={() => navigate("/message")}
              />
            </IconButton>

            {/* NOTIFICATION FUNCTIONALITY */}
            <Box
              sx={{
                position: "relative",
              }}
            >
              {notification.length > 0 ? (
                <Badge badgeContent=" " color="error" sx={{ width: "1.6rem" }}>
                  <Notifications
                    onClick={handleNotificationToggle}
                    sx={{ fontSize: "30px" }}
                  />
                </Badge>
              ) : (
                <Badge color="secondary">
                  <Notifications
                    onClick={handleNotificationToggle}
                    sx={{ fontSize: "25px" }}
                  />
                </Badge>
              )}
              {toggleNotification && (
                <Box
                  sx={{
                    width: "fit-content",
                    whiteSpace: "nowrap",
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    marginTop: ".5rem",
                    zIndex: "2",
                    bgcolor: { background },
                  }}
                >
                  {notification.length > 0 ? (
                    <Box
                      onClick={handleOnClickNotification}
                      sx={{
                        p: "0.2rem",
                        border: "solid black 1px",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      <Typography variant="h5" fontWeight="300">
                        You have New Messages
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        p: "0.2rem",
                        border: "solid black 1px",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      <Typography variant="h5" fontWeight="300">
                        No New Notifications
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Box>

            {/* LOGOUT FUNCTIONALITY */}
            <FormControl sx={{ fontSize: "25px" }}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(setLogout());
                    navigate("/login");
                  }}
                >
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
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
              <Message
                sx={{ fontSize: "25px" }}
                onClick={() => navigate("/message")}
              />

              {/* <Notifications sx={{ fontSize: "25px" }} /> */}

              <FormControl sx={{ fontSize: "25px" }}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {
                    dispatch(setLogout());
                    navigate("/login");
                  }}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </>
  );
};

export default NavbarPage;
