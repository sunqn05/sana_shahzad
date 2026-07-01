import "./Quote.css";
import LiquidEther from "./LiquidEther";

function Quote() {
  return (
    <section className="quote-section">

      <LiquidEther
        colors={[
          "#001B33",
          "#0A4D68",
          "#3FA7D6",
          "#E7D7B2"
        ]}
        mouseForce={12}
        cursorSize={220}
        isViscous
        viscous={45}
        autoDemo
        autoSpeed={0.25}
        autoIntensity={1.2}
      />

      <div className="quote-content">

        <span className="quote-mark">❝</span>

        <h1 className="arabic">
         وَقُل رَّبِّ زِدْنِى عِلْمًۭا
        </h1>

        <p className="translation">
          "My Lord, increase me in knowledge."
        </p>

        <span className="reference">
          — Quran 20:114
        </span>

        <div className="scroll">
          ↓ Scroll to Explore
        </div>

      </div>

    </section>
  );
}

export default Quote;