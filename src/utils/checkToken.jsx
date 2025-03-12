import { io } from "socket.io-client";
const url = "http://localhost:8000";
const socket = io(url, { transports: ["websocket"] });
const parseJwt = async (token) => {
  const decode = JSON.parse(atob(token.split(".")[1]));

  if (decode.exp * 1000 < new Date().getTime()) {
    socket.emit("active-status-update", {
      uid: localStorage.getItem("uid"),
      activeStatus: false,
    });

    localStorage.clear("token");
    return;
  }
};

export default parseJwt;
