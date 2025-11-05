/* === 1. THEME & VARIABLES === */
:root {
    /* Dark Mode (Default) */
    --bg-primary: #1a1a2e;
    --bg-secondary: #1e1e3f;
    --color-text-primary: #f0f0f0;
    --color-text-muted: #a0a0a0;
    --color-accent1: #9f5afd; /* Purple */
    --color-accent2: #00ffc3; /* Teal */
    --color-danger: #ff4757;
    --color-success: #2ed573;
    --cell-bg: #2a2a4a;
    --shadow-color: rgba(0, 0, 0, 0.2);
    --shadow-accent: rgba(159, 90, 253, 0.5);
}

body.light-mode {
    /* Light Mode */
    --bg-primary: #f0f2f5;
    --bg-secondary: #ffffff;
    --color-text-primary: #1a1a2e;
    --color-text-muted: #555;
    --color-accent1: #8a4de3; /* Darker Purple */
    --color-accent2: #00b894; /* Darker Teal */
    --color-danger: #e74c3c;
    --color-success: #27ae60;
    --cell-bg: #e9ecef;
    --shadow-color: rgba(0, 0, 0, 0.1);
    --shadow-accent: rgba(138, 77, 227, 0.3);
}

/* === 2. GLOBAL & SETUP === */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    display: flex;
    background-color: var(--bg-primary);
    color: var(--color-text-primary);
    height: 100vh;
    overflow: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
}

h1, h2, h3 {
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
}

p {
    font-size: 1.1rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    margin-bottom: 1rem;
}

/* === 3. SIDEBAR & NAVIGATION === */
.sidebar {
    width: 260px;
    background-color: var(--bg-secondary);
    padding: 2rem 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.3s ease;
    box-shadow: 5px 0 15px var(--shadow-color);
}

.sidebar-header h3 {
    color: var(--color-accent2);
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
}

.nav-links {
    list-style: none;
    flex-grow: 1;
    overflow-y: auto;
    max-height: calc(100vh - 150px); /* Adjust based on header/footer */
}

.nav-link {
    display: block;
    text-decoration: none;
    color: var(--color-text-muted);
    padding: 0.8rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    font-weight: 600;
    font-size: 0.95rem;
}
.nav-link span { margin-left: 0.5rem; }

.nav-link:hover {
    background-color: var(--bg-primary);
    color: var(--color-text-primary);
}

.nav-link.active {
    background-color: var(--color-accent1);
    color: #fff;
    box-shadow: 0 4px 15px -2px var(--shadow-accent);
}

/* === 4. THEME SWITCHER === */
.theme-switcher {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
    border-top: 1px solid var(--cell-bg);
}
.theme-switcher span {
    font-size: 1.2rem;
    color: var(--color-text-muted);
}
.switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 28px;
    margin: 0 0.75rem;
}
.switch input { display: none; }
.slider {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: var(--cell-bg);
    transition: .4s;
    border-radius: 34px;
}
.slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}
input:checked + .slider {
    background-color: var(--color-accent1);
}
input:checked + .slider:before {
    transform: translateX(22px);
}

/* === 5. MAIN CONTENT & SHARED STYLES === */
.main-content {
    flex-grow: 1;
    padding: 2rem 3rem;
    height: 100vh;
    overflow-y: auto;
}

.page {
    display: none;
    animation: fadeIn 0.5s ease-out;
}
.page.active { display: block; }

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.game-container {
    background-color: var(--bg-secondary);
    padding: 2rem;
    border-radius: 12px;
    margin-top: 2rem;
    max-width: 700px;
    box-shadow: 0 5px 20px var(--shadow-color);
}

.game-status {
    font-size: 1.25rem;
    font-weight: 600;
    min-height: 2rem;
    margin-top: 1rem;
    color: var(--color-text-primary);
}

.game-board {
    display: grid;
    margin: 1.5rem 0;
}

.cell {
    background-color: var(--bg-primary);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.cell:hover {
    background-color: var(--cell-bg);
}

.btn {
    background-color: var(--color-accent1);
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
    margin-right: 0.5rem;
}
.btn:hover {
    background-color: var(--color-accent2);
    color: var(--bg-primary);
    box-shadow: 0 4px 15px -2px var(--shadow-accent);
    transform: translateY(-2px);
}
.btn:disabled {
    background-color: var(--color-text-muted);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}
.btn-group {
    display: flex;
    gap: 1rem;
}

.game-input {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border-radius: 8px;
    border: 2px solid var(--cell-bg);
    background-color: var(--bg-primary);
    color: var(--color-text-primary);
    margin-bottom: 1rem;
}

/* === 6. GAME-SPECIFIC STYLES === */

/* --- Home Widget --- */
.widget-container { display: flex; gap: 2rem; margin-top: 2rem; }
.widget {
    background-color: var(--bg-secondary);
    padding: 1.5rem;
    border-radius: 12px;
    flex-basis: 300px;
    box-shadow: 0 5px 20px var(--shadow-color);
}
.widget h3 { color: var(--color-accent2); }
#clock {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-accent1);
}

/* --- Tic-Tac-Toe --- */
#ttt-board {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 300px;
    height: 300px;
}
.ttt-cell {
    font-size: 3rem;
    font-weight: 700;
}
.ttt-cell.X { color: var(--color-accent2); }
.ttt-cell.O { color: var(--color-accent1); }

