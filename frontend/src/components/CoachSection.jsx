// import { useState, useEffect } from "react";
// import API from "../api/axios"; // Import the API instance
// import CoachSection_Img from "../assets/CoachSection_Img.png"; // Import the image
// const CoachSection = () => {
//   const [mood, setMood] = useState("");
//   // const [response, setResponse] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [systemContent, setSystemContent] = useState(
//     "You are an optimistic person who always tries to see the bright side of any situation."
//   );

//   const changeMood = (e) => {
//     setMood(e.target.value);
//   };

//   useEffect(() => {
//     const handleBeforeUnload = (event) => {
//       event.preventDefault(); // Prevent the default action
//       event.returnValue = "⚠️ All messages will be lost after refresh."; //we should have event.returnValue() but we can't set the custom value as it is not allowed by the browsers nowadays.
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//       //why we need remove? As everytime even after component unmounts the listener is added to the stack
//     };
//   }, []); //it runs only once and register the listener and does not change on the prop changes

//   const askCoach = async () => {
//     try {
//       setMessages((prev) => [...prev, { role: "user", text: mood }]);
//       const res = await API.post("/coach/", {
//         mood: mood,
//         systemContent: systemContent,
//       });
//       // setResponse(res.data.message);
//       setMessages((prev) => [...prev, { role: "ai", text: res.data.message }]);
//     } catch (error) {
//       console.error("Error asking coach:", error);
//     }
//   };
//   return (
//     <div
//       style={{
//         backgroundImage: `url(${CoachSection_Img})`,
//         backgroundSize: "cover", // fills entire screen
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         width: "100vw",
//         height: "100vh", // makes it fill screen
//       }}
//     >
//       <div>Select AI Behaviour below according to your mood:</div>
//       <select
//         value={systemContent}
//         onChange={(e) => setSystemContent(e.target.value)}
//       >
//         <option
//           value={
//             "You are a warm, caring listener. Validate feelings with compassion. Respond in short, supportive bullet points."
//           }
//         >
//           Empathetic Listener
//         </option>
//         <option
//           value={
//             "You are a playful, funny friend. Use light sarcasm and jokes to uplift mood. Reply in fun, witty bullet points."
//           }
//         >
//           Comedian Friend
//         </option>
//         <option
//           value={
//             "You are a strict but caring coach. Be direct, push accountability, and motivate with firmness. Respond in bold, action-focused bullet points."
//           }
//         >
//           Tough Love Coach
//         </option>
//         <option
//           value={
//             "You are an investigative coach. Ask probing, curious questions and uncover hidden triggers. Respond in sharp, question-style bullet points"
//           }
//         >
//           Detective Mode
//         </option>
//         <option
//           value={
//             "You are a wise storyteller. Share parables, analogies, and metaphors that inspire. Reply in short, story-like bullet points."
//           }
//         >
//           Storyteller Guide
//         </option>
//         <option
//           value={
//             "You are a data-driven advisor. Share facts, stats, and studies. Always reply in 3–4 short, numbered points with the most relevant data only."
//           }
//         >
//           Data Nerd
//         </option>
//       </select>

//       {/* <input
//         type="text"
//         placeholder="Enter your feelings"
//         value={mood}
//         onChange={(e) => setMood((prev) => [...prev, e.target.value])}
//       /> */}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           askCoach();
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Enter your feelings"
//           value={mood}
//           onChange={changeMood}
//           // onChange={(e) => setMood((prev) => [...prev, {role:"user",text}])}
//         />

//         <button type="submit">Ask Coach</button>
//         {/* <p style={{ whiteSpace: "pre-line" }}>{response}</p> */}
//         {/* {messages.map((msg, index) => (
//         <>
//           <p>{mood}</p>
//           <p key={index}>{msg}</p>
//         </>
//       ))} */}
//       </form>

//       {messages.map((msg, index) => (
//         <p key={index}>{msg.text}</p>
//       ))}
//     </div>
//   );
// };
// export default CoachSection;

