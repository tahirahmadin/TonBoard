import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box, CircularProgress, useTheme } from "@mui/material";
import Navbar from "./components/Navbar";
import Referral from "./pages/Referral";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Boost from "./pages/Boost";
import { useServerAuth } from "./hooks/useServerAuth";
import League from "./pages/League";
import useTelegramSDK from "./hooks/useTelegramSDK";
import { Provider } from "react-redux";
import store from "./store";
import { BackButton } from "@twa-dev/sdk/react";
import Work from "./pages/Work";
import { Quiz } from "@mui/icons-material";
import QuizPage from "./pages/Quiz";

function App() {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { accountSC, authLoaded } = useServerAuth(true);
  const { WebAppSDK } = useTelegramSDK();

  // To detect authentication loaded
  useEffect(() => {
    if (authLoaded && accountSC) {
      WebAppSDK.expand();
      WebAppSDK.enableClosingConfirmation();
      WebAppSDK.setHeaderColor("#000000");
      WebAppSDK.setBackgroundColor("#000000");
    }
  }, [accountSC, authLoaded]);

  return (
    <Provider store={store}>
      <div
        style={{
          width: "100%",
          paddingBottom: 60,
          height: "100vh",
          background: "linear-gradient(135deg, #000000, #212121)",
          paddingLeft: "1%",
          paddingRight: "1%",
          padding: "8% 0",
        }}
      >
        {pathname !== "/" && <BackButton />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/league" element={<League />} />
          <Route exact path="/referral" element={<Referral />} />
          <Route exact path="/tasks" element={<Tasks />} />
          <Route exact path="/boost" element={<QuizPage />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/work" element={<Work />} />
        </Routes>
        <Navbar />
      </div>
    </Provider>
  );
}

export default App;
