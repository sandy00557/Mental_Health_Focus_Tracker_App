// //step 2: install'npm install react-helmet-async --legacy-peer-deps"
// import { Helmet } from "react-helmet-async";
// import { NavLink, useNavigate } from "react-router-dom";
// import DashboardPage from "./DashBoardPage";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   return (
//     <>
//       <Helmet>
//         <title>🔐 Login Page</title>
//       </Helmet>

//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
//           <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//             Login 🔐
//           </h2>

//           <input
//             type="email"
//             required
//             placeholder="Enter your email"
//             className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />

//           <input
//             type="password"
//             required
//             placeholder="Enter your password"
//             className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />

//           <button
//             onClick={() => navigate("/dashboardpage")}
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Login
//           </button>

//           <p className="text-sm text-gray-600 mt-4 text-center">
//             Don't have an account?{" "}
//             <NavLink to="/SignInPage" className="text-blue-500 hover:underline">
//               Sign In
//             </NavLink>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginPage;

// LoginPage.jsx
// import { useState } from "react";

//ver 2:
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect, useRef, useCallback } from "react";
// import bgImage from "../assets/CoachSection_Img.png";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const heartsRef = useRef([]);
//   const animationFrameRef = useRef();
//   const lastHeartCreation = useRef(0);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     navigate("/DashBoardPage");
//   };

//   // Optimized heart creation with throttling
//   const createHeart = useCallback((x, y) => {
//     const now = Date.now();
//     // Throttle heart creation to every 100ms for better performance
//     if (now - lastHeartCreation.current < 100) return;

//     lastHeartCreation.current = now;

//     const heart = {
//       id: now + Math.random(),
//       x: x + (Math.random() - 0.5) * 30,
//       y: y + (Math.random() - 0.5) * 30,
//       size: Math.random() * 8 + 10,
//       opacity: 1,
//       velocityY: -Math.random() * 1.5 - 0.5,
//       velocityX: (Math.random() - 0.5) * 1,
//       life: 1,
//     };

//     heartsRef.current.push(heart);

//     // Limit hearts to 20 for better performance
//     if (heartsRef.current.length > 20) {
//       heartsRef.current = heartsRef.current.slice(-20);
//     }
//   }, []);

//   // Optimized heart animation loop
//   const animateHearts = useCallback(() => {
//     heartsRef.current = heartsRef.current
//       .map((heart) => ({
//         ...heart,
//         x: heart.x + heart.velocityX,
//         y: heart.y + heart.velocityY,
//         opacity: heart.opacity * 0.96,
//         life: heart.life * 0.96,
//         size: heart.size * 0.995,
//       }))
//       .filter((heart) => heart.opacity > 0.05);

//     animationFrameRef.current = requestAnimationFrame(animateHearts);
//   }, []);

//   // Mouse move handler with throttling
//   useEffect(() => {
//     let throttleTimeout;

//     const handleMouseMove = (e) => {
//       if (throttleTimeout) return;

//       throttleTimeout = setTimeout(() => {
//         throttleTimeout = null;
//       }, 16); // ~60fps throttling

//       const newMousePos = { x: e.clientX, y: e.clientY };
//       setMousePos(newMousePos);

//       // Create hearts less frequently
//       if (Math.random() < 0.15) {
//         createHeart(newMousePos.x, newMousePos.y);
//       }
//     };

//     window.addEventListener("mousemove", handleMouseMove, { passive: true });
//     animationFrameRef.current = requestAnimationFrame(animateHearts);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//     };
//   }, [createHeart, animateHearts]);

//   // Password visibility toggle
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div
//       className="relative flex items-center justify-center min-h-screen overflow-hidden cursor-none"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Custom Cursor - Optimized */}
//       <div
//         className="fixed pointer-events-none z-50 will-change-transform"
//         style={{
//           left: mousePos.x - 10,
//           top: mousePos.y - 10,
//           transform: "translate(-50%, -50%)",
//         }}
//       >
//         <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-80 animate-pulse shadow-lg"></div>
//       </div>

