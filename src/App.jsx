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

const agents = [
  "Astra",
  "Breach",
  "Brimstone",
  "Chamber",
  "Clove",
  "Cypher",
  "Deadlock",
  "Fade",
  "Gekko",
  "Harbor",
  "Iso",
  "Jett",
  "KAY/O",
  "Killjoy",
  "Neon",
  "Omen",
  "Phoenix",
  "Raze",
  "Reyna",
  "Sage",
  "Skye",
  "Sova",
  "Tejo",
  "Viper",
  "Vyse",
  "Waylay",
  "Yoru"
];

const dailyAgent = "Jett";

function App() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const filteredAgents = agents.filter((agent) =>
    agent.toLowerCase().includes(guess.toLowerCase())
  );

  function submitGuess() {
    const cleanGuess = guess.trim();

    if (!cleanGuess || gameOver) return;

    if (guesses.includes(cleanGuess)) {
      setMessage("You already guessed that!");
      return;
    }

    const newGuesses = [...guesses, cleanGuess];
    setGuesses(newGuesses);
    setGuess("");

    if (cleanGuess.toLowerCase() === dailyAgent.toLowerCase()) {
      setMessage("🎉 Correct! You found today's agent!");
      setGameOver(true);
    } else if (newGuesses.length >= 6) {
      setMessage(`❌ Game over! The answer was ${dailyAgent}.`);
      setGameOver(true);
    } else {
      setMessage("❌ Not quite! Try again.");
    }
  }

  function selectSuggestion(agent) {
    setGuess(agent);
  }

  function resetGame() {
    setGuess("");
    setGuesses([]);
    setGameOver(false);
    setMessage("");
  }

  function renderAgentGame() {
    return (
      <section className="game-panel">
        <button
          className="back-button"
          onClick={() => {
            setSelectedMode(null);
            resetGame();
          }}
        >
          ← Back to modes
        </button>

        <div className="game-header">
          <div className="eyebrow">DAILY CHALLENGE</div>

          <h2>Guess the Agent</h2>

          <p>
            Use the clues below to figure out today's VALORANT agent.
          </p>
        </div>

        <div className="clue-container">
          <div className="clue">
            <span className="clue-icon">🎭</span>
            <div>
              <small>ROLE</small>
              <strong>Duelist</strong>
            </div>
          </div>

          <div className="clue">
            <span className="clue-icon">🌍</span>
            <div>
              <small>ORIGIN</small>
              <strong>United States</strong>
            </div>
          </div>

          <div className="clue">
            <span className="clue-icon">⚡</span>
            <div>
              <small>ABILITY TYPE</small>
              <strong>Movement</strong>
            </div>
          </div>

          <div className="clue">
            <span className="clue-icon">🎯</span>
            <div>
              <small>RELEASE ERA</small>
              <strong>Episode 1</strong>
            </div>
          </div>
        </div>

        <div className="guess-area">
          <label htmlFor="agent-guess">YOUR GUESS</label>

          <div className="input-row">
            <input
              id="agent-guess"
              type="text"
              placeholder="Type an agent name..."
              value={guess}
              onChange={(event) => {
                setGuess(event.target.value);
                setMessage("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submitGuess();
                }
              }}
              disabled={gameOver}
            />

            <button
              className="guess-button"
              onClick={submitGuess}
              disabled={gameOver}
            >
              GUESS
            </button>
          </div>

          {guess && !gameOver && filteredAgents.length > 0 && (
            <div className="suggestions">
              {filteredAgents.slice(0, 5).map((agent) => (
                <button
                  key={agent}
                  onClick={() => selectSuggestion(agent)}
                >
                  {agent}
                </button>
              ))}
            </div>
          )}

          {message && (
            <div
              className={`game-message ${
                gameOver && guesses[guesses.length - 1]?.toLowerCase() ===
                  dailyAgent.toLowerCase()
                  ? "success"
                  : "error"
              }`}
            >
              {message}
            </div>
          )}
        </div>

        <div className="attempt-section">
          <div className="attempt-header">
            <span>ATTEMPTS</span>
            <span>{guesses.length} / 6</span>
          </div>

          <div className="attempts">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className={`attempt ${
                  guesses[index] ? "used" : ""
                }`}
              >
                {guesses[index] || "?"}
              </div>
            ))}
          </div>
        </div>

        {gameOver && (
          <button className="reset-button" onClick={resetGame}>
            PLAY AGAIN
          </button>
        )}
      </section>
    );
  }

  function renderPlaceholderGame(mode) {
    return (
      <section className="game-panel">
        <button
          className="back-button"
          onClick={() => setSelectedMode(null)}
        >
          ← Back to modes
        </button>

        <div className="placeholder-game">
          <div className="placeholder-icon">{mode.icon}</div>

          <div className="eyebrow">COMING SOON</div>

          <h2>{mode.title}</h2>

          <p>
            This game mode is currently being built.
            The Agent game is playable right now!
          </p>

          <button
            className="return-button"
            onClick={() => setSelectedMode("agent")}
          >
            PLAY GUESS THE AGENT →
          </button>
        </div>
      </section>
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          className="brand"
          onClick={() => {
            setSelectedMode(null);
            resetGame();
          }}
        >
          <span className="brand-mark">V</span>

          <div>
            <div className="brand-name">VALODLE</div>
            <div className="brand-subtitle">
              A VALORANT guessing game
            </div>
          </div>
        </button>

        <div className="top-actions">
          <button className="icon-button">📊</button>
          <button className="icon-button">⚙️</button>
        </div>
      </header>

      <main className="main-content">
        {!selectedMode ? (
          <>
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
                    className="mode-card"
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                  >
                    <span className="mode-icon">
                      {mode.icon}
                    </span>

                    <span className="mode-title">
                      {mode.title}
                    </span>

                    <span className="mode-description">
                      {mode.description}
                    </span>

                    <span className="play-label">
                      Play →
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
                  Guess the Agent is now playable.
                  More VALODLE modes are coming soon.
                </p>
              </div>
            </section>
          </>
        ) : selectedMode === "agent" ? (
          renderAgentGame()
        ) : (
          renderPlaceholderGame(
            modes.find((mode) => mode.id === selectedMode)
          )
        )}
      </main>

      <footer>
        VALODLE • Fan-made project • Not affiliated with Riot Games
      </footer>
    </div>
  );
}

export default App;