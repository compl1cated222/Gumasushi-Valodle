import { useMemo, useState } from "react";

const modes = [
  {
    id: "agent",
    icon: "🎯",
    title: "Guess the Agent",
    description: "Use clues to identify today's agent.",
  },
  {
    id: "voiceline",
    icon: "🔊",
    title: "Guess the Voiceline",
    description: "Recognise the voice before the timer runs out.",
  },
  {
    id: "skin",
    icon: "🔫",
    title: "Guess the Skin",
    description: "Identify the weapon skin from the clues.",
  },
  {
    id: "finisher",
    icon: "💥",
    title: "Guess the Finisher",
    description: "Name the finisher from its clues.",
  },
  {
    id: "map",
    icon: "🗺️",
    title: "Guess the Map",
    description: "Decode the map from emojis.",
  },
];

/*
 * Starter agent database.
 * We can expand this later with every current VALORANT agent.
 */
const agents = [
  {
    name: "Astra",
    role: "Controller",
    origin: "Ghana",
    release: "Episode 2",
    color: "Cosmic",
  },
  {
    name: "Breach",
    role: "Initiator",
    origin: "Sweden",
    release: "Episode 1",
    color: "Tech",
  },
  {
    name: "Brimstone",
    role: "Controller",
    origin: "United States",
    release: "Episode 1",
    color: "Military",
  },
  {
    name: "Chamber",
    role: "Sentinel",
    origin: "France",
    release: "Episode 3",
    color: "Tech",
  },
  {
    name: "Clove",
    role: "Controller",
    origin: "Scotland",
    release: "Episode 8",
    color: "Mystical",
  },
  {
    name: "Cypher",
    role: "Sentinel",
    origin: "Morocco",
    release: "Episode 1",
    color: "Tech",
  },
  {
    name: "Deadlock",
    role: "Sentinel",
    origin: "Norway",
    release: "Episode 7",
    color: "Tech",
  },
  {
    name: "Fade",
    role: "Initiator",
    origin: "Türkiye",
    release: "Episode 4",
    color: "Nightmare",
  },
  {
    name: "Gekko",
    role: "Initiator",
    origin: "United States",
    release: "Episode 6",
    color: "Creature",
  },
  {
    name: "Harbor",
    role: "Controller",
    origin: "India",
    release: "Episode 5",
    color: "Water",
  },
  {
    name: "Iso",
    role: "Duelist",
    origin: "China",
    release: "Episode 7",
    color: "Energy",
  },
  {
    name: "Jett",
    role: "Duelist",
    origin: "South Korea",
    release: "Episode 1",
    color: "Wind",
    image:
      "https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png",
  },
  {
    name: "KAY/O",
    role: "Initiator",
    origin: "Alternate Future",
    release: "Episode 3",
    color: "Machine",
  },
  {
    name: "Killjoy",
    role: "Sentinel",
    origin: "Germany",
    release: "Episode 1",
    color: "Tech",
  },
  {
    name: "Neon",
    role: "Duelist",
    origin: "Philippines",
    release: "Episode 4",
    color: "Electric",
  },
  {
    name: "Omen",
    role: "Controller",
    origin: "Unknown",
    release: "Episode 1",
    color: "Shadow",
  },
  {
    name: "Phoenix",
    role: "Duelist",
    origin: "United Kingdom",
    release: "Episode 1",
    color: "Fire",
  },
  {
    name: "Raze",
    role: "Duelist",
    origin: "Brazil",
    release: "Episode 1",
    color: "Explosive",
  },
  {
    name: "Reyna",
    role: "Duelist",
    origin: "Mexico",
    release: "Episode 1",
    color: "Soul",
  },
  {
    name: "Sage",
    role: "Sentinel",
    origin: "China",
    release: "Episode 1",
    color: "Radiant",
  },
  {
    name: "Skye",
    role: "Initiator",
    origin: "Australia",
    release: "Episode 1",
    color: "Nature",
  },
  {
    name: "Sova",
    role: "Initiator",
    origin: "Russia",
    release: "Episode 1",
    color: "Tech",
  },
  {
    name: "Tejo",
    role: "Initiator",
    origin: "Colombia",
    release: "Episode 8",
    color: "Tech",
  },
  {
    name: "Viper",
    role: "Controller",
    origin: "United States",
    release: "Episode 1",
    color: "Chemical",
  },
  {
    name: "Vyse",
    role: "Sentinel",
    origin: "Unknown",
    release: "Episode 9",
    color: "Metal",
  },
  {
    name: "Waylay",
    role: "Duelist",
    origin: "Thailand",
    release: "Episode 10",
    color: "Light",
  },
  {
    name: "Yoru",
    role: "Duelist",
    origin: "Japan",
    release: "Episode 2",
    color: "Rift",
  },
];

