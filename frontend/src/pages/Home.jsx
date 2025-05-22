const Home = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center bg-white"
      style={{ padding: "2rem 0" }}
    >
      <div className="flex flex-col md:flex-row items-center gap-12 w-full max-w-5xl px-2">
        {/* Left: Title and Subtitle */}
        <div className="flex-1 flex flex-col items-start">
          <h1
            className="text-[3rem] md:text-[4rem] font-extrabold leading-none mb-6"
            style={{
              color: "#a259d9",
              fontFamily: "serif",
              lineHeight: 1.05,
            }}
          >
            Welcome to<br />
            BlogSpace
          </h1>
          <p
            className="text-2xl md:text-3xl font-bold text-black"
            style={{
              fontFamily: "serif",
              lineHeight: 1.1,
              marginTop: "1rem",
              maxWidth: "38rem",
            }}
          >
            Share ideas, connect with others,<br />
            and grow your voice through writing.
          </p>
        </div>
        {/* Right: Logo */}
        <div className="flex-1 flex items-center justify-center">
          {/* SVG Logo to match the style in the image */}
          <div
            style={{
              background: "linear-gradient(180deg, #8a38d5 0%, #e06c6c 100%)",
              borderRadius: "0.5rem",
              width: "260px",
              height: "260px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 30px 0 rgba(120, 70, 225, 0.15)",
            }}
          >
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
              <circle cx="90" cy="90" r="72" fill="white" opacity="0.18"/>
              <circle cx="90" cy="90" r="60" fill="white"/>
              <circle cx="90" cy="90" r="55" fill="none" stroke="#a259d9" strokeWidth="6"/>
              <text
                x="50%"
                y="57%"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="56"
                fontWeight="bold"
                fill="#a259d9"
                fontFamily="serif"
                style={{ filter: "drop-shadow(0 2px 2px #eee)" }}
              >
                B
              </text>
              <text
                x="50%"
                y="80%"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="24"
                fill="#8a38d5"
                fontFamily="Arial,sans-serif"
                letterSpacing="4"
                style={{ fontWeight: 700 }}
              >
                BLOGSPACE
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;