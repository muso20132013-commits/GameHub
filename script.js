document.addEventListener('DOMContentLoaded', () => {

    // === 1. THEME SWITCHER LOGIC ===
    const themeToggle = document.getElementById('theme-toggle');

    // Check for saved theme in localStorage
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('light-mode');
        // Save preference
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            // Dark mode: remove the item so the initial check defaults to dark mode
            localStorage.removeItem('theme');
        }
    });

    // === 2. PAGE NAVIGATION ===
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');

            pages.forEach(page => page.classList.remove('active'));
            navLinks.forEach(navLink => navLink.classList.remove('active'));

            document.getElementById(targetPage).classList.add('active');
            link.classList.add('active');
        });
    });

    // === 3. HOME: CLOCK WIDGET ===
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            clockElement.textContent = timeString;
        }
        setInterval(updateClock, 1000);
        updateClock();
    }

    // === 4. GAME: TIC-TAC-TOE ===
    const ttt_cells = document.querySelectorAll('.ttt-cell');
    const ttt_status = document.getElementById('ttt-status');
    const ttt_resetBtn = document.getElementById('ttt-reset');
    let ttt_currentPlayer = 'X';
    let ttt_gameActive = true;
    let ttt_boardState = ["", "", "", "", "", "", "", "", ""];
    const ttt_winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    function ttt_handleCellClick(e) {
        const clickedCell = e.target;
        const cellIndex = parseInt(clickedCell.getAttribute('data-index'));
        if (ttt_boardState[cellIndex] !== "" || !ttt_gameActive) return;

        ttt_boardState[cellIndex] = ttt_currentPlayer;
        clickedCell.textContent = ttt_currentPlayer;
        clickedCell.classList.add(ttt_currentPlayer);
        ttt_checkResult();
    }

    function ttt_checkResult() {
        let roundWon = false;
        for (let i = 0; i < ttt_winConditions.length; i++) {
            const [a, b, c] = ttt_winConditions[i];
            if (ttt_boardState[a] && ttt_boardState[a] === ttt_boardState[b] && ttt_boardState[a] === ttt_boardState[c]) {
                roundWon = true; break;
            }
        }
        if (roundWon) {
            ttt_status.textContent = `Player ${ttt_currentPlayer} Wins! 🎉`;
            ttt_gameActive = false; return;
        }
        if (!ttt_boardState.includes("")) {
            ttt_status.textContent = "It's a Draw! 🤝";
            ttt_gameActive = false; return;
        }
        ttt_currentPlayer = ttt_currentPlayer === 'X' ? 'O' : 'X';
        ttt_status.textContent = `Player ${ttt_currentPlayer}'s turn`;
    }

    function ttt_resetGame() {
        ttt_currentPlayer = 'X'; ttt_gameActive = true;
        ttt_boardState = ["", "", "", "", "", "", "", "", ""];
        ttt_status.textContent = `Player ${ttt_currentPlayer}'s turn`;
        ttt_cells.forEach(cell => {
            cell.textContent = ""; cell.classList.remove('X', 'O');
        });
    }
    if (ttt_cells.length) {
        ttt_cells.forEach(cell => cell.addEventListener('click', ttt_handleCellClick));
        ttt_resetBtn.addEventListener('click', ttt_resetGame);
    }

    // === 5. GAME: ROCK, PAPER, SCISSORS ===
    const rps_choiceBtns = document.querySelectorAll('.rps-btn');
    const rps_resultEl = document.getElementById('rps-result');
    const rps_computerChoices = ['rock', 'paper', 'scissors'];
    
    if (rps_choiceBtns.length) {
        rps_choiceBtns.forEach(button => {
            button.addEventListener('click', () => {
                const playerChoice = button.getAttribute('data-choice');
                const computerChoice = rps_computerChoices[Math.floor(Math.random() * 3)];
                rps_displayResult(playerChoice, computerChoice);
            });
        });
    }

    function rps_displayResult(player, computer) {
        let resultText = `You chose <strong>${player}</strong>. PC chose <strong>${computer}</strong>. `;
        if (player === computer) {
            resultText += "It's a tie! 🤝";
        } else if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            resultText += "You win! 🎉";
        } else {
            resultText += "You lose! 😢";
        }
        rps_resultEl.innerHTML = resultText;
    }

    // === 6. GAME: GUESS THE NUMBER ===
    const gtn_input = document.getElementById('gtn-input');
    const gtn_btn = document.getElementById('gtn-btn');
    const gtn_status = document.getElementById('gtn-status');
    let gtn_targetNumber = Math.floor(Math.random() * 100) + 1;
    let gtn_guesses = 0;

    function gtn_checkGuess() {
        const guess = parseInt(gtn_input.value);
        if (isNaN(guess) || guess < 1 || guess > 100) {
            gtn_status.textContent = "Please enter a number between 1 and 100."; return;
        }
        gtn_guesses++;
        if (guess === gtn_targetNumber) {
            gtn_status.textContent = `Correct! You got it in ${gtn_guesses} guesses. 🎉`;
            gtn_status.style.color = 'var(--color-success)';
            gtn_reset();
        } else if (guess < gtn_targetNumber) {
            gtn_status.textContent = "Too low! Try again.";
            gtn_status.style.color = 'var(--color-text-primary)';
        } else {
            gtn_status.textContent = "Too high! Try again.";
            gtn_status.style.color = 'var(--color-text-primary)';
        }
        gtn_input.value = '';
    }
    function gtn_reset() {
        gtn_targetNumber = Math.floor(Math.random() * 100) + 1;
        gtn_guesses = 0;
        gtn_btn.textContent = "Guess";
    }
    if (gtn_btn) {
        gtn_btn.addEventListener('click', gtn_checkGuess);
        gtn_input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') gtn_checkGuess();
        });
    }

    // === 7. GAME: WHAC-A-MOLE ===
    const wam_scoreEl = document.getElementById('wam-score');
    const wam_startBtn = document.getElementById('wam-start');
    const wam_moles = document.querySelectorAll('.wam-mole');
    let wam_score = 0;
    let wam_timer;
    let wam_gameActive = false;

    function wam_popMole() {
        if (!wam_gameActive) return;
        wam_moles.forEach(mole => mole.classList.remove('up'));
        const randomMole = wam_moles[Math.floor(Math.random() * wam_moles.length)];
        randomMole.classList.add('up');
        wam_timer = setTimeout(wam_popMole, Math.random() * 1000 + 500);
    }
    function wam_whackMole(e) {
        if (!e.target.classList.contains('up')) return;
        wam_score++;
        wam_scoreEl.textContent = wam_score;
        e.target.classList.remove('up');
    }
    function wam_startGame() {
        wam_score = 0;
        wam_scoreEl.textContent = 0;
        wam_gameActive = true;
        wam_startBtn.disabled = true;
        wam_popMole();
        setTimeout(() => {
            wam_gameActive = false;
            wam_startBtn.disabled = false;
            clearTimeout(wam_timer);
            wam_moles.forEach(mole => mole.classList.remove('up'));
            alert(`Game Over! Your score: ${wam_score}`);
        }, 15000); // 15 seconds
    }
    if (wam_startBtn) {
        wam_startBtn.addEventListener('click', wam_startGame);
        wam_moles.forEach(mole => mole.addEventListener('click', wam_whackMole));
    }

    // === 8. GAME: MEMORY MATCH ===
    const mm_board = document.getElementById('mm-board');
    const mm_status = document.getElementById('mm-status');
    const mm_reset = document.getElementById('mm-reset');
    const mm_emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    let mm_cards = [...mm_emojis, ...mm_emojis];
    let mm_flippedCards = [];
    let mm_matchedPairs = 0;
    let mm_moves = 0;

    function mm_shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }
    function mm_createBoard() {
        mm_shuffle(mm_cards);
        mm_board.innerHTML = '';
        mm_matchedPairs = 0;
        mm_moves = 0;
        mm_status.textContent = "Moves: 0";
        for (let i = 0; i < mm_cards.length; i++) {
            const card = document.createElement('div');
            card.classList.add('mm-card');
            card.dataset.emoji = mm_cards[i];
            card.innerHTML = `
                <div class="card-face card-back"></div>
                <div class="card-face card-front">${mm_cards[i]}</div>
            `;
            card.addEventListener('click', mm_flipCard);
            mm_board.appendChild(card);
        }
    }
    function mm_flipCard(e) {
        const clickedCard = e.currentTarget;
        if (mm_flippedCards.length < 2 && !clickedCard.classList.contains('flipped')) {
            clickedCard.classList.add('flipped');
            mm_flippedCards.push(clickedCard);
            if (mm_flippedCards.length === 2) {
                mm_moves++;
                mm_status.textContent = `Moves: ${mm_moves}`;
                setTimeout(mm_checkMatch, 1000);
            }
        }
    }
    function mm_checkMatch() {
        const [card1, card2] = mm_flippedCards;
        if (card1.dataset.emoji === card2.dataset.emoji) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            mm_matchedPairs++;
            if (mm_matchedPairs === mm_emojis.length) {
                mm_status.textContent = `You won in ${mm_moves} moves! 🎉`;
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        mm_flippedCards = [];
    }
    if (mm_board) {
        mm_createBoard();
        mm_reset.addEventListener('click', mm_createBoard);
    }

    // === 9. GAME: CLICKER GAME ===
    const cg_timeEl = document.getElementById('cg-time');
    const cg_scoreEl = document.getElementById('cg-score');
    const cg_startBtn = document.getElementById('cg-start');
    const cg_clickerBtn = document.getElementById('cg-clicker');
    const cg_resultEl = document.getElementById('cg-result');
    let cg_score = 0;
    let cg_timeLeft = 10;
    let cg_timer;

    function cg_startGame() {
        cg_score = 0;
        cg_timeLeft = 10;
        cg_scoreEl.textContent = 0;
        cg_timeEl.textContent = 10;
        cg_resultEl.textContent = "";
        cg_startBtn.disabled = true;
        cg_clickerBtn.disabled = false;
        
        cg_timer = setInterval(() => {
            cg_timeLeft--;
            cg_timeEl.textContent = cg_timeLeft;
            if (cg_timeLeft <= 0) {
                clearInterval(cg_timer);
                cg_endGame();
            }
        }, 1000);
    }
    function cg_click() {
        cg_score++;
        cg_scoreEl.textContent = cg_score;
    }
    function cg_endGame() {
        cg_startBtn.disabled = false;
        cg_clickerBtn.disabled = true;
        const cps = (cg_score / 10).toFixed(2);
        cg_resultEl.textContent = `Game Over! Clicks per second: ${cps}`;
    }
    if (cg_startBtn) {
        cg_startBtn.addEventListener('click', cg_startGame);
        cg_clickerBtn.addEventListener('click', cg_click);
    }

    // === 10. GAME: HANGMAN ===
    const hm_status = document.getElementById('hm-status');
    const hm_livesEl = document.getElementById('hm-lives');
    const hm_wordEl = document.getElementById('hm-word');
    const hm_lettersEl = document.getElementById('hm-letters');
    const hm_resetBtn = document.getElementById('hm-reset');
    const hm_words = ['DASHBOARD', 'JAVASCRIPT', 'DEVELOPER', 'MODERN', 'PROJECT', 'GEMINI', 'GOOGLE'];
    let hm_word = '';
    let hm_guessedWord = [];
    let hm_lives = 6;
    
    function hm_init() {
        hm_word = hm_words[Math.floor(Math.random() * hm_words.length)];
        hm_guessedWord = Array(hm_word.length).fill('_');
        hm_lives = 6;
        hm_status.textContent = "Guess the word!";
        hm_livesEl.textContent = `Lives: ${hm_lives} ❤️`;
        hm_updateWordDisplay();
        hm_createLetterButtons();
    }
    function hm_updateWordDisplay() {
        hm_wordEl.innerHTML = '';
        hm_guessedWord.forEach(letter => {
            const span = document.createElement('span');
            span.className = 'letter-placeholder';
            span.textContent = letter;
            hm_wordEl.appendChild(span);
        });
    }
    function hm_createLetterButtons() {
        hm_lettersEl.innerHTML = '';
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            const btn = document.createElement('button');
            btn.className = 'btn letter-btn';
            btn.textContent = letter;
            btn.addEventListener('click', () => hm_handleGuess(letter, btn));
            hm_lettersEl.appendChild(btn);
        }
    }
    function hm_handleGuess(letter, btn) {
        btn.disabled = true;
        if (hm_word.includes(letter)) {
            for (let i = 0; i < hm_word.length; i++) {
                if (hm_word[i] === letter) {
                    hm_guessedWord[i] = letter;
                }
            }
            hm_updateWordDisplay();
            if (!hm_guessedWord.includes('_')) {
                hm_status.textContent = "You Win! 🎉";
                hm_disableAllLetters();
            }
        } else {
            hm_lives--;
            const livesEmoji = '❤️'.repeat(hm_lives) + '💔'.repeat(6 - hm_lives);
            hm_livesEl.textContent = `Lives: ${hm_lives} ${livesEmoji}`;
            if (hm_lives <= 0) {
                hm_status.textContent = `Game Over! The word was: ${hm_word}`;
                hm_disableAllLetters();
            }
        }
    }
    function hm_disableAllLetters() {
        document.querySelectorAll('.letter-btn').forEach(btn => btn.disabled = true);
    }
    if (hm_resetBtn) {
        hm_init();
        hm_resetBtn.addEventListener('click', hm_init);
    }

    // === 11. GAME: TYPING TEST ===
    const tt_textDisplay = document.getElementById('tt-text-display');
    const tt_input = document.getElementById('tt-input');
    const tt_timeEl = document.getElementById('tt-time');
    const tt_wpmEl = document.getElementById('tt-wpm');
    const tt_resetBtn = document.getElementById('tt-reset');
    const tt_text = "The quick brown fox jumps over the lazy dog. This is a simple typing test to check your speed and accuracy. Happy typing!";
    let tt_timer;
    let tt_startTime;

    function tt_init() {
        tt_textDisplay.innerHTML = '';
        tt_text.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            tt_textDisplay.appendChild(charSpan);
        });
        tt_input.value = '';
        tt_input.disabled = false;
        tt_input.focus();
        tt_timeEl.textContent = 0;
        tt_wpmEl.textContent = 0;
        clearInterval(tt_timer);
        tt_startTime = null;
    }
    function tt_updateTimer() {
        if (!tt_startTime) {
            tt_startTime = new Date();
        }
        const currentTime = new Date();
        const seconds = Math.floor((currentTime - tt_startTime) / 1000);
        tt_timeEl.textContent = seconds;
        
        const wordsTyped = tt_input.value.trim().split(' ').length;
        const minutes = seconds / 60;
        const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
        tt_wpmEl.textContent = wpm;
    }
    function tt_checkInput() {
        if (!tt_startTime) {
            tt_timer = setInterval(tt_updateTimer, 1000);
        }
        const textChars = tt_textDisplay.querySelectorAll('span');
        const inputChars = tt_input.value.split('');
        
        textChars.forEach((span, index) => {
            span.classList.remove('correct', 'incorrect');
            if (inputChars[index] == null) {
                // Not typed yet
            } else if (inputChars[index] === span.textContent) {
                span.classList.add('correct');
            } else {
                span.classList.add('incorrect');
            }
        });

        if (tt_input.value.length === tt_text.length) {
            clearInterval(tt_timer);
            tt_input.disabled = true;
        }
    }
    if (tt_resetBtn) {
        tt_init();
        tt_resetBtn.addEventListener('click', tt_init);
        tt_input.addEventListener('input', tt_checkInput);
    }
    
    // === 12. GAME: MAGIC 8-BALL ===
    const m8_ball = document.getElementById('m8-ball');
    const m8_answerEl = document.getElementById('m8-answer');
    const m8_askBtn = document.getElementById('m8-ask');
    const m8_question = document.getElementById('m8-question');
    const m8_answers = [
        "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes, definitely.",
        "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.",
        "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.",
        "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.",
        "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."
    ];

    function m8_getAnswer() {
        if (!m8_question.value.trim()) {
            alert("Please ask a question first!");
            return;
        }
        m8_answerEl.textContent = '...';
        m8_answerEl.classList.remove('show');
        m8_ball.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            m8_ball.style.transform = 'scale(1)';
            const randomAnswer = m8_answers[Math.floor(Math.random() * m8_answers.length)];
            m8_answerEl.textContent = randomAnswer;
            m8_answerEl.classList.add('show');
        }, 500);
    }
    if(m8_askBtn) {
        m8_askBtn.addEventListener('click', m8_getAnswer);
        m8_ball.addEventListener('click', m8_getAnswer);
    }

    // === 13. GAME: REACTION TIME ===
    const rt_status = document.getElementById('rt-status');
    const rt_startBtn = document.getElementById('rt-start');
    const rt_target = document.getElementById('rt-target');
    let rt_timer;
    let rt_startTime;

    function rt_start() {
        rt_status.textContent = "Wait for green...";
        rt_startBtn.disabled = true;
        rt_target.style.display = 'block';
        rt_target.classList.add('wait');
        
        rt_timer = setTimeout(() => {
            rt_target.classList.remove('wait');
            rt_target.classList.add('ready');
            rt_status.textContent = "Click NOW!";
            rt_startTime = new Date();
        }, Math.random() * 3000 + 1000); // 1-4 seconds
    }
    function rt_clickTarget() {
        if (rt_target.classList.contains('wait')) {
            clearTimeout(rt_timer);
            rt_status.textContent = "Too soon! Click Start to try again.";
            rt_startBtn.disabled = false;
            rt_target.style.display = 'none';
        } else if (rt_target.classList.contains('ready')) {
            const endTime = new Date();
            const reactionTime = endTime - rt_startTime;
            rt_status.textContent = `Your reaction time: ${reactionTime}ms. Click Start to play again.`;
            rt_startBtn.disabled = false;
            rt_target.style.display = 'none';
            rt_target.classList.remove('ready');
        }
    }
    if (rt_startBtn) {
        rt_startBtn.addEventListener('click', rt_start);
        rt_target.addEventListener('click', rt_clickTarget);
    }

    // === 14. GAME: CONNECT FOUR ===
    const c4_boardEl = document.getElementById('c4-board');
    const c4_status = document.getElementById('c4-status');
    const c4_resetBtn = document.getElementById('c4-reset');
    const c4_rows = 6;
    const c4_cols = 7;
    let c4_board = [];
    let c4_currentPlayer = 'red';
    let c4_gameActive = true;

    function c4_createBoard() {
        c4_board = Array(c4_rows).fill(null).map(() => Array(c4_cols).fill(null));
        c4_boardEl.innerHTML = '';
        for (let c = 0; c < c4_cols; c++) {
            const col = document.createElement('div');
            col.className = 'c4-col';
            col.dataset.col = c;
            for (let r = 0; r < c4_rows; r++) {
                const cell = document.createElement('div');
                cell.className = 'c4-cell';
                cell.dataset.row = r;
                cell.dataset.col = c;
                col.appendChild(cell);
            }
            col.addEventListener('click', c4_dropPiece);
            c4_boardEl.appendChild(col);
        }
        c4_currentPlayer = 'red';
        c4_status.textContent = "Player 🔴's turn";
        c4_gameActive = true;
    }
    function c4_dropPiece(e) {
        if (!c4_gameActive) return;
        const col = parseInt(e.currentTarget.dataset.col);
        // Find the lowest empty row in this column
        for (let r = c4_rows - 1; r >= 0; r--) {
            if (!c4_board[r][col]) {
                c4_board[r][col] = c4_currentPlayer;
                const cell = c4_boardEl.querySelector(`.c4-cell[data-row="${r}"][data-col="${col}"]`);
                cell.classList.add(c4_currentPlayer);
                
                if (c4_checkWin(r, col)) {
                    c4_status.textContent = `Player ${c4_currentPlayer === 'red' ? '🔴' : '🟡'} Wins! 🎉`;
                    c4_gameActive = false;
                } else if (c4_board.flat().every(cell => cell)) {
                    c4_status.textContent = "It's a Draw! 🤝";
                    c4_gameActive = false;
                } else {
                    c4_currentPlayer = c4_currentPlayer === 'red' ? 'yellow' : 'red';
                    c4_status.textContent = `Player ${c4_currentPlayer === 'red' ? '🔴' : '🟡'}'s turn`;
                }
                return; // Piece dropped
            }
        }
    }
    function c4_checkWin(r, c) {
        const player = c4_board[r][c];
        // Check horizontal, vertical, and both diagonals
        const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
        for (const [dr, dc] of directions) {
            let count = 1;
            for (let i = 1; i <= 3; i++) { // Check one way
                const nr = r + dr * i, nc = c + dc * i;
                if (nr < 0 || nr >= c4_rows || nc < 0 || nc >= c4_cols || c4_board[nr][nc] !== player) break;
                count++;
            }
            for (let i = 1; i <= 3; i++) { // Check opposite way
                const nr = r - dr * i, nc = c - dc * i;
                if (nr < 0 || nr >= c4_rows || nc < 0 || nc >= c4_cols || c4_board[nr][nc] !== player) break;
                count++;
            }
            if (count >= 4) return true;
        }
        return false;
    }
    if (c4_resetBtn) {
        c4_createBoard();
        c4_resetBtn.addEventListener('click', c4_createBoard);
    }

    // === 15. GAME: SIMON SAYS ===
    const ss_status = document.getElementById('ss-status');
    const ss_scoreEl = document.getElementById('ss-score');
    const ss_startBtn = document.getElementById('ss-start');
    const ss_buttons = document.querySelectorAll('.simon-btn');
    const ss_colors = ['green', 'red', 'yellow', 'blue'];
    let ss_sequence = [];
    let ss_playerSequence = [];
    let ss_score = 0;
    let ss_gameActive = false;

    function ss_startGame() {
        ss_sequence = [];
        ss_score = 0;
        ss_scoreEl.textContent = 0;
        ss_startBtn.disabled = true;
        ss_gameActive = true;
        ss_status.textContent = "Watch the sequence...";
        ss_nextRound();
    }
    function ss_nextRound() {
        ss_playerSequence = [];
        ss_sequence.push(ss_colors[Math.floor(Math.random() * 4)]);
        ss_playSequence();
    }
    function ss_playSequence() {
        ss_gameActive = false; // Disable player input
        let i = 0;
        const interval = setInterval(() => {
            if (i >= ss_sequence.length) {
                clearInterval(interval);
                ss_status.textContent = "Your turn...";
                ss_gameActive = true; // Enable player input
                return;
            }
            ss_lightButton(ss_sequence[i]);
            i++;
        }, 800);
    }
    function ss_lightButton(color) {
        const btn = document.querySelector(`.simon-btn.${color}`);
        btn.classList.add('lit');
        // Add sound here if you want
        setTimeout(() => {
            btn.classList.remove('lit');
        }, 400);
    }
    function ss_handlePlayerInput(e) {
        if (!ss_gameActive) return;
        const color = e.target.dataset.color;
        ss_lightButton(color);
        ss_playerSequence.push(color);
        
        // Check if the current move is correct
        if (ss_playerSequence[ss_playerSequence.length - 1] !== ss_sequence[ss_playerSequence.length - 1]) {
            ss_status.textContent = `Game Over! Score: ${ss_score}. Press Start.`;
            ss_startBtn.disabled = false;
            ss_gameActive = false;
            return;
        }
        
        // Check if the sequence is complete
        if (ss_playerSequence.length === ss_sequence.length) {
            ss_score++;
            ss_scoreEl.textContent = ss_score;
            ss_status.textContent = "Correct! Next round...";
            setTimeout(ss_nextRound, 1000);
        }
    }
    if (ss_startBtn) {
        ss_startBtn.addEventListener('click', ss_startGame);
        ss_buttons.forEach(btn => btn.addEventListener('click', ss_handlePlayerInput));
    }

    // === 16. GAME: SNAKE ===
    const snake_board = document.getElementById('snake-board');
    const snake_scoreEl = document.getElementById('snake-score');
    const snake_startBtn = document.getElementById('snake-start');
    const snake_status = document.getElementById('snake-status');
    
    if (snake_board) {
        const snake_ctx = snake_board.getContext('2d');
        const snake_gridSize = 20; // 20x20 grid on a 400x400 canvas
        let snake_snake;
        let snake_food;
        let snake_direction;
        let snake_score;
        let snake_gameLoop;
        let snake_gameActive = false;

        function snake_init() {
            clearInterval(snake_gameLoop);
            snake_snake = [ { x: 10, y: 10 } ]; // Start in the middle
            // FIX: Start moving right immediately
            snake_direction = { x: 1, y: 0 }; 
            snake_score = 0;
            snake_scoreEl.textContent = 0;
            snake_status.textContent = "Use Arrow Keys to move.";
            snake_gameActive = true;
            snake_startBtn.textContent = "Restart Game";
            snake_generateFood();
            snake_gameLoop = setInterval(snake_update, 120); // Snake speed
        }

        function snake_update() {
            if (!snake_gameActive) return;

            // Calculate new head position
            const head = { x: snake_snake[0].x + snake_direction.x, y: snake_snake[0].y + snake_direction.y };

            // Check for wall collision
            if (head.x < 0 || head.x >= snake_gridSize || head.y < 0 || head.y >= snake_gridSize) {
                return snake_gameOver();
            }
            
            // Check for self-collision
            for (let i = 1; i < snake_snake.length; i++) {
                if (head.x === snake_snake[i].x && head.y === snake_snake[i].y) {
                    return snake_gameOver();
                }
            }

            snake_snake.unshift(head); // Add new head

            // Check for food
            if (head.x === snake_food.x && head.y === snake_food.y) {
                snake_score++;
                snake_scoreEl.textContent = snake_score;
                snake_generateFood();
            } else {
                snake_snake.pop(); // Remove tail
            }

            snake_draw();
        }

        function snake_draw() {
            // Clear board
            snake_ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary');
            snake_ctx.fillRect(0, 0, snake_board.width, snake_board.height);

            // Draw food
            snake_ctx.fillStyle = 'var(--color-danger)';
            snake_ctx.fillRect(snake_food.x * 20, snake_food.y * 20, 20, 20);

            // Draw snake
            snake_ctx.fillStyle = 'var(--color-success)';
            snake_snake.forEach(segment => {
                snake_ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
            });
        }

        function snake_generateFood() {
            snake_food = {
                x: Math.floor(Math.random() * snake_gridSize),
                y: Math.floor(Math.random() * snake_gridSize)
            };
            // Ensure food doesn't spawn on the snake
            for (const segment of snake_snake) {
                if (segment.x === snake_food.x && segment.y === snake_food.y) {
                    snake_generateFood(); // Recursively try again
                    break;
                }
            }
        }

        function snake_gameOver() {
            clearInterval(snake_gameLoop);
            snake_gameActive = false;
            snake_status.textContent = `Game Over! Final Score: ${snake_score}. Press Start.`;
            snake_startBtn.textContent = "Start Game";
        }

        function snake_handleKeyPress(e) {
            // Only control snake if the game is active and its page is visible
            if (!snake_gameActive || !document.getElementById('snake').classList.contains('active')) {
                return;
            }

            switch (e.key) {
                case "ArrowUp":
                    if (snake_direction.y === 0) { // Can't reverse
                        snake_direction = { x: 0, y: -1 }; e.preventDefault();
                    }
                    break;
                case "ArrowDown":
                    if (snake_direction.y === 0) {
                        snake_direction = { x: 0, y: 1 }; e.preventDefault();
                    }
                    break;
                case "ArrowLeft":
                    if (snake_direction.x === 0) {
                        snake_direction = { x: -1, y: 0 }; e.preventDefault();
                    }
                    break;
                case "ArrowRight":
                    if (snake_direction.x === 0) {
                        snake_direction = { x: 1, y: 0 }; e.preventDefault();
                    }
                    break;
            }
        }
        
        snake_startBtn.addEventListener('click', snake_init);
        // Listen for key presses globally
        document.addEventListener('keydown', snake_handleKeyPress);
    }

}); // End of DOMContentLoaded
