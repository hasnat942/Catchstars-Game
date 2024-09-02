// Initialize variables
let coins = 0;
let farmingCoins = 0;
let referrals = 0;
let checkInDone = false;
let userRank = "Beginner";
let level = 1;

// Function to handle daily check-in
function dailyCheckIn() {
    if (!checkInDone) {
        coins += 10; // Reward for daily check-in
        checkInDone = true;
        document.getElementById("coins").innerText = `Coins: ${coins}`;
        alert("Daily check-in successful! You earned 10 coins.");
    } else {
        alert("You have already checked in today.");
    }
}

// Function to handle start farming
function startFarming() {
    farmingCoins += 20; // Farming reward
    document.getElementById("farmingCoins").innerText = `Farming Coins: ${farmingCoins}`;
    alert("Farming started! You earned 20 farming coins.");
}

// Function to complete a task
function completeTask() {
    coins += 30; // Reward for completing a task
    document.getElementById("coins").innerText = `Coins: ${coins}`;
    alert("Task completed! You earned 30 coins.");
}

// Function to complete social tasks
function completeSocialTask() {
    coins += 50; // Reward for completing a social task
    document.getElementById("coins").innerText = `Coins: ${coins}`;
    alert("Social task completed! You earned 50 coins.");
}

// Function to update the leaderboard
function updateLeaderboard() {
    // Logic to update the leaderboard
    alert("Leaderboard updated.");
}

// Function to handle referral rewards
function handleReferral(inviteCount) {
    let reward = 0;
    if (inviteCount >= 100) {
        reward = 200; // Bonus reward for 100 referrals
    } else if (inviteCount >= 10) {
        reward = 100; // Bonus reward for 10 referrals
    } else if (inviteCount >= 5) {
        reward = 50; // Bonus reward for 5 referrals
    } else if (inviteCount >= 3) {
        reward = 20; // Bonus reward for 3 referrals
    }
    coins += reward;
    document.getElementById("coins").innerText = `Coins: ${coins}`;
    alert(`You earned ${reward} coins for referrals!`);
}

// Initialize the page
function init() {
    document.getElementById("coins").innerText = `Coins: ${coins}`;
    document.getElementById("farmingCoins").innerText = `Farming Coins: ${farmingCoins}`;
    document.getElementById("rank").innerText = `Rank: ${userRank}`;
    document.getElementById("level").innerText = `Level: ${level}`;
}

// Call init on page load
window.onload = init;
