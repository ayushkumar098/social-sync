import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import ViewPostPage from "scenes/viewPostPage/index.jsx";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import ChatPage from "scenes/chatPage/index.jsx";
import MessagingPage from "scenes/messagingPage/index.jsx";
// import socketIO from "socket.io-client";


// const socket = socketIO.connect("");

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  console.log("Auth: "+isAuth);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/posts/:userId/:postId"
              element={isAuth ? <ViewPostPage /> : <Navigate to="/" />}
            />
            {/* <Route
              path="/message"
              element={isAuth ? <ChatPage /> : <Navigate to="/" />}
            /> */}
            <Route
              path="/message"
              element={ <MessagingPage />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