const dailyAgent = "Jett";

function App() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const answer = agents.find((agent) => agent.name === dailyAgent);

  const filteredAgents = useMemo(() => {
    if (!guess.trim()) return [];

    return agents
      .filter((agent) =>
        agent.name.toLowerCase().includes(guess.toLowerCase())
      )
      .filter(
        (agent) =>
          !guesses.some(
            (previous) =>
              previous.toLowerCase() === agent.name.toLowerCase()
          )
      )
      .slice(0, 6);
  }, [guess, guesses]);

  function submitGuess() {
    const cleanGuess = guess.trim();

    if (!cleanGuess || gameOver) return;

    const selectedAgent = agents.find(
      (agent) => agent.name.toLowerCase() === cleanGuess.toLowerCase()
    );

    if (!selectedAgent) {
      setMessage("Choose an agent from the list.");
      return;
    }

    if (
      guesses.some(
        (previous) =>
          previous.toLowerCase() === selectedAgent.name.toLowerCase()
      )
    ) {
      setMessage("You already guessed that agent.");
      return;
    }

    const newGuesses = [...guesses, selectedAgent.name];

    setGuesses(newGuesses);
    setGuess("");

    if (selectedAgent.name.toLowerCase() === dailyAgent.toLowerCase()) {
      setMessage("Correct! You found today's agent.");
      setGameOver(true);
    } else if (newGuesses.length >= 6) {
      setMessage(`The answer was ${dailyAgent}.`);
      setGameOver(true);
    } else {
      setMessage("Not quite. Keep searching.");
    }
  }

  function selectSuggestion(agentName) {
    setGuess(agentName);
    setMessage("");
  }

  function resetGame() {
    setGuess("");
    setGuesses([]);
    setGameOver(false);
    setMessage("");
  }

  function goHome() {
    setSelectedMode(null);
    resetGame();
  }

  function getMatchClass(value, answerValue) {
    return value === answerValue ? "match" : "no-match";
  }

  function renderAgentGame() {
    const revealLevel = Math.min(guesses.length, 3);

    return (
      <section className="agent-game">
        <button className="back-button" onClick={goHome}>
          <span>←</span> ALL MODES
        </button>

        <div className="agent-game-heading">
          <div>
            <div className="eyebrow">DAILY AGENT</div>
            <h1>WHO IS THIS AGENT?</h1>
            <p>
              Use the clues and your previous guesses to identify today's
              mystery agent.
            </p>
          </div>

          <div className="attempt-counter">
            <span>ATTEMPTS</span>
            <strong>{guesses.length}/6</strong>
          </div>
        </div>

        <div className="agent-layout">
          {/* LEFT: CHARACTER */}
          <div className="portrait-card">
            <div className="portrait-top">
              <span className="portrait-label">
                {gameOver ? "IDENTITY REVEALED" : "UNKNOWN AGENT"}
              </span>

              <span className="portrait-number">
                {String(Math.max(1, revealLevel)).padStart(2, "0")}
              </span>
            </div>

            <div
              className={`agent-portrait reveal-${revealLevel} ${
                gameOver ? "revealed" : ""
              }`}
            >
              {answer.image ? (
                <img src={answer.image} alt="Mystery agent" />
              ) : (
                <div className="portrait-fallback">?</div>
              )}

              <div className="portrait-overlay" />

              {!gameOver && (
                <div className="mystery-mark">
                  <span>?</span>
                </div>
              )}

              <div className="portrait-bottom">
                <div className="portrait-role">
                  {gameOver ? answer.role : "UNKNOWN"}
                </div>

                <div className="portrait-name">
                  {gameOver ? answer.name : "MYSTERY AGENT"}
                </div>
              </div>
            </div>

            <div className="reveal-progress">
              <span
                className={revealLevel >= 1 ? "active" : ""}
              />
              <span
                className={revealLevel >= 2 ? "active" : ""}
              />
              <span
                className={revealLevel >= 3 ? "active" : ""}
              />
            </div>

            <p className="reveal-text">
              {gameOver
                ? "Agent identified."
                : revealLevel === 0
                ? "Make a guess to reveal more."
                : revealLevel === 1
                ? "A little more has been revealed."
                : revealLevel === 2
                ? "You're getting closer..."
                : "Most of the portrait is visible."}
            </p>
          </div>

          {/* RIGHT: CLUES + GUESSING */}
          <div className="game-info">
            <div className="clue-panel">
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">INTEL</span>
                  <h2>AGENT CLUES</h2>
                </div>

                <span className="classified">CLASSIFIED</span>
              </div>

              <div className="clue-grid">
                <div
                  className={`clue-card ${
                    revealLevel >= 1 ? "revealed" : ""
                  }`}
                >
                  <span className="clue-icon">◈</span>
                  <div>
                    <small>ROLE</small>
                    <strong>
                      {revealLevel >= 1 ? answer.role : "CLASSIFIED"}
                    </strong>
                  </div>
                </div>

                <div
                  className={`clue-card ${
                    revealLevel >= 2 ? "revealed" : ""
                  }`}
                >
                  <span className="clue-icon">◎</span>
                  <div>
                    <small>ORIGIN</small>
                    <strong>
                      {revealLevel >= 2 ? answer.origin : "CLASSIFIED"}
                    </strong>
                  </div>
                </div>

                <div
                  className={`clue-card ${
                    revealLevel >= 3 ? "revealed" : ""
                  }`}
                >
                  <span className="clue-icon">◷</span>
                  <div>
                    <small>RELEASE</small>
                    <strong>
                      {revealLevel >= 3 ? answer.release : "CLASSIFIED"}
                    </strong>
                  </div>
                </div>

                <div className="clue-card hidden-clue">
                  <span className="clue-icon">✦</span>
                  <div>
                    <small>ABILITY STYLE</small>
                    <strong>???</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="guess-panel">
              <div className="guess-heading">
                <div>
                  <span className="eyebrow">YOUR TURN</span>
                  <h2>ENTER YOUR GUESS</h2>
                </div>

                <span className="remaining">
                  {6 - guesses.length} remaining
                </span>
              </div>

              <div className="guess-input-wrap">
                <span className="search-icon">⌕</span>

                <input
                  type="text"
                  value={guess}
                  placeholder="Search for an agent..."
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
                  disabled={gameOver || !guess.trim()}
                >
                  GUESS
                </button>
              </div>

              {filteredAgents.length > 0 && !gameOver && (
                <div className="suggestions">
                  {filteredAgents.map((agent) => (
                    <button
                      key={agent.name}
                      onClick={() => selectSuggestion(agent.name)}
                    >
                      <span className="suggestion-avatar">
                        {agent.name.charAt(0)}
                      </span>

                      <span>{agent.name}</span>

                      <span className="suggestion-role">
                        {agent.role}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {message && (
                <div
                  className={`game-message ${
                    gameOver &&
                    guesses[guesses.length - 1]?.toLowerCase() ===
                      dailyAgent.toLowerCase()
                      ? "success"
                      : "error"
                  }`}
                >
                  <span>
                    {gameOver &&
                    guesses[guesses.length - 1]?.toLowerCase() ===
                      dailyAgent.toLowerCase()
                      ? "✓"
                      : "!"}
                  </span>

                  {message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* GUESS HISTORY */}
        <div className="history-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">INVESTIGATION LOG</span>
              <h2>PREVIOUS GUESSES</h2>
            </div>

            <span className="history-count">
              {guesses.length} / 6
            </span>
          </div>

          {guesses.length === 0 ? (
            <div className="empty-history">
              <span className="empty-icon">⌁</span>
              <strong>No guesses yet</strong>
              <p>
                Your guesses and their matching attributes will appear here.
              </p>
            </div>
          ) : (
            <div className="guess-table">
              <div className="guess-table-header">
                <span>AGENT</span>
                <span>ROLE</span>
                <span>ORIGIN</span>
                <span>RELEASE</span>
              </div>

              {guesses.map((guessName) => {
                const guessedAgent = agents.find(
                  (agent) => agent.name === guessName
                );

                return (
                  <div className="guess-row" key={guessName}>
                    <div className="guess-agent-name">
                      <span className="agent-mini-avatar">
                        {guessName.charAt(0)}
                      </span>

                      <strong>{guessName}</strong>
                    </div>

                    <div
                      className={getMatchClass(
                        guessedAgent.role,
                        answer.role
                      )}
                    >
                      <span>
                        {guessedAgent.role === answer.role ? "✓" : "×"}
                      </span>
                      {guessedAgent.role}
                    </div>

                    <div
                      className={getMatchClass(
                        guessedAgent.origin,
                        answer.origin
                      )}
                    >
                      <span>
                        {guessedAgent.origin === answer.origin
                          ? "✓"
                          : "×"}
                      </span>
                      {guessedAgent.origin}
                    </div>

                    <div
                      className={getMatchClass(
                        guessedAgent.release,
                        answer.release
                      )}
                    >
                      <span>
                        {guessedAgent.release === answer.release
                          ? "✓"
                          : "×"}
                      </span>
                      {guessedAgent.release}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {gameOver && (
            <div className="game-over-card">
              <div>
                <span className="eyebrow">
                  {guesses.length === 1
                    ? "PERFECT GUESS"
                    : "CHALLENGE COMPLETE"}
                </span>

                <h3>
                  {guesses.length === 1
                    ? "FIRST TRY. CLEAN."
                    : `THE AGENT WAS ${answer.name.toUpperCase()}`}
                </h3>
              </div>

              <button onClick={resetGame}>PLAY AGAIN</button>
            </div>
          )}
        </div>
      </section>
    );
  }

  function renderPlaceholderGame(mode) {
    return (
      <section className="game-panel placeholder-panel">
        <button
          className="back-button"
          onClick={() => setSelectedMode(null)}
        >
          <span>←</span> ALL MODES
        </button>

        <div className="placeholder-game">
          <div className="placeholder-icon">{mode.icon}</div>

          <div className="eyebrow">COMING SOON</div>

          <h2>{mode.title}</h2>

          <p>
            This VALODLE mode is currently being built.
            Guess the Agent is available to play now.
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
        <button className="brand" onClick={goHome}>
          <span className="brand-mark">V</span>

          <div>
            <div className="brand-name">VALODLE</div>
            <div className="brand-subtitle">
              A VALORANT guessing game
            </div>
          </div>
        </button>

        <div className="top-actions">
          <button className="icon-button">◫</button>
          <button className="icon-button">⚙</button>
        </div>
      </header>

      <main className="main-content">
        {!selectedMode ? (
          <>
            <section className="hero">
              <div className="eyebrow">DAILY CHALLENGE</div>

              <h1>
                HOW WELL DO YOU KNOW <span>VALORANT?</span>
              </h1>

              <p>
                Test your VALORANT knowledge across agents, voicelines,
                skins, finishers and maps.
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
                  <h2>CHOOSE YOUR CHALLENGE</h2>
                </div>

                <span className="mode-count">
                  {modes.length} MODES
                </span>
              </div>

              <div className="mode-grid">
                {modes.map((mode) => (
                  <button
                    className="mode-card"
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

                    <span className="play-label">PLAY →</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="coming-soon">
              <div className="coming-icon">✦</div>

              <div>
                <div className="eyebrow">VALODLE</div>

                <h3>DAILY PUZZLES ARE COMING</h3>

                <p>
                  Build your streak, test your knowledge and become a
                  VALORANT encyclopedia.
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
        VALODLE • FAN-MADE PROJECT • NOT AFFILIATED WITH RIOT GAMES
      </footer>
    </div>
  );
}

export default App;
