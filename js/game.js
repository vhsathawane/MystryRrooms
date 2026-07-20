// Game State
let currentPlayer = "";
let currentRoom = 0;
let currentQuestion = 0;
let hintsUsed = 0;
let score = 0;
let isTransitioning = false; // Prevent multiple clicks during transition

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
    
    displayRoom();
}

// Display current room and first question
function displayRoom() {
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
    
    displayQuestion();
}

// Display current question
function displayQuestion() {
    // If already past all rooms, show victory
    if (currentRoom >= rooms.length) {
        showVictory();
        return;
    }
    
    const room = rooms[currentRoom];
    
    // If all questions in this room are done, move to next room
    if (currentQuestion >= room.questions.length) {
        moveToNextRoom();
        return;
    }
    
    const q = room.questions[currentQuestion];
    document.getElementById('question-text').innerHTML = q.question;
    document.getElementById('current-question').textContent = `Question ${currentQuestion + 1} of ${room.questions.length}`;
    document.getElementById('progress-bar').textContent = `${currentQuestion}/${room.questions.length}`;
    document.getElementById('answer-input').value = "";
    document.getElementById('answer-input').style.borderColor = "#6c63ff";
    document.getElementById('feedback').textContent = "";
    document.getElementById('hint-area').classList.add('hidden');
    isTransitioning = false;
}

// Move to next room
function moveToNextRoom() {
    currentRoom++;
    
    if (currentRoom >= rooms.length) {
        showVictory();
    } else {
        // Show alert and then load next room
        setTimeout(() => {
            alert(`🎉 You completed Room ${currentRoom}! Moving to the next room...`);
            displayRoom();
        }, 300);
    }
}

// Submit answer
function submitAnswer() {
    // Prevent double submissions during transition
    if (isTransitioning) return;
    
    const answerInput = document.getElementById('answer-input');
    const userAnswer = answerInput.value.trim().toLowerCase();
    const feedback = document.getElementById('feedback');
    
    if (!userAnswer) {
        feedback.textContent = "Please enter an answer!";
        feedback.style.color = "#ff6b6b";
        return;
    }
    
    // Safety check
    if (currentRoom >= rooms.length) {
        showVictory();
        return;
    }
    
    const room = rooms[currentRoom];
    if (currentQuestion >= room.questions.length) {
        moveToNextRoom();
        return;
    }
    
    const q = room.questions[currentQuestion];
    const correctAnswer = q.answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        // Correct answer
        feedback.textContent = "✅ Correct! Well done!";
        feedback.style.color = "#4caf50";
        answerInput.style.borderColor = "#4caf50";
        score += Math.max(5, 10 - hintsUsed); // Minimum 5 points
        
        isTransitioning = true;
        
        // Move to next question after delay
        setTimeout(() => {
            currentQuestion++;
            displayQuestion();
        }, 1200);
    } else {
        // Wrong answer
        feedback.textContent = "❌ Not quite right. Try again!";
        feedback.style.color = "#ff6b6b";
        answerInput.style.borderColor = "#ff6b6b";
        answerInput.value = "";
        answerInput.focus();
        setTimeout(() => {
            answerInput.style.borderColor = "#6c63ff";
        }, 500);
    }
}

// Show hint
function showHint() {
    if (isTransitioning) return;
    if (currentRoom >= rooms.length) return;
    
    const room = rooms[currentRoom];
    if (currentQuestion >= room.questions.length) return;
    
    const q = room.questions[currentQuestion];
    const hintArea = document.getElementById('hint-area');
    const hintText = document.getElementById('hint-text');
    
    hintsUsed++;
    hintText.textContent = q.hint;
    hintArea.classList.remove('hidden');
}

// Show victory screen
function showVictory() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('victory-screen').classList.remove('hidden');
    
    const rating = score >= 40 ? "Legendary Detective" : score >= 25 ? "Master Sleuth" : "Junior Detective";
    const message = `Amazing work, ${currentPlayer}! 🏆\nYou solved all ${rooms.length} rooms!\nScore: ${score} points\nRank: ${rating}`;
    document.getElementById('winner-message').textContent = message;
}

// Reset game
function resetGame() {
    document.getElementById('victory-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
    document.getElementById('player-name').value = "";
    currentRoom = 0;
    currentQuestion = 0;
    score = 0;
    hintsUsed = 0;
    isTransitioning = false;
}

// Handle Enter key press
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
    
    console.log("Mystery Rooms game loaded successfully!");
    console.log(`Total rooms available: ${rooms.length}`);
});
