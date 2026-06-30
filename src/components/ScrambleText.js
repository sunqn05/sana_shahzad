import React, { useEffect, useState } from "react";

function ScrambleText({ text }) {
  const [display, setDisplay] = useState("");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);

      iteration += 1 / 3;
    }, 45);

    return () => clearInterval(interval);
  }, [text]);

  return <>{display}</>;
}

export default ScrambleText;