//       {/* Optimized Floating Hearts */}
//       <div className="fixed inset-0 pointer-events-none z-40">
//         {heartsRef.current.map((heart) => (
//           <div
//             key={heart.id}
//             className="absolute select-none will-change-transform"
//             style={{
//               left: heart.x,
//               top: heart.y,
//               opacity: heart.opacity,
//               fontSize: `${heart.size}px`,
//               transform: `translate(-50%, -50%) scale(${heart.life})`,
//               filter: "drop-shadow(0 0 4px rgba(255, 182, 193, 0.6))",
//             }}
//           >
//             ❤️
//           </div>
//         ))}
//       </div>

//       {/* Enhanced Blob Parallax - Optimized */}
//       <div
//         className="absolute w-48 h-48 bg-pink-300 rounded-full opacity-40 blur-3xl will-change-transform pointer-events-none"
//         style={{
//           top: 100,
//           left: 100,
//           transform: `translate3d(${mousePos.x * 0.04}px, ${
//             mousePos.y * 0.04
//           }px, 0)`,
//         }}
//       />
//       <div
//         className="absolute w-56 h-56 bg-indigo-300 rounded-full opacity-40 blur-3xl will-change-transform pointer-events-none"
//         style={{
//           bottom: 150,
//           right: 150,
//           transform: `translate3d(${mousePos.x * -0.04}px, ${
//             mousePos.y * -0.04
//           }px, 0)`,
//         }}
//       />
//       <div
//         className="absolute w-40 h-40 bg-purple-300 rounded-full opacity-40 blur-3xl will-change-transform pointer-events-none"
//         style={{
//           top: "40%",
//           left: "60%",
//           transform: `translate3d(${mousePos.x * 0.02}px, ${
//             mousePos.y * -0.02
//           }px, 0)`,
//         }}
//       />

//       {/* Glassmorphic Card */}
//       <div className="relative z-10 w-full max-w-md p-10 rounded-3xl shadow-xl bg-white/40 backdrop-blur-2xl border border-white/70 animate-fadeIn">
//         <h1 className="text-3xl font-bold text-center text-indigo-700 drop-shadow mb-8">
//           🌱 Welcome Back
//         </h1>

//         <form className="space-y-8" onSubmit={handleLogin} autoComplete="off">
//           {/* Email Input */}
//           <div className="relative group mb-5">
//             <span className="absolute left-3 top-4 text-gray-400 z-10">
//               <svg
//                 width="20"
//                 height="20"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                 <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//               </svg>
//             </span>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="peer w-full pl-10 pr-4 pt-6 pb-3 text-gray-900 bg-white/60 rounded-2xl border border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-300 outline-none transition duration-300 shadow-sm group-hover:shadow-lg group-hover:scale-[1.02] backdrop-blur-lg focus:shadow-pink-300 cursor-text"
//               placeholder=" "
//             />
//             <label
//               className={`absolute left-10 top-4 text-sm text-gray-500 pointer-events-none transition-all duration-300
//               ${
//                 email
//                   ? "text-indigo-600 top-1 scale-90"
//                   : "peer-focus:top-1 peer-focus:text-indigo-500 peer-focus:scale-90"
//               }
//               peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400`}
//             >
//               Email
//             </label>
//           </div>

//           {/* Password Input with Emoji Toggle */}
//           <div className="relative group mb-5">
//             <span className="absolute left-3 top-4 text-gray-400 z-10">
//               <svg
//                 width="20"
//                 height="20"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </span>
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="peer w-full pl-10 pr-14 pt-6 pb-3 text-gray-900 bg-white/60 rounded-2xl border border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none transition duration-300 shadow-sm group-hover:shadow-lg group-hover:scale-[1.02] backdrop-blur-lg focus:shadow-indigo-200 cursor-text"
//               placeholder=" "
//             />

