// import { Quotes } from "../data/QuotesData.js";
// import React from "react";
// const EmojisSection = () => {
//   const emojis = [
//     {
//       emoji: "😀",
//       description: "Happy",
//     },
//     {
//       emoji: "😢",
//       description: "Sad",
//     },
//     {
//       emoji: "😠",
//       description: "Angry",
//     },
//     {
//       emoji: "😣",
//       description: "Frustrated",
//     },
//     {
//       emoji: "😭",
//       description: "Overwhelmed/Crying",
//     },
//   ];

//   const EmojiQuotes = (sk) => {
//     // if (emojis.description === "Happy") {
//     //   console.log("Hi");
//     // }
//     if (sk === "Happy") {
//       return <h1>{Quotes.quote}</h1>;
//     }
//     if (sk === "Happy") {
//       return <h1>Happy</h1>;
//     }
//   };

//   return (
//     <>
//       <h3>Emojis Section</h3>
//       <p>Use the emojis to express your current mental state</p>
//       {emojis.map((emoji, index) => {
//         return (
//           <button key={index} onClick={() => EmojiQuotes(emoji.description)}>
//             {emoji.emoji}
//             {emoji.description}
//           </button>
//         );
//       })}
//     </>
//   );
// };
// export default EmojisSection;

//In the above code why when i click on Happy Happy Quote is not showing ui even if passes the if loop.
//because the ui is not re-rendering after the click event.
//To fix this we need to use useState and set the state of the quote to be displayed.

//steps for the useEffect will be return in alphabetical order
/*Thumb Rule for useEffect Dependencies
If you use a variable inside a useEffect (like a state, prop, or derived value), 
you should include it in the dependency array. */

// import { Quotes } from "../data/QuotesData.js";
// import React, { useState, useEffect } from "react";

// // step b: helper to get today's date key(eg: "2025-07-14")
// // const getTodayKey = () => {
// //   return new Date().toISOString().split("T")[0]; //returns date in YYYY-MM-DD format
// // };
// const getTodayKey = () => "2025-08-03"; // 🔄 Hardcoded for testing

// const EmojisSection = () => {
//   const [selectedMood, setSelectedMood] = useState("");
//   const [moodQuoteIndexMap, setMoodQuoteIndexMap] = useState({});
//   const [isMoodSaved, setIsMoodSaved] = useState(false);
//   const [savedTime, setSavedTime] = useState(null);
//   const emojis = [
//     {
//       emojiz: "😀",
//       description: "Happy",
//     },
//     {
//       emojiz: "😢",
//       description: "Sad",
//     },
//     {
//       emojiz: "😠",
//       description: "Angry",
//     },
//     {
//       emojiz: "😣",
//       description: "Frustrated",
//     },
//     {
//       emojiz: "😭",
//       description: "Overwhelmed/Crying",
//     },
//   ];

//   //step a: it will help to get today's date in a specific format
//   const todayKey = getTodayKey();

//   //step b:what if the user just clicks on the emoji and doesn't save the mood?
//   useEffect(() => {
//     if (selectedMood && !isMoodSaved) {
//       localStorage.setItem(`selectedMood_${todayKey}`, selectedMood);
//     }
//   }, [selectedMood, isMoodSaved, todayKey]);
//   /*why we are mentioning isMoodSaved in the dependency?
//   as we use it in the useEffect we should mention it according to the thumb rule otherwise it may use stale values.
//   Q2:why do we need todayKey in the dependency array? is it only for thumb rule?
//   Not only for thumb rule.
//   with todaykey in dependency-
//   Day 1 (2025-07-10)
// ┌──────────────────────────────┐
// │ User clicks "Happy" at 11:59 │
// ├──────────────────────────────┤
// │ selectedMood = "Happy"       │
// │ todayKey = "2025-07-10"      │
// │ localStorage.setItem(        │
// │   "selectedMood_2025-07-10", │
// │   "Happy"                    │
// │ )                            │
// └──────────────────────────────┘

