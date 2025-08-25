// import { useNavigate } from "react-router-dom";
// import VideosSection from "../components/VideosSection.jsx";
// import ProductsSection from "../components/ProductsSection.jsx";
// import EmojisSection from "../components/EmojisSection.jsx";
// import GamesSection from "../components/GamesSection.jsx";
// import API from "../api/axios.js";
// import { setPoints } from "../redux/userSlice.js";
// import { useDispatch, useSelector } from "react-redux";
// import { selectPoints, selectNickName } from "../redux/userSlice";
// import { useState, useEffect } from "react";
// const DashBoardPage = () => {
//   const dispatch = useDispatch();
//   const [showVideos, setShowVideos] = useState(false);
//   const [showProducts, setShowProducts] = useState(false);
//   const [showGames, setShowGames] = useState(false);
//   const navigate = useNavigate();
//   const logoutsession = () => {
//     localStorage.removeItem("authToken");
//     navigate("/");
//   };

//   // useEffect(() => {
//   //   API.get("/quiz/getPoints?userId=68955900ea39ddff800e24ba")
//   //     .then((res) => {
//   //       if (res.data.status === "success") {
//   //         dispatch(setPoints(res.data.points)); //will get points from backend and will set as global using dispatch method
//   //       }
//   //     })
//   //     .catch(console.error);
//   // }, [dispatch]);

//   useEffect(() => {
//     const fetchPoints = async () => {
//       try {
//         const userId = "68955900ea39ddff800e24ba"; // Your userId
//         const res = await API.get(`/quiz/getPoints?userId=${userId}`);
//         if (res.data.status === "success") {
//           dispatch(setPoints(res.data.points));
//         }
//       } catch (error) {
//         console.error("Error fetching points:", error);
//       }
//     };

//     fetchPoints();
//   }, [dispatch]);

//   const points = useSelector(selectPoints);
//   const name = useSelector((state) => state.user.name);
//   const nicknamez = useSelector(selectNickName);
//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {console.log("Nickname:", nicknamez)}
//       <h1>Hello {nicknamez || name || "User"}</h1>
//       <p>Welcome to the dashboard!</p>
//       <p>Your Points is: {points} ....</p>

//       <button onClick={() => setShowVideos((prev) => !prev)}>
//         Videos Section
//       </button>
//       {showVideos && <VideosSection />}

//       <button onClick={() => setShowProducts((prev) => !prev)}>
//         Products Section
//       </button>
//       {showProducts && <ProductsSection />}

//       <button onClick={() => setShowGames((prev) => !prev)}>
//         Games Section
//       </button>
//       {showGames && <GamesSection />}

//       <button onClick={logoutsession}>Logout</button>

//       <EmojisSection />
//     </div>
//   );
// };
// export default DashBoardPage;

//version for navigation

import { useNavigate, Route, Routes } from "react-router-dom";
import VideosSection from "../components/VideosSection.jsx";
import ProductsSection from "../components/ProductsSection.jsx";
import EmojisSection from "../components/EmojisSection.jsx";
import GamesSection from "../components/GamesSection.jsx";
import API from "../api/axios.js";
import { setPoints } from "../redux/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { selectPoints, selectNickName } from "../redux/userSlice";
import { useEffect } from "react";
const DashBoardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutsession = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  // useEffect(() => {
  //   API.get("/quiz/getPoints?userId=68955900ea39ddff800e24ba")
  //     .then((res) => {
  //       if (res.data.status === "success") {
  //         dispatch(setPoints(res.data.points)); //will get points from backend and will set as global using dispatch method
  //       }
  //     })
  //     .catch(console.error);
  // }, [dispatch]);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const userId = "68955900ea39ddff800e24ba"; // Your userId
        const res = await API.get(`/quiz/getPoints?userId=${userId}`);
        if (res.data.status === "success") {
          dispatch(setPoints(res.data.points));
        }
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };

    fetchPoints();
  }, [dispatch]);

  const points = useSelector(selectPoints);
  const name = useSelector((state) => state.user.name);
  const nicknamez = useSelector(selectNickName);
  return (
    <div>
      <h1>Dashboard</h1>
      {console.log("Nickname:", nicknamez)}
      <h1>Hello {nicknamez || name || "User"}</h1>
      <p>Welcome to the dashboard!</p>
      <p>Your Points is: {points} ....</p>

      <button onClick={() => navigate("VideosSection")}>Videos Section</button>
      {/* why instead of conditional rendering we are directly using the button click?
      for navigation conditional rendering will not sync correctly. and continuous rendering will
      happen which will cause "/dashboard/dashbaord/,,...." which will cause throttling.
      so we are using button click and already in app.jsx we made VideoSection as a child of Dashboard by using "/dashboardpage/*" */}
      {/* {showVideos && navigate("DashBoardPage/VideosSection")} */}

      <button onClick={() => navigate("ProductsSection")}>
        Products Section
      </button>
      {/* {showProducts && <ProductsSection />} */}

      <button onClick={() => navigate("GamesSection")}>Games Section</button>
      {/* {showGames && <GamesSection />} */}

      <button onClick={logoutsession}>Logout</button>

      <EmojisSection />

      <button onClick={() => navigate("CoachSection")}>Coach Section</button>

      <button onClick={() => navigate("VoiceTextSection")}>
        Voice_Text Section
      </button>
    </div>
  );
};
export default DashBoardPage;