//             {/* Emoji Eye Toggle Button */}
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className="absolute right-3 top-4 text-2xl cursor-pointer hover:scale-110 transition-all duration-200 focus:outline-none focus:scale-110 z-10"
//               tabIndex={-1}
//             >
//               {showPassword ? "😊" : "😴"}
//             </button>

//             <label
//               className={`absolute left-10 top-4 text-sm text-gray-500 pointer-events-none transition-all duration-300
//               ${
//                 password
//                   ? "text-indigo-600 top-1 scale-90"
//                   : "peer-focus:top-1 peer-focus:text-indigo-500 peer-focus:scale-90"
//               }
//               peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400`}
//             >
//               Password
//             </label>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 mt-4 font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110 focus:brightness-110 focus:scale-105 cursor-pointer"
//           >
//             Login
//           </button>
//         </form>

//         <p className="mt-6 text-sm text-center text-gray-700">
//           Don't have an account?{" "}
//           <a
//             href="#"
//             className="font-medium text-pink-500 hover:underline cursor-pointer"
//           >
//             Sign up
//           </a>
//         </p>
//       </div>

//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.8s ease-in-out;
//         }

//         /* Optimized cursor styles */
//         * {
//           cursor: none !important;
//         }

//         input, button, a {
//           cursor: pointer !important;
//         }

//         input[type="email"], input[type="password"], input[type="text"] {
//           cursor: text !important;
//         }