// Day 2 (2025-07-11)
// ┌──────────────────────────────┐
// │ Page reloads at 12:01 AM     │
// ├──────────────────────────────┤
// │ todayKey = "2025-07-11"      │
// │ `useEffect` re-runs because  │
// │   todayKey changed           │
// │ Again sets:                  │
// │   "selectedMood_2025-07-11"  │
// └──────────────────────────────┘

//   without todayKey in dependency:
//   Day 1 (2025-07-10)
// ✔ Same as before

// Day 2 (2025-07-11)
// ┌──────────────────────────────┐
// │ Page reloads at 12:01 AM     │
// ├──────────────────────────────┤
// │ todayKey = "2025-07-11"      │
// │ BUT useEffect does NOT run!  │
// │ (Because selectedMood &      │
// │  isMoodSaved didn’t change)  │
// │                              │
// │ So nothing is saved for      │
// │ selectedMood_2025-07-11      │
// └──────────────────────────────┘
// ➡️ 😓 The new day's mood isn't stored. App behaves like nothing is selected!

//   */

//   //step c: what happens if the user tries to save the mood
//   /*Q1: why we use if(selectedMood) eventhough the button appears only when the selectedMood is true? for future purpose if any developer try to access the function it should not work without selecting in someother places */
//   const handleSaveMood = () => {
//     if (selectedMood) {
//       const timestamp = new Date().toLocaleTimeString(); //get the current time in HH:MM:SS format  timestamp = "10:15:32 AM";
//       //the true will only get saved as string. as localStorage only saves strings.
//       localStorage.setItem(`isMoodSaved_${todayKey}`, true); //save the mood as true in local storage
//       localStorage.setItem(`savedTime_${todayKey}`, timestamp); //save the time when the mood is saved

//       setIsMoodSaved(true); //set the isMoodSaved state to true
//       setSavedTime(timestamp); //set the savedTime state to the current timestamp you can display:<p>Mood saved at: {savedTime}</p>
//     }
//   };

//   //step d:what happens when user click on single emoji multiple time the quote index changes and it should be saved across refreshes or tab closes.
//   /*for Eg: when the object changes from {Happy:1} to {Happy:2} it needs to get stored in the database right. that's what we are doing here.
//   Q1: why we are using JSON.stringify here?
//   As moodQuoteIndexMap is a JavaScript Object and localStorage only accepts string we are using JSON.stringify which will help us to save as string "{Happy:1}" */
//   useEffect(() => {
//     localStorage.setItem(
//       `quoteMap_${todayKey}`,
//       JSON.stringify(moodQuoteIndexMap)
//     );
//   }, [moodQuoteIndexMap, todayKey]);

//   //step e:whenever today's date changes all the datas should be resetted in the ui. for that we need to get the data from the localstorage
//   useEffect(() => {
//     const savedMap = localStorage.getItem(`quoteMap_${todayKey}`);
//     const mood = localStorage.getItem(`selectedMood_${todayKey}`);
//     const saved = localStorage.getItem(`isMoodSaved_${todayKey}`);
//     const time = localStorage.getItem(`savedTime_${todayKey}`);

//     if (savedMap) setMoodQuoteIndexMap(JSON.parse(savedMap)); // 👈 object like { Happy: 2 }
//     if (mood) setSelectedMood(mood); // 👈 "Happy"
//     if (saved) setIsMoodSaved(JSON.parse(saved)); // 👈 true
//     if (time) setSavedTime(time);
//   }, [todayKey]);
//   /*useEffect(() => {
//   const savedMap = localStorage.getItem(`quoteMap_${todayKey}`);
//   const mood = localStorage.getItem(`selectedMood_${todayKey}`);
//   const saved = localStorage.getItem(`isMoodSaved_${todayKey}`);
//   const time = localStorage.getItem(`savedTime_${todayKey}`);

//   if (savedMap) setMoodQuoteIndexMap(JSON.parse(savedMap));  // 👈 object like { Happy: 2 }
//   if (mood) setSelectedMood(mood);                            // 👈 "Happy"
//   if (saved) setIsMoodSaved(JSON.parse(saved));               // 👈 true
//   if (time) setSavedTime(time);                               // 👈 "10:45 AM"
// }, [todayKey]); */

