import React, { useEffect, useRef } from "react";
import "./BinaryReveal.css";

function BinaryReveal({
  src,
  alt = "",
  className = "",
  radius = 70,
}) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const image = imageRef.current;

    if (!canvas || !wrapper || !image) return;

    const ctx = canvas.getContext("2d");

    let mouseX = -1000;
    let mouseY = -1000;

    let targetX = -1000;
    let targetY = -1000;

    let isHovering = false;
    let animationFrame;

    const binaryChars = ["0", "1"];

    const resizeCanvas = () => {
      const rect = wrapper.getBoundingClientRect();

      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (event) => {
      const rect = wrapper.getBoundingClientRect();

      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;

      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;

      targetX = -1000;
      targetY = -1000;
    };

    const drawBinaryReveal = () => {
      const rect = wrapper.getBoundingClientRect();

      ctx.clearRect(0, 0, rect.width, rect.height);

      mouseX = targetX;
      mouseY = targetY;

      if (isHovering || mouseX > -500) {
        ctx.save();

        ctx.beginPath();
        ctx.arc(
          mouseX,
          mouseY,
          radius,
          0,
          Math.PI * 2
        );

        ctx.clip();

        const fontSize = 14;
        const spacingX = 10;
        const spacingY = 14;

        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (
          let y = mouseY - radius;
          y < mouseY + radius;
          y += spacingY
        ) {
          for (
            let x = mouseX - radius;
            x < mouseX + radius;
            x += spacingX
          ) {
            const distance = Math.sqrt(
              (x - mouseX) ** 2 +
              (y - mouseY) ** 2
            );

            if (distance > radius) continue;

            const fade =
              1 -
              distance /
                radius;

            const char =
              binaryChars[
                Math.floor(
                  Math.random() *
                    binaryChars.length
                )
              ];

            ctx.fillStyle = `rgba(
              220,
              240,
              255,
              ${0.2 + fade * 0.8}
            )`;

            ctx.fillText(
              char,
              x,
              y
            );
          }
        }

        ctx.restore();
      }

      animationFrame =
        requestAnimationFrame(
          drawBinaryReveal
        );
    };

    resizeCanvas();

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    wrapper.addEventListener(
      "mousemove",
      handleMouseMove
    );

    wrapper.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    drawBinaryReveal();

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resizeCanvas
      );

      wrapper.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      wrapper.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, [radius]);

  return (
    <div
      ref={wrapperRef}
      className={`binary-reveal ${className}`}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="binary-reveal-image"
        draggable="false"
      />

      <canvas
        ref={canvasRef}
        className="binary-reveal-canvas"
      />
    </div>
  );
}

export default BinaryReveal;