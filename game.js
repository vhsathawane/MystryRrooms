// Game State
let currentPlayer = "";
let currentRoom = 0;
let currentQuestion = 0;
let hintsUsed = 0;
let score = 0;

// Load saved game state
function loadGame() {
    const saved = localStorage.getItem('mysteryRooms_save');
    if (saved) {
        const data = JSON.parse(saved);
        currentPlayer = data.player || "";
        currentRoom = data.room || 0;
        currentQuestion = data.question || 0;
        score = data.score || 0;
        hintsUsed = data.hints || 0;
    }
}

// Save game state
function saveGame() {
    const data = {
        player: currentPlayer,
        room: currentRoom,
        question: currentQuestion,
        score: score,
        hints: hintsUsed
    };
    localStorage.setItem('mysteryRooms_save', JSON.stringify(data));
}

// Start the game
function startGame() {
    const nameInput = document.getElementById('player-name');
    const name = nameInput.value.trim();
    
    if (!name) {
        alert("Please enter your name, detective!");
        return;
    }
    
    currentPlayer = name;
    currentRoom = 0;
    currentQuestion = 0;
    score = 0;
    hintsUsed = 0;
    
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    saveGame();
    loadRoom();
}

// Load current room
function loadRoom() {
    if (currentRoom >= rooms.length) {
        showVictory();
        return;
    }
    
    const room = rooms[currentRoom];
    document.getElementById('room-title').textContent = `${room.emoji} ${room.title}`;
    document.getElementById('room-image').innerHTML = `<span style="font-size:5rem;">${room.emoji}</span>`;
    
    currentQuestion = 0;
    document.getElementById('feedback').textContent = "";
    document.getElementById('hint-area').classList.add('hidden');
    
    loadQuestion();
    updateProgress();
}

// Load current question
function loadQuestion() {
    const room = rooms[currentRoom];
    if (currentQuestion >= room.questions.length) {
        // Room completed! Move to next
        currentRoom++;
        if (currentRoom >= rooms.length) {
            showVictory();
        } else {
            alert(`🎉 Room ${currentRoom} completed! Moving to the next room...`);
            loadRoom();
        }
        return;
    }
    
    const q = room.questions[currentQuestion];
    document.getElementById('question-text').innerHTML = q.question;
    document.getElementById('current-question').textContent = `Question ${currentQuestion + 1} of ${room.questions.length}`;
    document.getElementById('answer-input').value = "";
    document.getElementById('answer-input').style.borderColor = "#6c63ff";
    document.getElementById('feedback').textContent = "";
    document.getElementById('hint-area').classList.add('hidden');
}

// Submit answer
function submitAnswer() {
    const answerInput = document.getElementById('answer-input');
    const userAnswer = answerInput.value.trim().toLowerCase();
    const feedback = document.getElementById('feedback');
    
    if (!userAnswer)
