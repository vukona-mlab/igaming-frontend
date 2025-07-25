const registerNotificationSW = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./notification-sw.js", { scope: "/" })
      .then((registration) => {
        console.log("Service registered with scope: ", registration);
      })
      .catch((error) => {
        console.error("Service worker reg failed: ", error);
      });
  }
};

export { registerNotificationSW };