//         /* Performance optimizations */
//         .will-change-transform {
//           will-change: transform;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LoginPage;

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import bgImage from "../assets/CoachSection_Img.png";
import "../components/GlassButton.css"; // Import custom glass button CSS

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heartsRef = useRef([]);
  const animationFrameRef = useRef();
  const lastHeartCreation = useRef(0);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/DashBoardPage");
  };

  const createHeart = useCallback((x, y) => {
    const now = Date.now();
    if (now - lastHeartCreation.current < 100) return;
    lastHeartCreation.current = now;
    const heart = {
      id: now + Math.random(),
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      size: Math.random() * 8 + 10,
      opacity: 1,
      velocityY: -Math.random() * 1.5 - 0.5,
      velocityX: (Math.random() - 0.5) * 1,
      life: 1,
    };
    heartsRef.current.push(heart);
    if (heartsRef.current.length > 20) {
      heartsRef.current = heartsRef.current.slice(-20);
    }
  }, []);

  const animateHearts = useCallback(() => {
    heartsRef.current = heartsRef.current
      .map((heart) => ({
        ...heart,
        x: heart.x + heart.velocityX,
        y: heart.y + heart.velocityY,
        opacity: heart.opacity * 0.96,
        life: heart.life * 0.96,
        size: heart.size * 0.995,
      }))
      .filter((heart) => heart.opacity > 0.05);
    animationFrameRef.current = requestAnimationFrame(animateHearts);
  }, []);

  useEffect(() => {
    let throttleTimeout;
    const handleMouseMove = (e) => {
      if (throttleTimeout) return;
      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;
      }, 16);
      const newMousePos = { x: e.clientX, y: e.clientY };
      setMousePos(newMousePos);
      if (Math.random() < 0.15) {
        createHeart(newMousePos.x, newMousePos.y);
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationFrameRef.current = requestAnimationFrame(animateHearts);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [createHeart, animateHearts]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen overflow-hidden cursor-none"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Custom Cursor */}
      <div
        className="fixed pointer-events-none z-50 will-change-transform"
        style={{
          left: mousePos.x - 10,
          top: mousePos.y - 10,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-80 animate-pulse shadow-lg" />
      </div>

      {/* Floating Hearts */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {heartsRef.current.map((heart) => (
          <div
            key={heart.id}
            className="absolute select-none will-change-transform"
            style={{
              left: heart.x,
              top: heart.y,
              opacity: heart.opacity,
              fontSize: `${heart.size}px`,
              transform: `translate(-50%, -50%) scale(${heart.life})`,
              filter: "drop-shadow(0 0 4px rgba(255, 182, 193, 0.6))",
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Blob Parallax Background */}
      <div
        className="absolute w-48 h-48 bg-pink-300 rounded-full opacity-40 blur-3xl will-change-transform pointer-events-none"
        style={{
          top: 100,
          left: 100,
          transform: `translate3d(${mousePos.x * 0.04}px, ${
            mousePos.y * 0.04
          }px, 0)`,
        }}
      />
      <div
        className="absolute w-56 h-56 bg-indigo-300 rounded-full opacity-40 blur-3xl will-change-transform pointer-events-none"
        style={{
          bottom: 150,
          right: 150,
          transform: `translate3d(${mousePos.x * -0.04}px, ${
            mousePos.y * -0.04
          }px, 0)`,
        }}
      />
      <div
        className="absolute w-40 h-40 bg-purple-300 rounded-full opacity-40 blur-3xl will-change-transform pointer-events-none"
        style={{
          top: "40%",
          left: "60%",
          transform: `translate3d(${mousePos.x * 0.02}px, ${
            mousePos.y * -0.02
          }px, 0)`,
        }}
      />

      {/* Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-md p-10 rounded-3xl shadow-xl bg-white/40 backdrop-blur-2xl border border-white/70 animate-fadeIn">
        <h1 className="text-3xl font-bold text-center text-indigo-700 drop-shadow mb-8">
          🌱 Welcome Back
        </h1>

        <form className="space-y-8" onSubmit={handleLogin} autoComplete="off">
          {/* Email Input */}
          <div className="relative group mb-5">
            <span className="absolute left-3 top-4 text-gray-400 z-10">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full pl-10 pr-4 pt-6 pb-3 text-gray-900 bg-white/60 rounded-2xl border border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-300 outline-none transition duration-300 shadow-sm group-hover:shadow-lg group-hover:scale-[1.02] backdrop-blur-lg focus:shadow-pink-300 cursor-text"
              placeholder=" "
            />
            <label
              className={`absolute left-10 top-4 text-sm text-gray-500 pointer-events-none transition-all duration-300 ${
                email
                  ? "text-indigo-600 top-1 scale-90"
                  : "peer-focus:top-1 peer-focus:text-indigo-500 peer-focus:scale-90"
              } peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400`}
            >
              Email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative group mb-5">
            <span className="absolute left-3 top-4 text-gray-400 z-10">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full pl-10 pr-14 pt-6 pb-3 text-gray-900 bg-white/60 rounded-2xl border border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none transition duration-300 shadow-sm group-hover:shadow-lg group-hover:scale-[1.02] backdrop-blur-lg focus:shadow-indigo-200 cursor-text"
              placeholder=" "
            />

            {/* Emoji Toggle */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-4 text-2xl cursor-pointer hover:scale-110 transition-all duration-200 focus:outline-none focus:scale-110 z-10"
              tabIndex={-1}
            >
              {showPassword ? "😊" : "😴"}
            </button>

            <label
              className={`absolute left-10 top-4 text-sm text-gray-500 pointer-events-none transition-all duration-300 ${
                password
                  ? "text-indigo-600 top-1 scale-90"
                  : "peer-focus:top-1 peer-focus:text-indigo-500 peer-focus:scale-90"
              } peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400`}
            >
              Password
            </label>
          </div>

          {/* Glass Button */}
          <button
            type="submit"
            className="glass-button relative w-full h-16 text-xl font-medium tracking-wider"
          >
            Login
            <span className="glass-glow-bottom"></span>
            <span className="glass-glow-sides"></span>
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-700">
          Don't have an account?{" "}
          <a
            href="#"
            className="font-medium text-pink-500 hover:underline cursor-pointer"
          >
            Sign up
          </a>
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out;
        }
        * { cursor: none !important; }
        input, button, a { cursor: pointer !important; }
        input[type="email"], input[type="password"], input[type="text"] { cursor: text !important; }
        .will-change-transform { will-change: transform; }
      `}</style>
    </div>
  );
};

export default LoginPage;
