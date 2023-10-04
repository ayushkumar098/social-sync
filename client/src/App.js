import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import ViewPostPage from "scenes/viewPostPage/index.jsx";
import { useMemo, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import MessagingPage from "scenes/messagingPage/index.jsx";
import { io } from "socket.io-client";
import { host } from "utils/APIRoutes";
import GeneralPage from "scenes/generalPage/index.jsx";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  const user = useSelector((state) => state.user);

  const socket = useRef();
  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                isAuth ? <HomePage socket={socket} /> : <GeneralPage/>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                isAuth ? <ProfilePage socket={socket} /> : <Navigate to="/" />
              }
            />
            <Route
              path="/posts/:userId/:postId"
              element={
                isAuth ? <ViewPostPage socket={socket} /> : <Navigate to="/" />
              }
            />
            <Route
              path="/message"
              element={
                isAuth ? <MessagingPage socket={socket} /> : <Navigate to="/" />
              }
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
