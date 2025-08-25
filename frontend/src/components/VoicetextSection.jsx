import { useState, useEffect, useRef } from "react";
import axios from "../api/axios.js";

const VoiceToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [mood, setMood] = useState("Neutral 😐");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert(
        "Your browser does not support Speech Recognition. Please use Chrome."
      );
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        setTranscript(finalTranscript);
        detectMoodAI(finalTranscript); // call AI on final transcript
      }
    };

    recognitionRef.current = recognition;
  }, []);

  const detectMoodAI = async (text) => {
    try {
      const response = await axios.post("/mood/detect", { text });
      setMood(response.data.mood);
    } catch (err) {
      console.error("Mood detection failed", err);
    }
  };

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      setTranscript("");
      setMood("Neutral 😐");
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎙️ Voice to Text & AI Mood Detection</h2>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      <div
        style={{
          marginTop: "20px",
          border: "1px solid gray",
          padding: "10px",
          minHeight: "100px",
        }}
      >
        <strong>Transcript:</strong>
        <p>{transcript || "Start speaking to see text here..."}</p>
      </div>

      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <strong>Mood:</strong> {mood}
      </div>
    </div>
  );
};

export default VoiceToText;
