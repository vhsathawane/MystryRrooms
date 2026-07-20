// Game State
let currentPlayer = "";
let currentRoom = 0;
let currentQuestion = 0;
let hintsUsed = 0;
let score = 0;

// Start the game - this function is called from the HTML button
function startGame() {
    console.log("startGame called"); // Debug log
    
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
    
    // Hide main menu, show game screen
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
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
    if (currentRoom >= rooms.length) {
        showVictory();
        return;
    }
    
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

// Submit answer - this function is called from the HTML button
function submitAnswer() {
    const answerInput = document.getElementById('answer-input');
    const userAnswer = answerInput.value.trim().toLowerCase();
    const feedback = document.getElementById('feedback');
    
    if (!userAnswer) {
        feedback.textContent = "Please enter an answer!";
        feedback.style.color = "#ff6b6b";
        return;
    }
    
    if (currentRoom >= rooms.length) {
        showVictory();
        return;
    }
    
    const room = rooms[currentRoom];
    const q = room.questions[currentQuestion];
    const correctAnswer = q.answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        // Correct answer
        feedback.textContent = "✅ Correct! Well done!";
        feedback.style.color = "#4caf50";
        answerInput.style.borderColor = "#4caf50";
        score += 10 - hintsUsed; // More points for fewer hints
        
        // Move to next question after a short delay
        setTimeout(() => {
            currentQuestion++;
            loadQuestion();
            updateProgress();
        }, 1000);
    } else {
        // Wrong answer
        feedback.textContent = "❌ Not quite right. Try again!";
        feedback.style.color = "#ff6b6b";
        answerInput.style.borderColor = "#ff6b6b";
        answerInput.value = "";
        setTimeout(() => {
            answerInput.style.borderColor = "#6c63ff";
        }, 500);
    }
}

// Show hint
function showHint() {
    if (currentRoom >= rooms.length) return;
    
    const room = rooms[currentRoom];
    const q = room.questions[currentQuestion];
    const hintArea = document.getElementById('hint-area');
    const hintText = document.getElementById('hint-text');
    
    hintsUsed++;
    hintText.textContent = q.hint;
    hintArea.classList.remove('hidden');
}

// Update progress bar
function updateProgress() {
    if (currentRoom >= rooms.length) {
        document.getElementById('progress-bar').textContent = "5/5";
        return;
    }
    
    const room = rooms[currentRoom];
    document.getElementById('progress-bar').textContent = `${currentQuestion}/${room.questions.length}`;
}

// Show victory screen
function showVictory() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('victory-screen').classList.remove('hidden');
    
    const message = `Amazing work, ${currentPlayer}! 🏆\nYou solved all ${rooms.length} rooms with ${score} points!`;
    document.getElementById('winner-message').textContent = message;
}

// Reset game
function resetGame() {
    document.getElementById('victory-screen').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
    document.getElementById('player-name').value = "";
    
    // Clear saved game
    localStorage.removeItem('mysteryRooms_save');
}

// Handle Enter key in answer input
document.addEventListener('DOMContentLoaded', function() {
    const answerInput = document.getElementById('answer-input');
    if (answerInput) {
        answerInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitAnswer();
            }
        });
    }
    
    const nameInput = document.getElementById('player-name');
    if (nameInput) {
        nameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                startGame();
            }
        });
    }
    
    console.log("Game initialized successfully!");
});
