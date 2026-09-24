import { useState } from "react";

const modes = [
  {
    id: "agent",
    icon: "🎯",
    title: "Guess the Agent",
    description: "Use clues to identify today's agent."
  },
  {
    id: "voiceline",
    icon: "🔊",
    title: "Guess the Voiceline",
    description: "Recognise the voice before the timer runs out."
  },
  {
    id: "skin",
    icon: "🔫",
    title: "Guess the Skin",
    description: "Identify the weapon skin from the clues."
  },
  {
    id: "finisher",
    icon: "💥",
    title: "Guess the Finisher",
    description: "Name the finisher from its visual clues."
  },
  {
    id: "map",
    icon: "🗺️",
    title: "Guess the Map",
    description: "Decode the map from emojis."
  }
];

function App() {
  const [selectedMode, setSelectedMode] = useState(null);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">V</span>

          <div>
            <div className="brand-name">VALODLE</div>
            <div className="brand-subtitle">
              A VALORANT guessing game
            </div>
          </div>
        </div>

        <div className="top-actions">
          <button className="icon-button">📊</button>
          <button className="icon-button">⚙️</button>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <div className="eyebrow">DAILY CHALLENGE</div>

          <h1>
            How well do you know <span>VALORANT?</span>
          </h1>

          <p>
            Pick a mode and test your VALORANT knowledge.
            New challenges will be added as the project grows.
          </p>

          <div className="streak-card">
            <div>
              <strong>🔥 0</strong>
              <span>Current streak</span>
            </div>

            <div>
              <strong>0</strong>
              <span>Played today</span>
            </div>

            <div>
              <strong>—</strong>
              <span>Next challenge</span>
            </div>
          </div>
        </section>

        <section className="modes">
          <div className="section-heading">
            <div>
              <div className="eyebrow">GAME MODES</div>
              <h2>Choose your challenge</h2>
            </div>

            <span className="mode-count">
              {modes.length} modes
            </span>
          </div>

          <div className="mode-grid">
            {modes.map((mode) => (
              <button
                className={`mode-card ${
                  selectedMode === mode.id ? "selected" : ""
                }`}
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
              >
                <span className="mode-icon">{mode.icon}</span>

                <span className="mode-title">
                  {mode.title}
                </span>

                <span className="mode-description">
                  {mode.description}
                </span>

                <span className="play-label">
                  {selectedMode === mode.id
                    ? "Selected ✓"
                    : "Play →"}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="coming-soon">
          <div className="coming-icon">⚡</div>

          <div>
            <div className="eyebrow">NEXT UP</div>

            <h3>Daily puzzles, streaks & stats</h3>

            <p>
              The basic shell is ready. Next we'll turn each
              mode into a playable puzzle.
            </p>
          </div>
        </section>
      </main>

      <footer>
        VALODLE • Fan-made project • Not affiliated with Riot Games
      </footer>
    </div>
  );
}

export default App;