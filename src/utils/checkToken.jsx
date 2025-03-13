import { io } from "socket.io-client";
const url = "http://localhost:8000";
const socket = io(url, { transports: ["websocket"] });
const parseJwt = async (token, refresh) => {
  const decode = JSON.parse(atob(token.split(".")[1]));

  const twoMin = 1000 * 60 * 2;
  const expTime = decode.exp * 1000;
  if (expTime - twoMin < new Date().getTime()) {
    // socket.emit("active-status-update", {
    //   uid: localStorage.getItem("uid"),
    //   activeStatus: false,
    // });
    localStorage.clear("token");
    return;
  }
};

export default parseJwt;
