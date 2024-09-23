import { useEffect, useState } from "react";
// import WebApp from "@twa-dev/sdk";
import ethersServiceProvider from "../services/ethersServicesProvider";
import { testmode } from "../utils/constants";

const useTelegramSDK = (hookInit = false) => {
  const [userId, setUserID] = useState(null);
  const [referParam, setReferParam] = useState(0);
  const [tgUsername, setTgUsername] = useState("");
  const WebApp = window.Telegram.WebApp;

  useEffect(() => {
    if (hookInit) {
      if (WebApp.initDataUnsafe?.user?.id) {
        setUserID(WebApp.initDataUnsafe.user.id);
      }
      if (WebApp.initDataUnsafe?.start_param) {
        setReferParam(WebApp.initDataUnsafe?.start_param);
      }
      if (WebApp.initDataUnsafe?.user) {
        setTgUsername(WebApp.initDataUnsafe.user.username);
        ethersServiceProvider.setTGUsername(
          WebApp.initDataUnsafe.user.username
        );
      }
      if (WebApp.initDataUnsafe?.user) {
        setTgUsername(WebApp.initDataUnsafe.user.username);
      }

      // setTimeout(() => {
      //   setUserID(1118251880);
      // }, 2000);
    }
  }, [hookInit]);

  useEffect(() => {
    if (WebApp.initDataUnsafe?.user) {
      setTgUsername(WebApp.initDataUnsafe.user.username);
    }
  }, [WebApp]);

  const _photoUrl = ethersServiceProvider.photoUrl;

  const openNewUrl = async (url) => {
    WebApp.HapticFeedback.impactOccurred("light");
    await WebApp.openLink(url);
  };

  const viberate = async (type) => {
    WebApp.HapticFeedback.impactOccurred(type);
  };

  return {
    telegramUserId: userId,
    telegramUsername: tgUsername,
    telegramPhotoUrl: _photoUrl,
    telegramReferId: referParam,
    WebAppSDK: WebApp,
    openTelegramUrl: openNewUrl,
    viberate: viberate,
  };
};

export default useTelegramSDK;