// import { useState, useEffect } from "react";
// import API from "../api/axios";
// import "./CoachSection.css";
// import RobotIcon from "../assets/Robot.jpg";

// const CoachSection = () => {
//   const [mood, setMood] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [systemContent, setSystemContent] = useState(
//     "You are an optimistic person who always tries to see the bright side of any situation."
//   );

//   const changeMood = (e) => setMood(e.target.value);

//   useEffect(() => {
//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       event.returnValue = "⚠️ All messages will be lost after refresh.";
//     };
//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
//   }, []);

//   const askCoach = async () => {
//     if (!mood) return;
//     setMessages((prev) => [...prev, { role: "user", text: mood }]);
//     try {
//       const res = await API.post("/coach/", { mood, systemContent });
//       setMessages((prev) => [...prev, { role: "ai", text: res.data.message }]);
//       setMood("");
//     } catch (error) {
//       console.error("Error asking coach:", error);
//     }
//   };

//   return (
//     <div className="coach-section">
//       {/* Floating background elements */}
//       <div className="floating-bg">
//         <div className="bubble bubble-1"></div>
//         <div className="bubble bubble-2"></div>
//         <div className="bubble bubble-3"></div>
//         <div className="bubble bubble-4"></div>
//         <div className="bubble bubble-5"></div>
//         <div className="bubble bubble-6"></div>
//       </div>

//       <div className="chat-container">
//         <h2 className="title">Talk to your AI Coach 🤖</h2>
//         <select
//           value={systemContent}
//           onChange={(e) => setSystemContent(e.target.value)}
//           className="ai-selector"
//         >
//           <option value="You are a warm, caring listener. Validate feelings with compassion. Respond in short, supportive bullet points.">
//             Empathetic Listener
//           </option>
//           <option value="You are a playful, funny friend. Use light sarcasm and jokes to uplift mood. Reply in fun, witty bullet points.">
//             Comedian Friend
//           </option>
//           <option value="You are a strict but caring coach. Be direct, push accountability, and motivate with firmness. Respond in bold, action-focused bullet points.">
//             Tough Love Coach
//           </option>
//           <option value="You are an investigative coach. Ask probing, curious questions and uncover hidden triggers. Respond in sharp, question-style bullet points">
//             Detective Mode
//           </option>
//           <option value="You are a wise storyteller. Share parables, analogies, and metaphors that inspire. Reply in short, story-like bullet points.">
//             Storyteller Guide
//           </option>
//           <option value="You are a data-driven advisor. Share facts, stats, and studies. Always reply in 3–4 short, numbered points with the most relevant data only.">
//             Data Nerd
//           </option>
//         </select>

//         <div className="messages-container">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`message ${
//                 msg.role === "ai" ? "ai-message" : "user-message"
//               }`}
//             >
//               {msg.role === "ai" && (
//                 <img src={RobotIcon} alt="Robot" className="robot-icon" />
//               )}
//               <p>{msg.text}</p>
//             </div>
//           ))}
//         </div>

//         <form
//           className="mood-form"
//           onSubmit={(e) => {
//             e.preventDefault();
//             askCoach();
//           }}
//         >
//           <input
//             type="text"
//             placeholder="Enter your feelings..."
//             value={mood}
//             onChange={changeMood}
//             className="mood-input"
//           />
//           <button type="submit" className="ask-button">
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

import { useState, useEffect, useRef } from "react";
import API from "../api/axios";
import "./CoachSection.css";
import RobotIcon from "../assets/Robot.jpg";