//   const handleMoodClick = (mood) => {
//     if (isMoodSaved) {
//       console.log("Mood already saved for today");
//       return;
//     }
//     const moodQuotes = Quotes.find(
//       (q) => q.mood.toLowerCase() === mood.toLowerCase()
//     ); //.find helps to find the first element in the array that matches the condition
//     const quotesLength = moodQuotes?.message.length || 0;
//     const currentIndex = moodQuoteIndexMap[mood] || 0; // moodQuoteIndexMap["Happy"] is undefined → fallback to 0(when clicking on first time this happens)
//     const nextIndex = (currentIndex + 1) % quotesLength;
//     setSelectedMood(mood);
//     setMoodQuoteIndexMap((prev) => ({
//       ...prev,
//       [mood]: nextIndex,
//     }));
//   };

//   const getCurrentQuote = () => {
//     const moodQuotes = Quotes.find(
//       (q) => q.mood.toLowerCase() === selectedMood.toLowerCase()
//     );
//     const index = moodQuoteIndexMap[selectedMood] || 0; //for eg: moodQUoteIndexMap["Happy"] and if happy:2 then index will be 2.

//     return moodQuotes?.message[index] || "No quote available for this mood";
//   };

//   return (
//     <>
//       <h3>Emojis Section</h3>
//       <p>Use the emojis to express your current mental state</p>
//       {emojis.map((emoji, index) => {
//         return (
//           <>
//             <button
//               key={index}
//               onClick={() => {
//                 handleMoodClick(emoji.description);
//               }}
//               disabled={isMoodSaved}
//             >
//               {emoji.emojiz}
//               {emoji.description}
//             </button>
//           </>
//         );
//       })}
//       {selectedMood && (
//         <div>
//           <h4>{selectedMood} Quote:</h4>
//           <p>{getCurrentQuote()}</p>

//           {!isMoodSaved && <button onClick={handleSaveMood}>Save Mood</button>}

//           {isMoodSaved && (
//             <p>
//               Mood saved for today
//               {savedTime && <span>at {savedTime}</span>}
//             </p>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default EmojisSection;

import { Helmet } from "react-helmet-async";
import { Quotes } from "../data/QuotesData.js";
import React, { useState, useEffect } from "react";

// step b: helper to get today's date key(eg: "2025-07-14")
const getTodayKey = () => {
  return new Date().toISOString().split("T")[0]; //returns date in YYYY-MM-DD format
};
// const getTodayKey = () => "2025-08-28"; // 🔄 Hardcoded for testing