/* --- Rock, Paper, Scissors --- */
.rps-btn { font-size: 1.5rem; }

/* --- Whac-a-Mole --- */
.wam-board {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    width: 300px;
    height: 300px;
}
.wam-hole {
    background-color: var(--bg-primary);
    border-radius: 50%;
    overflow: hidden;
    position: relative;
}
.wam-mole {
    background-color: var(--color-accent1);
    width: 70%;
    height: 70%;
    border-radius: 50%;
    position: absolute;
    bottom: -100%;
    left: 15%;
    transition: bottom 0.2s ease-out;
    cursor: pointer;
}
.wam-mole.up {
    bottom: 15%;
}

/* --- Memory Match --- */
.mm-board {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    max-width: 400px;
}
.mm-card {
    height: 90px;
    background-color: var(--color-accent1);
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s;
}
.mm-card .card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    font-size: 2.5rem;
}
.mm-card .card-front {
    background-color: var(--bg-primary);
    transform: rotateY(180deg);
}
.mm-card .card-back {
    background-color: var(--color-accent1);
}
.mm-card.flipped {
    transform: rotateY(180deg);
}
.mm-card.matched {
    opacity: 0.5;
    background-color: var(--color-success);
    pointer-events: none;
}
.mm-card.matched .card-front {
    background-color: var(--color-success);
}

/* --- Clicker Game --- */
.clicker-btn {
    width: 100%;
    min-height: 150px;
    font-size: 2rem;
    margin-top: 1.5rem;
}

/* --- Hangman --- */
.hangman-container { max-width: 500px; }
.hangman-word {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 1.5rem 0;
}
.letter-placeholder {
    width: 40px;
    height: 50px;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    border-bottom: 4px solid var(--color-text-primary);
}
.hangman-letters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-top: 1.5rem;
}
.letter-btn {
    width: 35px;
    height: 35px;
    font-size: 1rem;
    padding: 0;
    margin: 0;
    background-color: var(--cell-bg);
    color: var(--color-text-primary);
}
.letter-btn:hover {
    background-color: var(--color-accent1);
    color: #fff;
}
.letter-btn:disabled {
    background-color: var(--bg-primary);
    color: var(--color-text-muted);
}

/* --- Typing Test --- */
.typing-text-display {
    background-color: var(--bg-primary);
    padding: 1rem;
    border-radius: 8px;
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1rem;
    max-height: 150px;
    overflow-y: auto;
}
.typing-text-display .correct { color: var(--color-success); }
.typing-text-display .incorrect { color: var(--color-danger); text-decoration: underline; }
.typing-input {
    font-family: 'Poppins', sans-serif;
}

/* --- Magic 8-Ball --- */
.m8-container {
    text-align: center;
    max-width: 400px;
}
.magic-8-ball {
    width: 200px;
    height: 200px;
    background-color: #111;
    border-radius: 50%;
    margin: 1.5rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.1s ease;
}
.magic-8-ball:active { transform: scale(0.98); }
.magic-8-answer {
    width: 100px;
    height: 100px;
    background-color: var(--bg-secondary);
    border-radius: 50%;
    color: var(--color-accent1);
    font-size: 1rem;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px;
    transition: all 0.5s ease;
}
.magic-8-answer.show {
    font-size: 1.1rem;
}

/* --- Reaction Time --- */
.rt-container { max-width: 500px; }
.reaction-target {
    width: 100%;
    height: 200px;
    background-color: var(--color-danger);
    border-radius: 12px;
    display: none; /* Hidden by default */
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    margin-top: 2rem;
}
.reaction-target.wait {
    background-color: var(--color-accent1);
}
.reaction-target.ready {
    background-color: var(--color-success);
}

/* --- Connect Four --- */
.c4-board {
    grid-template-columns: repeat(7, 1fr);
    background-color: #007bff; /* Classic blue */
    border-radius: 10px;
    padding: 10px;
    width: fit-content;
}
.c4-col {
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    gap: 5px;
    cursor: pointer;
}
.c4-col:hover { background-color: #0056b3; }
.c4-cell {
    width: 50px;
    height: 50px;
    background-color: var(--bg-secondary);
    border-radius: 50%;
}
.c4-cell.red { background-color: #e74c3c; }
.c4-cell.yellow { background-color: #f1c40f; }

/* --- Simon Says --- */
.simon-btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 300px;
    height: 300px;
    margin: 2rem auto;
}
.simon-btn {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;
}
.simon-btn.lit {
    opacity: 1;
    box-shadow: 0 0 20px #fff;
}
.simon-btn.green { background-color: #2ed573; }
.simon-btn.red { background-color: #ff4757; }
.simon-btn.yellow { background-color: #f1c40f; }
.simon-btn.blue { background-color: #007bff; }

/* --- Snake --- */
#snake-board-container {
    margin: 1.5rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

#snake-board {
    background-color: var(--bg-primary);
    border: 2px solid var(--color-accent1);
}

#snake-status {
    font-size: 1rem;
    color: var(--color-text-muted);
    text-align: center;
    margin-top: 1rem;
}
