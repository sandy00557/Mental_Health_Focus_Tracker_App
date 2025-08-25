// export const isAuthenticated=()=>{
//     return localStorage.getItem("authToken") === "Santhosh";
// }



// utils/auth.js
// utils/auth.js
import api from "../api/axios";

export const isAuthenticated = async () => {
  try {
    // This hits your backend /auth/me which requires authController.protect
    const res = await api.get("/auth/me", { withCredentials: true });
    return res.data && res.data.data.user ? res.data.data.user : null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