const EmojisSection = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [moodQuoteIndexMap, setMoodQuoteIndexMap] = useState({});
  const [isMoodSaved, setIsMoodSaved] = useState(false);
  const [savedTime, setSavedTime] = useState(null);

  // 💙 NEW: flag to wait for localStorage data load
  const [isInitialized, setIsInitialized] = useState(false);

  // 🟦 NEW: Store global quote index across days
  const [quoteTracker, setQuoteTracker] = useState({}); // 🟦 NEW

  const emojis = [
    {
      emojiz: "😀",
      description: "Happy",
    },
    {
      emojiz: "😢",
      description: "Sad",
    },
    {
      emojiz: "😠",
      description: "Angry",
    },
    {
      emojiz: "😣",
      description: "Frustrated",
    },
    {
      emojiz: "😭",
      description: "Overwhelmed/Crying",
    },
  ];

  //step a: it will help to get today's date in a specific format
  const todayKey = getTodayKey();

  //step b:what if the user just clicks on the emoji and doesn't save the mood?
  useEffect(() => {
    if (selectedMood && !isMoodSaved) {
      localStorage.setItem(`selectedMood_${todayKey}`, selectedMood);
    }
  }, [selectedMood, isMoodSaved, todayKey]);
  /*why we are mentioning isMoodSaved in the dependency?
  as we use it in the useEffect we should mention it according to the thumb rule otherwise it may use stale values.
  Q2:why do we need todayKey in the dependency array? is it only for thumb rule? 
  Not only for thumb rule.
  with todaykey in dependency-
  Day 1 (2025-07-10)
┌──────────────────────────────┐
│ User clicks "Happy" at 11:59 │
├──────────────────────────────┤
│ selectedMood = "Happy"       │
│ todayKey = "2025-07-10"      │
│ localStorage.setItem(        │
│   "selectedMood_2025-07-10", │
│   "Happy"                    │
│ )                            │
└──────────────────────────────┘

Day 2 (2025-07-11)
┌──────────────────────────────┐
│ Page reloads at 12:01 AM     │
├──────────────────────────────┤
│ todayKey = "2025-07-11"      │
│ `useEffect` re-runs because  │
│   todayKey changed           │
│ Again sets:                  │
│   "selectedMood_2025-07-11"  │
└──────────────────────────────┘

  without todayKey in dependency:
  Day 1 (2025-07-10)
✔ Same as before

Day 2 (2025-07-11)
┌──────────────────────────────┐
│ Page reloads at 12:01 AM     │
├──────────────────────────────┤
│ todayKey = "2025-07-11"      │
│ BUT useEffect does NOT run!  │
│ (Because selectedMood &      │
│  isMoodSaved didn’t change)  │
│                              │
│ So nothing is saved for      │
│ selectedMood_2025-07-11      │
└──────────────────────────────┘
➡️ 😓 The new day's mood isn't stored. App behaves like nothing is selected!

  */

  //step c: what happens if the user tries to save the mood
  /*Q1: why we use if(selectedMood) eventhough the button appears only when the selectedMood is true? for future purpose if any developer try to access the function it should not work without selecting in someother places */
  const handleSaveMood = () => {
    if (selectedMood) {
      const timestamp = new Date().toLocaleTimeString(); //get the current time in HH:MM:SS format  timestamp = "10:15:32 AM";
      //the true will only get saved as string. as localStorage only saves strings.
      // localStorage.setItem(
      //   `quoteMap_${todayKey}`,
      //   JSON.stringify(moodQuoteIndexMap)
      // );
      localStorage.setItem(`isMoodSaved_${todayKey}`, true); //save the mood as true in local storage
      localStorage.setItem(`savedTime_${todayKey}`, timestamp); //save the time when the mood is saved

      setIsMoodSaved(true); //set the isMoodSaved state to true
      setSavedTime(timestamp); //set the savedTime state to the current timestamp you can display:<p>Mood saved at: {savedTime}</p>
    }
  };

  //step d:what happens when user click on single emoji multiple time the quote index changes and it should be saved across refreshes or tab closes.
  /*for Eg: when the object changes from {Happy:1} to {Happy:2} it needs to get stored in the database right. that's what we are doing here.
  Q1: why we are using JSON.stringify here? 
  As moodQuoteIndexMap is a JavaScript Object and localStorage only accepts string we are using JSON.stringify which will help us to save as string "{Happy:1}" */
  useEffect(() => {
    localStorage.setItem(
      `quoteMap_${todayKey}`,
      JSON.stringify(moodQuoteIndexMap)
    );
  }, [moodQuoteIndexMap, todayKey]);

  //step e:whenever today's date changes all the datas should be resetted in the ui. for that we need to get the data from the localstorage
  useEffect(() => {
    const savedMap = localStorage.getItem(`quoteMap_${todayKey}`);
    const mood = localStorage.getItem(`selectedMood_${todayKey}`);
    const saved = localStorage.getItem(`isMoodSaved_${todayKey}`);
    const time = localStorage.getItem(`savedTime_${todayKey}`);

    if (savedMap) setMoodQuoteIndexMap(JSON.parse(savedMap)); // 👈 object like { Happy: 2 }
    if (mood) setSelectedMood(mood); // 👈 "Happy"
    if (saved) setIsMoodSaved(JSON.parse(saved)); // 👈 true
    if (time) setSavedTime(time);

    // 🟦 NEW: Load quoteTracker from localStorage
    const storedTracker = localStorage.getItem("quoteTracker"); // 🟦
    if (storedTracker) setQuoteTracker(JSON.parse(storedTracker)); // 🟦

    // 💙 NEW: Set flag after all localStorage values restored
    setIsInitialized(true);
  }, [todayKey]);
  /*useEffect(() => {
  const savedMap = localStorage.getItem(`quoteMap_${todayKey}`);
  const mood = localStorage.getItem(`selectedMood_${todayKey}`);
  const saved = localStorage.getItem(`isMoodSaved_${todayKey}`);
  const time = localStorage.getItem(`savedTime_${todayKey}`);

  if (savedMap) setMoodQuoteIndexMap(JSON.parse(savedMap));  // 👈 object like { Happy: 2 }
  if (mood) setSelectedMood(mood);                            // 👈 "Happy"
  if (saved) setIsMoodSaved(JSON.parse(saved));               // 👈 true
  if (time) setSavedTime(time);                               // 👈 "10:45 AM"
}, [todayKey]); */

  const handleMoodClick = (mood) => {
    // 💙 NEW: Don’t allow clicks before localStorage is loaded
    if (!isInitialized) return;

    if (isMoodSaved) {
      console.log("Mood already saved for today");
      return;
    }
    const moodQuotes = Quotes.find(
      (q) => q.mood.toLowerCase() === mood.toLowerCase()
    ); //.find helps to find the first element in the array that matches the condition
    const quotesLength = moodQuotes?.message.length || 0;
    const currentIndex = quoteTracker[mood] || 0; // moodQuoteIndexMap["Happy"] is undefined → fallback to 0(when clicking on first time this happens)
    const nextIndex = (currentIndex + 1) % quotesLength;

    // 🟦 Update global tracker state and localStorage
    setQuoteTracker((prev) => {
      const updated = { ...prev, [mood]: nextIndex };
      localStorage.setItem("quoteTracker", JSON.stringify(updated)); // 🟦
      return updated;
    });

    setSelectedMood(mood);
    setMoodQuoteIndexMap((prev) => ({
      ...prev,
      [mood]: nextIndex,
    }));
  };

  const getCurrentQuote = () => {
    const moodQuotes = Quotes.find(
      (q) => q.mood.toLowerCase() === selectedMood.toLowerCase()
    );
    // const index = moodQuoteIndexMap[selectedMood] || 0; //for eg: moodQUoteIndexMap["Happy"] and if happy:2 then index will be 2.
    const index = quoteTracker[selectedMood] || 0; // 🟦 Use global tracker instead
    return moodQuotes?.message[index] || "No quote available for this mood";
  };

  return (
    <>
      <Helmet>
        <title>😊 Emojis Section</title>
      </Helmet>
      <h3>Emojis Section</h3>
      <p>Use the emojis to express your current mental state</p>
      {emojis.map((emoji, index) => {
        return (
          <button
            key={index}
            onClick={() => handleMoodClick(emoji.description)}
            disabled={isMoodSaved}
            className={
              selectedMood === emoji.description ? "selected-emoji" : ""
            }
          >
            {emoji.emojiz} {emoji.description}
          </button>
        );
      })}
      {selectedMood && (
        <div>
          <h4>{selectedMood} Quote:</h4>
          <p>{getCurrentQuote()}</p>

          {!isMoodSaved && <button onClick={handleSaveMood}>Save Mood</button>}

          {isMoodSaved && (
            <p>
              Mood saved for today
              {savedTime && <span>at {savedTime}</span>}
            </p>
          )}
        </div>
      )}
      {/* 🔽 Embed CSS here */}
      <style>
        {`
        button {
          margin: 8px;
          padding: 8px 12px;
          font-size: 16px;
          cursor: pointer;
        }

        .selected-emoji {
          background-color: #e0f7fa;
          border: 2px solid #0288d1;
          border-radius: 8px;
          font-weight: bold;
          color: #0288d1;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}
      </style>
    </>
  );
};

export default EmojisSection;
