import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const updatedHistory = [...history];

  const transition = (mode, replace = false) => {
    if (!replace) {
      setHistory((prev) => [...prev, mode]);
    }
    return setMode(mode);
  };

  const back = () => {
    if (updatedHistory.length > 1) {
      updatedHistory.pop();
      setHistory(updatedHistory);
      return setMode(updatedHistory[updatedHistory.length - 1]);
    }
  };

  return { mode, transition, back };
}
