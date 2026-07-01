import "./LoadingScreen.css";

function LoadingScreen({ fadeOut }) {
  return (
    <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
      <h1 className="loading-logo">S.S</h1>

      <p className="loading-subtitle">
        Portfolio
      </p>

      <div className="wave-loader">
        <span></span>
      </div>
    </div>
  );
}

export default LoadingScreen;