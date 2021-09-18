/* eslint-disable */
import axios from "axios";
import { getAuth } from "firebase/auth";

let isRefreshing = false; // 標記是否正在重新整理 token
let currentRefreshingCall = null;

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

instance.interceptors.request.use(
  async (config) => {
    const auth = getAuth();

    const token = auth.currentUser.accessToken;

    config.headers.Authorization = `bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (error) => {


    const statusCode = error.response ? error.response.status : null;
    const errorCode = error.response ? error.response.data.code : null;
    const message = error.response ? error.response?.data?.message : null;

    let specialErrorProcess = matchErrorProcess(statusCode, errorCode);

    if (specialErrorProcess === "refreshToken") {
      // 只有這邊要return

      return refreshToken().then((data) => {
        return instance(error.config);
      });
    }

    return Promise.reject(error);
  }
);

export default instance;

// 定義 幾項 特殊處理
// 先match 先回傳
let errorProcessRule = [
  {
    process: "refreshToken",
    rules: [
      { statusCode: 401, errorCode: 9001 },
      { statusCode: 401, errorCode: 9002 },
      { statusCode: 401, errorCode: 9003 },
    ],
  },
];

function matchErrorProcess(statusCode, errorCode) {
  let matchProcess =
    errorProcessRule.find(({ rules }) => {
      return rules.some((rule) => {
        return (
          (rule.statusCode === "all" ? true : rule.statusCode === statusCode) &&
          (rule.errorCode === "all" ? true : rule.errorCode === errorCode)
        );
      });
    })?.process || "none";

  return matchProcess;
}

function refreshToken() {
  if (isRefreshing) {
    return currentRefreshingCall;
  }

  isRefreshing = true;
  const auth = getAuth();

  const refreshingCall = auth.currentUser
    .getIdToken(true)
    .then((token) => {
      isRefreshing = false;
      currentRefreshingCall = null;
      return Promise.resolve();
    })
    .catch((err) => {
      isRefreshing = false;
      currentRefreshingCall = null;
      console.log("err", err);
      return Promise.reject("fireBase getIdToken Fail");
    });
  currentRefreshingCall = refreshingCall;
  return refreshingCall;
}
