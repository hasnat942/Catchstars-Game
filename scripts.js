let collectedCoins = 0;
let miningRate = 1; // Initial mining rate
let invites = 0;
let level = 1;
let rank = "Beginner";
let tasksCompleted = 0;
let socialTasksCompleted = 0;

// Update the collection, mining rate, level, and rank display
function updateDisplay() {
    document.getElementById('collectedCoins').textContent = collectedCoins;
    document.getElementById('miningRate').textContent = miningRate.toFixed(2);
    document.getElementById('level').textContent = level;
    document.getElementById('rank').textContent = rank;
}

// Function to collect coins
function collectCoins() {
    collectedCoins += miningRate;
    updateLevelAndRank();
    updateDisplay();
}

// Copy the referral link and handle invite rewards
function copyReferralLink() {
    let referralLink = "https://yourwebsite.com/referral";
    navigator.clipboard.writeText(referralLink);
    invites++;
    checkInviteRewards();
    alert(`Referral link copied! Invite friends to increase your mining rate.`);
}

// Check and apply referral rewards
function checkInviteRewards() {
    if (invites === 3) {
        collectedCoins += 10;
    } else if (invites === 5) {
        collectedCoins += 20;
    } else if (invites === 10) {
        collectedCoins += 50;
    } else if (invites === 100) {
        collectedCoins += 1000;
    }
    miningRate += (invites * 0.01);
    updateDisplay();
}

// Update the level and rank based on the collected coins
function updateLevelAndRank() {
    if (collectedCoins >= 500) {
        level++;
    }
    if (collectedCoins >= 1000) {
        rank = 'Pro';
    }
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

// Function to add animations
function addAnimations() {
    const elements = document.querySelectorAll('.animated');
    elements.forEach(element => {
        element.classList.add('animate__animated', 'animate__bounceIn');
    });
}

// Initialize the game
function initializeGame() {
    updateDisplay();
    addAnimations();
}

// Call initialize on page load
document.addEventListener('DOMContentLoaded', initializeGame);
