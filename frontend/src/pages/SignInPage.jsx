// import { Helmet } from "react-helmet-async";
// import PasswordInput from "../components/PasswordInput.jsx";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../redux/userSlice.js";
// import { setPreferences } from "../redux/preferenceSlice.js";
// const SignInPage = () =>
// {
//     const dispatch=useDispatch();
//     const navigate=useNavigate();
//     const [fullName,setFullName]=useState("");
//     const [nickname,setNickname]=useState("");
//     const [email,setEmail]=useState("");
//     const [password,setPassword]=useState("");
//     const [confirmPassword,setConfirmPassword]=useState("");
//     const [moodGoal,setMoodGoal]=useState("Feel Less Anxious");
//     const [focusGoal,setFocusGoal]=useState("Reduce Distractions");
//     const [language,setLanguage]=useState("English");
//     const [theme,setTheme]=useState("Light");

//     /*we have initial State in both SignInpage and userSlice right. as both reflects the same why we need to mention initialStates for btoh?
//      for Eg: fullName="" in SignInpage and fullName="" in UserSlice also why?
//      Ans: For eg: initial state in useState is "Santhosh"  in component A it will get displayed particularly in the component "A" input box as "Santhosh". But in redux initial State
//       if it is given as "Krishnan" then in component B and component C it willl be displayed as "Krishnan"  only
//        as it is a global state but in component A it will be displayed as "Santhosh"  */

//     const handleSubmit=()=>{
//         if (password !== confirmPassword) {
//             alert("Passwords do not match");
//             return;
//         }
//         if(!fullName && !nickname && !email && !password && !confirmPassword){
//             alert("Please fill in all the fields");
//             return;
//         }
//         dispatch(registerUser({fullName,nickname,email,password}));
//         dispatch(setPreferences({moodGoal,focusGoal,language,theme}));

//         localStorage.setItem("authToken","Santhosh");
//         navigate("/DashBoardPage");
//     }
//     return(
//         <>
//             <Helmet>
//                 <title>📝 Sign In Page</title>
//             </Helmet>
//             <h2>🔐Account Details</h2>
//             <input type="text"  name="fullname" autoComplete="fullname" minLength={15} required placeholder="Enter your full Name" onChange={(e)=>setFullName(e.target.value)}/>
//             <input type="text" minLength={9} placeholder="Enter your nickname" onChange={(e)=>setNickname(e.target.value)}/>
//             <input type="email" placeholder="Enter your Email Id" onChange={(e)=>setEmail(e.target.value)}/>
//             <PasswordInput placeholderz={"Enter your password"} password={password} finalPassword={setPassword}/>
//             <PasswordInput placeholderz={"Enter your confirmed password"} password={confirmPassword} finalPassword={setConfirmPassword} compareWith={password}/>
//             <h2>🎯Personal Preferences(Optional)</h2>
//             <h3>Select your mood goal for the app</h3>
//             <select onChange={(e)=>setMoodGoal(e.target.value)}>
//                 <option>Feel Less Anxious</option>
//                 <option>Sleep Better</option>
//             </select>
//             <h3>Focus goal</h3>
//             <select onChange={(e)=>setFocusGoal(e.target.value)}>
//                 <option>Reduce Distractions</option>
//                 <option>Study Better</option>
//             </select>
//             <h3>What is your preferred Language?</h3>
//             <select onChange={(e)=>setLanguage(e.target.value)}>
//                 <option>English</option>
//                 <option>Tamil</option>
//             </select>
//             <h3>Preferred Theme</h3>
//             <select onChange={(e)=>setTheme(e.target.value)}>
//                 <option>Light</option>
//                 <option>Dark</option>
//             </select>

//             <button onClick={handleSubmit}>Sign In</button>

//         </>
//     )
// }
// export default SignInPage;

import { Helmet } from "react-helmet-async";
import PasswordInput from "../components/PasswordInput.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/userSlice.js";
import { setPreferences } from "../redux/preferenceSlice.js";
import api from "../api/axios.js";
const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [moodGoal, setMoodGoal] = useState("Feel Less Anxious");
  const [focusGoal, setFocusGoal] = useState("Reduce Distractions");
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("Light");

  /*we have initial State in both SignInpage and userSlice right. as both reflects the same why we need to mention initialStates for btoh?
     for Eg: fullName="" in SignInpage and fullName="" in UserSlice also why?
     Ans: For eg: initial state in useState is "Santhosh"  in component A it will get displayed particularly in the component "A" input box as "Santhosh". But in redux initial State
      if it is given as "Krishnan" then in component B and component C it willl be displayed as "Krishnan"  only 
       as it is a global state but in component A it will be displayed as "Santhosh"  */
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!name && !nickname && !email && !password && !confirmPassword) {
      alert("Please fill in all the fields");
      return;
    }
    try {
      //await api.post() will actually send a POST http request to:http://localhost:5000/api/v1/auth/signup
      const res = await api.post("/auth/register", {
        name,
        nickname,
        email,
        password,
        confirmPassword,
        moodGoal,
        focusGoal,
        language,
        theme,
      });

      const userData = res.data.data.user;
      console.log("Backend returned:", userData);

      console.log(userData.name, userData.name);
      dispatch(
        registerUser({
          name: userData.name,
          nickname: userData.nickname,
          email: userData.email,
          password: "",
        })
      );
      dispatch(setPreferences({ moodGoal, focusGoal, language, theme }));

      navigate("/DashBoardPage");
    } catch (err) {
      console.log("Registeration Error", err);
      const msg = err?.response?.data?.message || "Something went wrong";
      setError(msg);
    }
  };
  return (
    <>
      <Helmet>
        <title>📝 Sign In Page</title>
      </Helmet>
      <h2>🔐Account Details</h2>
      <input
        type="text"
        name="fullname"
        autoComplete="fullname"
        minLength={6}
        maxLength={20}
        required
        placeholder="Enter your full Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        minLength={2}
        maxLength={10}
        placeholder="Enter your nickname"
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter your Email Id"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PasswordInput
        placeholderz={"Enter your password"}
        password={password}
        finalPassword={setPassword}
      />
      <PasswordInput
        placeholderz={"Enter your confirmed password"}
        password={confirmPassword}
        finalPassword={setConfirmPassword}
        compareWith={password}
      />
      <h2>🎯Personal Preferences(Optional)</h2>
      <h3>Select your mood goal for the app</h3>
      {/* value in the select here and schema enum in backend should remain same  */}
      <select value={moodGoal} onChange={(e) => setMoodGoal(e.target.value)}>
        <option value="Feel Less Anxious">Feel Less Anxious</option>
        <option value="Sleep Better">Sleep Better</option>
      </select>
      <h3>Focus goal</h3>
      <select value={focusGoal} onChange={(e) => setFocusGoal(e.target.value)}>
        <option value="Reduce Distractions">Reduce Distractions</option>
        <option value="Study Better">Study Better</option>
      </select>
      <h3>What is your preferred Language?</h3>
      {/* Always use value={state} for <input>, <textarea>, and <select> in React to make them controlled components. */}
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="English">English</option>
        <option value="Tamil">Tamil</option>
      </select>
      <h3>Preferred Theme</h3>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="Light">Light</option>
        <option value="Dark">Dark</option>
      </select>

      <button onClick={handleSubmit}>Register</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};
export default SignInPage;
