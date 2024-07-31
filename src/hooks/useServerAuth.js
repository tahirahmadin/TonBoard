import { useEffect, useMemo, useState } from "react";
import ethersServiceProvider from "./../services/ethersServicesProvider";
import { getDecryptedData } from "../actions/helperFn";

import { loginTelegramUserFromBackendServer } from "../actions/serverActions";
import useTelegramSDK from "./useTelegramSDK";
import { AUTH_TYPE_ENUM } from "../utils/constants";

export const useServerAuth = (hookInit = false) => {
  const [walletStatus, setWalletStatus] = useState(0);
  const { telegramUserId, telegramReferId } = useTelegramSDK(true);

  //1. SIGNUP:: Login/SignUp User
  useEffect(() => {
    async function asyncFn() {
      await _loginWithTelegram();
    }
    if (hookInit && telegramUserId) {
      asyncFn();
    }
  }, [hookInit, telegramUserId, telegramReferId]);

  const _loaded = useMemo(() => {
    let loadedValue = ethersServiceProvider.authLoadedStatus;
    if (!loadedValue) {
      return false;
    }
    return loadedValue;
  }, [ethersServiceProvider.authLoadedStatus, walletStatus]);

  const _account = useMemo(() => {
    let addressData = ethersServiceProvider.currentUserId;
    if (!addressData) {
      return null;
    }
    return addressData;
  }, [ethersServiceProvider.currentUserId, walletStatus]);

  const _username = useMemo(() => {
    let addressData = ethersServiceProvider.tgUsername;
    if (!addressData) {
      return null;
    }
    return addressData;
  }, [ethersServiceProvider.tgUsername, walletStatus]);

  //FUNCTION:: LOGIN with Telegram
  const _loginWithTelegram = async () => {
    //TODO::
    const authRes = await loginTelegramUserFromBackendServer(
      AUTH_TYPE_ENUM.TELEGRAM,
      telegramUserId,
      telegramReferId
    );

    if (authRes && !authRes.error) {
      if (authRes.result) {
        //Remove old states of localStorage
        // await localStorage.clear();
      }
      return await updateEtherServicesClassData(authRes.result.userId);
    } else {
      return false;
    }
  };

  const updateEtherServicesClassData = async (authRes) => {
    if (authRes) {
      let decryptedData = await getDecryptedData(authRes);
      //Storing authRes for future login.
      localStorage.setItem("authRes", authRes);
      let decrypted_address = decryptedData.data;

      await ethersServiceProvider.setCurrentUserId(decrypted_address);
      await ethersServiceProvider.setAuthLoadedStatus(true);
      setWalletStatus(walletStatus + 1);

      return true;
    }
  };

  // To disconnect from central wallet
  const _logoutUserUniversal = async () => {
    await ethersServiceProvider.setCurrentUserId(null);
  };

  return {
    authLoaded: _loaded,
    accountSC: _account,
    username: _username,
    loginWithTelegram: _loginWithTelegram,
    logoutUserUniversal: _logoutUserUniversal,
    walletStatus: walletStatus,
  };
};
