import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPoints, setPoints } from "../redux/userSlice";
import { selectPoints } from "../redux/userSlice";
import API from "../api/axios";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const GamesSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const globalPoints = useSelector(selectPoints); //this line is to get the points from the redux store.

  const [questions, setQuestions] = useState([]);
  // const [selectedOption, setSelectedOption] = useState(null);
  const [quizDay, setQuizDay] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scoreThisSession, setScoreThisSession] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [userId, setUserId] = useState(null);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  useEffect(() => {
    const fetchDailyQuiz = async () => {
      try {
        const response = await API.get(
          "/quiz/daily?userId=68955900ea39ddff800e24ba"
        ); //From the frontend React app, send an HTTP GET request to your backend at the route /quiz/daily.
        // const response = await API.get("/quiz/daily", { withCredentials: true });

        console.log("Quiz response:", response.data);
        setUserId(response.data.userId);

        if (response.data.quizCompleted) {
          setAlreadyCompleted(true);
          setQuizCompleted(true);
        } else {
          setQuestions(response.data.quizzes);
          setAlreadyCompleted(false);
        }
        setQuizDay(response.data.quizDay);
        dispatch(setPoints(Number(response.data.points) || 0)); //will get points from backend and will set as global using dispatch method
        setLoading(false);
      } catch (err) {
        setError("Failed to load quiz questions", err.message);
        setLoading(false);
      }
    };
    fetchDailyQuiz();
  }, [dispatch]); //we want our effect to run only once so we dispatch which will not change

  const handleOptionClick = (questionIndex, optionIndex) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionIndex]: optionIndex, //{0:1,1:3}=>{question,answer}
    }));
  };

  const handleComplete = async () => {
    console.log("handleComplete called with score:", scoreThisSession, userId);
    try {
      setLoading(true);

      const requestedData = {
        points: scoreThisSession,
        userId: userId,
      };
      console.log("Sending request:", requestedData);

      const response = await API.patch("/quiz/updatePoints", requestedData);
      console.log("Response received", response.data);
      if (response.data.status === "success") {
        dispatch(
          setPoints(response.data.newPoints || globalPoints + scoreThisSession)
        );
        setQuizCompleted(true);
        alert("Points saved Successfully!");
      }
    } catch (err) {
      console.error("Failed to save points:", err);

      // Give user option to retry or continue offline
      const shouldRetry = window.confirm(
        "Failed to save your points. Would you like to try again?"
      );

      if (shouldRetry) {
        handleComplete(); // Retry
      } else {
        // Continue offline - update Redux only
        dispatch(setPoints(globalPoints + scoreThisSession));
        setQuizCompleted(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    const selected = selectedOptions[currentIndex];
    /*Because in JavaScript objects, selectedOptions[0] means:
"Get the value for the key 0 in this object." */
    if (selected === undefined) {
      alert("Please select an option");
      return;
    }

    const currentQuestion = questions[currentIndex];

    if (selected === currentQuestion.answerIndex) {
      dispatch(addPoints(10));
      setScoreThisSession((prev) => prev + 10);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleComplete();
      // setQuizCompleted(true);
    }
  };

  //   const handleNext = () => {
  //     alert(`You selected option: ${selectedOption}`);
  //     if (selectedOption === null) {
  //       alert("Please select an option");
  //       return;
  //     }

  //     const currentQuestion = questions[currentIndex];
  //     /*const questions = [
  //   {
  //     questionText: "Which activity reduces stress?",
  //     options: ["Deep breathing", "Skipping meals", "Multitasking", "Overthinking"],
  //     answerIndex: 0 // means correct answer is options[0] => "Deep breathing"
  //   },
  //   {
  //     questionText: "Best way to stay hydrated?",
  //     options: ["Drink water", "Drink soda", "Drink coffee", "Ignore thirst"],
  //     answerIndex: 0
  //   }
  // ];
  // const currentQuestion = questions[currentIndex]; this will lead to first question
  //  */
  //     if (selectedOption === currentQuestion.answerIndex) {
  //       dispatch(addPoints(10));
  //       setScoreThisSession(scoreThisSession + 10);
  //     }
  //     setSelectedOption(null);
  //     if (currentIndex + 1 < questions.length) {
  //       setCurrentIndex(currentIndex + 1);
  //     } else {
  //       setQuizCompleted(true);
  //     }
  //   };

  //the belwo code like isLoading,isQuizCompleted will run first and if it is true it will returned and it will not go to the next statement till it becomes false
  if (loading) {
    return (
      <>
        <Helmet>
          <title>🎮 Games Section</title>
        </Helmet>
        <p>Loading questions...</p>
      </>
    );
  }
  if (error) {
    return (
      <>
        ;<p>Error: {error}</p>
      </>
    );
  }

  if (alreadyCompleted) {
    return (
      <div>
        <h3>Quiz Already Completed</h3>
        <p>You have already completed today's quiz</p>
        <p>Come back tomorrow for new questions!</p>
        <p>Your total points: {globalPoints}</p>
        <p>Wow!Go to products sections and buy products</p>
        <button onClick={() => navigate("/DashBoardPage/ProductsSection")}>
          Go to Products!!
        </button>
        <button onClick={() => navigate("/DashBoardPage")}>
          Back to DashBoard
        </button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <>
        <h2>Quiz Completed</h2>
        <p>You scored {scoreThisSession} points this session</p>
        <p>Your total points is {globalPoints}</p>
      </>
    );
  }
  return (
    <>
      <h2>Your global points is {globalPoints}</h2>
      <h2>
        Quiz Day {quizDay} - Question {currentIndex + 1}/{questions.length}
      </h2>

      {/* Display only the current question */}
      {questions.length > 0 && (
        <div>
          <h2>{questions[currentIndex].questionText}</h2>
          {questions[currentIndex].options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              value={option}
              onClick={() => handleOptionClick(currentIndex, optionIndex)}
              style={{
                backgroundColor:
                  selectedOptions[currentIndex] === optionIndex
                    ? "lightblue"
                    : "",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {currentIndex < 9 ? (
        <button onClick={handleNext}>Next</button>
      ) : (
        <button onClick={handleComplete}>Complete</button>
      )}
    </>
  );
};
export default GamesSection;
