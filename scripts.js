let collectedCoins = parseInt(localStorage.getItem('collectedCoins')) || 0;
let farmingCoins = parseInt(localStorage.getItem('farmingCoins')) || 0;
let farmingLimit = 20; // Daily limit for farming coins
let invites = parseInt(localStorage.getItem('invites')) || 0;
let level = parseInt(localStorage.getItem('level')) || 1;
let rank = localStorage.getItem('rank') || "Beginner";
let tasksCompleted = parseInt(localStorage.getItem('tasksCompleted')) || 0;
let socialTasksCompleted = parseInt(localStorage.getItem('socialTasksCompleted')) || 0;
let checkInBonus = 5; // Base bonus for daily check-in
let checkInStreak = parseInt(localStorage.getItem('checkInStreak')) || 0;
let lastCheckInTime = localStorage.getItem('lastCheckInTime') ? new Date(localStorage.getItem('lastCheckInTime')) : null;

// Update the display for collected coins, level, rank, etc.
function updateDisplay() {
    document.getElementById('collectedCoins').textContent = `Coins: ${collectedCoins}`;
    document.getElementById('farmingCoins').textContent = `Farming Coins: ${farmingCoins}`;
    document.getElementById('level').textContent = `Level: ${level}`;
    document.getElementById('rank').textContent = `Rank: ${rank}`;

    // Save data to local storage
    localStorage.setItem('collectedCoins', collectedCoins);
    localStorage.setItem('farmingCoins', farmingCoins);
    localStorage.setItem('level', level);
    localStorage.setItem('rank', rank);
    localStorage.setItem('tasksCompleted', tasksCompleted);
    localStorage.setItem('socialTasksCompleted', socialTasksCompleted);
    localStorage.setItem('checkInStreak', checkInStreak);
    localStorage.setItem('lastCheckInTime', lastCheckInTime);
}

// Daily Check-in Bonus
function dailyCheckIn() {
    const now = new Date();
    if (lastCheckInTime && now - lastCheckInTime < 24 * 60 * 60 * 1000) {
        alert("You have already checked in today! Come back tomorrow.");
        return;
    }

    lastCheckInTime = now;
    checkInStreak++;
    let bonus = checkInBonus + invites * 2; // Base bonus + invite-based bonus
    collectedCoins += bonus;
    alert(`Daily check-in successful! You earned ${bonus} coins. Total streak: ${checkInStreak} days.`);
    updateDisplay();
}

// Farming Function: Farm up to 20 coins per day
function startFarming() {
    if (farmingCoins >= farmingLimit) {
        alert("You have reached your daily farming limit. Come back tomorrow!");
        return;
    }
    
    let farmingEarnings = Math.min(farmingLimit - farmingCoins, 5); // Earn up to 5 coins per session
    farmingCoins += farmingEarnings;
    collectedCoins += farmingEarnings;
    alert(`You earned ${farmingEarnings} coins from farming!`);
    updateDisplay();
}

// Task Completion Logic
function completeTask(taskId) {
    tasksCompleted++;
    collectedCoins += 5; // Reward for each task
    alert(`Task ${taskId} completed! You earned 5 coins.`);
    updateDisplay();
}

// Social Task Completion Logic
function completeSocialTask(platform) {
    socialTasksCompleted++;
    collectedCoins += 10; // Reward for each social task
    alert(`You completed a task on ${platform}! You earned 10 coins.`);
    updateDisplay();
}

// Function to update the level and rank based on the collected coins
function updateLevelAndRank() {
    if (collectedCoins >= 500) {
        level++;
    }
    if (collectedCoins >= 1000) {
        rank = 'Pro';
    }
    updateDisplay();
}

// Leaderboard management
let leaderboard = [];

// Function to update the leaderboard
function updateLeaderboard(userName, userCoins) {
    leaderboard.push({ name: userName, coins: userCoins });
    leaderboard.sort((a, b) => b.coins - a.coins); // Sort in descending order by coins
    displayLeaderboard();
}

// Function to display the leaderboard
function displayLeaderboard() {
    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = '';
    leaderboard.forEach((user, index) => {
        const entry = document.createElement('div');
        entry.textContent = `${index + 1}. ${user.name} - ${user.coins} Coins`;
        leaderboardElement.appendChild(entry);
    });
}

// Initialize the game
function initializeGame() {
    updateDisplay();
}

// Call initialize on page load
document.addEventListener('DOMContentLoaded', initializeGame);
