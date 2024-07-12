import axios from "axios";
import constants from "../utils/constants";
import CryptoJS from "crypto-js";

let apiUrl = constants.api_url;

// Encryption function
export const getCipherText = (inputBodyData) => {
  let secretKey = process.env.REACT_APP_CIPHER_KEY;

  const key = CryptoJS.enc.Utf8.parse(secretKey);

  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(inputBodyData), key, {
    mode: CryptoJS.mode.ECB,
  });

  const encryptedText = encrypted.toString();

  return { data: encryptedText };
};

// *************** HMAC BASED APIS **************************

//1. USER:: GET User Leader Data by address
export const getUserLeaderboardData = async (userId) => {
  try {
    let requestParams = `userId=${userId}`;

    let url = `${apiUrl}/user/getUserData?${requestParams}`;

    let response = await axios.get(url).then((res) => res.data);

    if (response && response.result) {
      return response.result;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

//2. USER:: SignUp and Login POST Login user using telegram
export const loginTelegramUserFromBackendServer = async (
  method,
  handle,
  referId
) => {
  let url = `${apiUrl}/user/signUpUser`;
  let data = {
    handle: handle,
    via: method,
    type: "TAP",
    referId: referId,
  };

  console.log("data", data);
  //Encrypted data
  let encryptedData = getCipherText(data);

  let response = await axios
    .post(url, encryptedData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  if (response && !response.error) {
    return { error: false, result: response.result };
  } else {
    console.log("error", response);
    return { error: true, result: response.result };
  }
};

//3. TASKS:: GET User tasks Data by address
export const getTasksData = async (userId) => {
  try {
    let requestParams = `userId=${userId}`;

    let url = `${apiUrl}/user/getAllTasks?${requestParams}`;

    let response = await axios.get(url).then((res) => res.data);

    if (response && response.result) {
      return response.result;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

//4. USER:: SignUp and Login POST Login user using telegram
export const updateTaskStatusAPI = async (userId, task, taskStatus) => {
  let url = `${apiUrl}/user/setTaskCompleted`;
  let taskObject = {
    userId: userId,
    task: task,
    status: taskStatus,
  };

  //Encrypted data
  let encryptedData = getCipherText(taskObject);

  let response = await axios
    .post(url, encryptedData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  if (response && !response.error) {
    return true;
  } else {
    console.log("error", response);
    return false;
  }
};

//5. REFERRAL:: GET User referrals Data by address
export const getReferralsData = async (telegramId) => {
  try {
    let requestParams = `telegramId=${telegramId}`;

    let url = `${apiUrl}/user/getReferredUsers?${requestParams}`;

    let response = await axios.get(url).then((res) => res.data);

    if (response && response.result) {
      return response.result;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

//6. USER:: Update Game Data to backend
export const updateGameDataToBackendAPI = async (dataObj, userId) => {
  let url = `${apiUrl}/user/updateUserData`;

  let updateObj = { ...dataObj, userId: userId };
  //Encrypted data
  let encryptedData = getCipherText(updateObj);

  let response = await axios
    .post(url, encryptedData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  if (response && !response.error) {
    return true;
  } else {
    console.log("error", response);
    return false;
  }
};

//7. DASHBOARD:: GET All Users Data
export const getDashboardData = async (telegramId) => {
  try {
    let url = `${apiUrl}/user/getDashboardData`;

    let response = await axios.get(url).then((res) => res.data);
    console.log("res", response);
    if (response && response.result) {
      return response.result;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};
