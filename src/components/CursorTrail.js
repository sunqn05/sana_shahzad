import React, { useEffect, useState } from "react";
import "./CursorTrail.css";

function CursorTrail() {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const move = (e) => {
      const newDot = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };

      setDots((prev) => [...prev.slice(-10), newDot]);

      setTimeout(() => {
        setDots((prev) => prev.filter((dot) => dot.id !== newDot.id));
      }, 500);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="cursor-trail">
      {dots.map((dot) => (
        <span
          key={dot.id}
          style={{
            left: dot.x,
            top: dot.y,
          }}
        />
      ))}
    </div>
  );
}

export default CursorTrail;