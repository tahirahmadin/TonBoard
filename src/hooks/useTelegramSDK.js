import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import ethersServiceProvider from "../services/ethersServicesProvider";

const useTelegramSDK = (hookInit = false) => {
  const [userId, setUserID] = useState(1118251880);
  const [referParam, setReferParam] = useState(0);

  useEffect(() => {
    if (hookInit) {
      if (WebApp.initDataUnsafe?.user?.id) {
        setUserID(WebApp.initDataUnsafe.user.id);
      }
      if (WebApp.initDataUnsafe?.start_param) {
        setReferParam(WebApp.initDataUnsafe?.start_param);
      }

      // WebApp.initParams({ tgWebVersion: "6.9" });
    }
  }, [WebApp, hookInit]);

  useEffect(() => {
    if (WebApp.initDataUnsafe?.user) {
      ethersServiceProvider.setTGUsername(WebApp.initDataUnsafe.user.username);
      ethersServiceProvider.setTGPhotoUrl(
        JSON.stringify(WebApp.initDataUnsafe.user.photo_url)
      );
    }
  }, [WebApp]);

  const _username = ethersServiceProvider.tgUsername;
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
    telegramUsername: _username,
    telegramPhotoUrl: _photoUrl,
    telegramReferId: referParam,
    WebAppSDK: WebApp,
    openTelegramUrl: openNewUrl,
    viberate: viberate,
  };
};

export default useTelegramSDK;
