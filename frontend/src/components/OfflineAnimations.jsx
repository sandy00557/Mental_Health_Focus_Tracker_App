import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import offlineAnimation from "../assets/animations/404.json"; // your JSON file

const OfflineAnimation = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null; // hide animation when online

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Lottie
        animationData={offlineAnimation}
        loop={true}
        style={{ width: 300, height: 300, margin: "0 auto" }}
      />
      <h2>No Internet Connection</h2>
      <p>Please check your network and try again.</p>
    </div>
  );
};

export default OfflineAnimation;
