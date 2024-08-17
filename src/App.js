import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box, CircularProgress, useTheme } from "@mui/material";
import Navbar from "./components/Navbar";
import Referral from "./pages/Referral";
import Dashboard from "./pages/Dashboard";
import Boost from "./pages/Boost";
import { useServerAuth } from "./hooks/useServerAuth";
import League from "./pages/League";
import useTelegramSDK from "./hooks/useTelegramSDK";
import { Provider } from "react-redux";
import store from "./store";
import { BackButton } from "@twa-dev/sdk/react";
import Work from "./pages/Work";
import QuizPage from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import SingleTaskPage from "./pages/SingleTaskPage";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

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
    <TonConnectUIProvider manifestUrl="https://gobbltest.vercel.app/tonconnect-manifest.json">
      <Provider store={store}>
        <div
          style={{
            width: "100%",
            paddingBottom: 60,
            height: "100vh",
            background: "#000000",
          }}
        >
          {pathname !== "/" && <BackButton />}
          <Routes>
            <Route exact path="/" element={<QuizPage />} />
            <Route exact path="/boost" element={<Boost />} />
            <Route exact path="/league" element={<League />} />
            <Route exact path="/referral" element={<Referral />} />
            <Route
              exact
              path="/tasks/:projectId"
              element={<SingleTaskPage />}
            />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/work" element={<Work />} />
            <Route exact path="/leader" element={<Leaderboard />} />
            <Route exact path="/invite" element={<Referral />} />
          </Routes>
          <Navbar />
        </div>
      </Provider>
    </TonConnectUIProvider>
  );
}

export default App;