const CoachSection = () => {
  const [mood, setMood] = useState("");
  const [messages, setMessages] = useState([]);
  const [systemContent, setSystemContent] = useState(
    "You are an optimistic person who always tries to see the bright side of any situation."
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const messagesEndRef = useRef(null);

  // Coach persona options with emoji and color for custom dropdown
  const coachOptions = [
    {
      value:
        "You are a warm, caring listener. Validate feelings with compassion. Respond in short, supportive bullet points.",
      label: "Empathetic Listener",
      emoji: "💝",
      color: "#ff9ff3",
    },
    {
      value:
        "You are a playful, witty friend. Respond to the user's message in 4–5 short, funny bullet points.  - Each bullet point must start with a relevant emoji.  - Each bullet must be on its own line.  - Do NOT combine points into a single paragraph.  - Keep points medium-length, crisp, and easy to read.  - Use jokes, sarcasm, and light-hearted humor appropriate for lifting the user's mood.",
      label: "Comedian Friend",
      emoji: "😄",
      color: "#54a0ff",
    },
    {
      value:
        "You are a strict but caring coach. Be direct, push accountability, and motivate with firmness. Respond in bold, action-focused bullet points.",
      label: "Tough Love Coach",
      emoji: "💪",
      color: "#5f27cd",
    },
    {
      value:
        "You are an investigative coach. Ask probing, curious questions and uncover hidden triggers. Respond in sharp, question-style bullet points",
      label: "Detective Mode",
      emoji: "🔍",
      color: "#00d2d3",
    },
    {
      value:
        "You are a wise storyteller. Share parables, analogies, and metaphors that inspire. Reply in short, story-like bullet points.",
      label: "Storyteller Guide",
      emoji: "📚",
      color: "#ff6b6b",
    },
    {
      value:
        "You are a data-driven advisor. Share facts, stats, and studies. Always reply in 3–4 short, numbered points with the most relevant data only.",
      label: "Data Nerd",
      emoji: "📊",
      color: "#4834d4",
    },
  ];

  const selectedOption =
    coachOptions.find((option) => option.value === systemContent) ||
    coachOptions[0];

  const changeMood = (e) => setMood(e.target.value);

  // --- Auto-scroll on new message or while typing ---
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, mood]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "⚠️ All messages will be lost after refresh.";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const askCoach = async () => {
    if (!mood) return;
    setMessages((prev) => [...prev, { role: "user", text: mood }]);
    try {
      const res = await API.post("/coach/", { mood, systemContent });
      setMessages((prev) => [...prev, { role: "ai", text: res.data.message }]);
      setMood("");
    } catch (error) {
      console.error("Error asking coach:", error);
    }
  };

  return (
    <div className="coach-section">
      <div className="floating-bg">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
        <div className="bubble bubble-6"></div>
      </div>

      <div className="chat-container">
        <h2 className="title">Talk to your AI Coach 🤖</h2>

        {/* Custom Dropdown */}
        <div className="custom-dropdown">
          <div
            className="dropdown-selected"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{ borderColor: selectedOption.color }}
          >
            <span className="option-emoji">{selectedOption.emoji}</span>
            <span className="option-label">{selectedOption.label}</span>
            <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>
              ▼
            </span>
          </div>

          {isDropdownOpen && (
            <div className="dropdown-options">
              {coachOptions.map((option, index) => (
                <div
                  key={index}
                  className={`dropdown-option ${
                    option.value === systemContent ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSystemContent(option.value);
                    setIsDropdownOpen(false);
                  }}
                  style={{ borderLeft: `4px solid ${option.color}` }}
                >
                  <span className="option-emoji">{option.emoji}</span>
                  <span className="option-label">{option.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="messages-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.role === "ai" ? "ai-message" : "user-message"
              }`}
            >
              {msg.role === "ai" && (
                <img src={RobotIcon} alt="Robot" className="robot-icon" />
              )}
              <p>
                {msg.text.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          className="mood-form"
          onSubmit={(e) => {
            e.preventDefault();
            askCoach();
          }}
        >
          <input
            type="text"
            placeholder="Enter your feelings..."
            value={mood}
            onChange={changeMood}
            className="mood-input"
          />
          <button type="submit" className="ask-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default CoachSection;

//You are a friendly AI. Respond to the user's stress with general advice. Keep it simple and polite.
//        "You are a funny friend. Respond in 2–3 short sentences using light humor or sarcasm. Make the message playful but brief.",
