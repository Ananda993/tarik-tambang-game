let ropePosition = 50;
const operators = ['+', '-', '*'];
let currentProblems = {
    red: { problem: '', answer: 0 },
    blue: { problem: '', answer: 0 }
};

// Generate a random number between min and max
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random math problem
function generateProblem() {
    const num1 = random(1, 12);
    const num2 = random(1, 12);
    const operator = operators[random(0, operators.length - 1)];
    
    let answer;
    switch(operator) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
    }
    
    return {
        problem: `${num1} ${operator} ${num2} = ?`,
        answer: answer
    };
}

// Update the rope position
function updateRopePosition() {
    const marker = document.querySelector('.marker');
    marker.style.left = `${ropePosition}%`;

    // Check for winner
    if (ropePosition <= 20) {
        alert('Tim Merah Menang! 🎉');
        resetGame();
    } else if (ropePosition >= 80) {
        alert('Tim Biru Menang! 🎉');
        resetGame();
    }
}

// Reset the game
function resetGame() {
    ropePosition = 50;
    updateRopePosition();
    generateNewProblems();
}

// Generate new problems for both teams
function generateNewProblems() {
    const redProblem = generateProblem();
    const blueProblem = generateProblem();

    currentProblems.red = redProblem;
    currentProblems.blue = blueProblem;

    document.getElementById('red-problem').textContent = redProblem.problem;
    document.getElementById('blue-problem').textContent = blueProblem.problem;

    // Clear input fields
    document.getElementById('red-answer').value = '';
    document.getElementById('blue-answer').value = '';
}

// Check the answer for a team
function checkAnswer(team) {
    const answerInput = document.getElementById(`${team}-answer`);
    const userAnswer = parseInt(answerInput.value);

    if (isNaN(userAnswer)) {
        alert('Masukkan angka yang valid!');
        return;
    }

    const correct = userAnswer === currentProblems[team].answer;

    if (correct) {
        // Move the rope
        if (team === 'red') {
            ropePosition = Math.max(0, ropePosition - 5);
        } else {
            ropePosition = Math.min(100, ropePosition + 5);
        }
        updateRopePosition();
    }

    // Generate a new problem for the team
    const newProblem = generateProblem();
    currentProblems[team] = newProblem;
    document.getElementById(`${team}-problem`).textContent = newProblem.problem;
    answerInput.value = '';
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    updateRopePosition();
    generateNewProblems();
});