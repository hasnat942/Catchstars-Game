// Replace with your bot token and chat ID
const BOT_TOKEN = 'YOUR_BOT_TOKEN';
const GROUP_OR_CHANNEL_ID = 'YOUR_GROUP_OR_CHANNEL_ID';

// Function to check if the user is a member of the group
async function isUserMemberOfGroup(userId) {
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${GROUP_OR_CHANNEL_ID}&user_id=${userId}`);
        const data = await response.json();

        // Check if the status is 'member' or 'administrator' or 'creator'
        if (data.result && (data.result.status === 'member' || data.result.status === 'administrator' || data.result.status === 'creator')) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error checking group membership:", error);
        return false;
    }
}

// Function to handle the completion of social tasks
async function completeSocialTask(userId) {
    const isMember = await isUserMemberOfGroup(userId);

    if (isMember) {
        // User is a member, award coins
        awardCoinsToUser(userId, 50); // Award 50 coins for completing the social task
        showMessageToUser("Congratulations! You have completed the social task and earned 50 coins.");
    } else {
        // User is not a member, show an error message
        showMessageToUser("Please join the group or channel to complete this task and earn coins!");
    }
}

// Function to handle daily check-in
function dailyCheckIn(userId) {
    const currentTime = new Date();
    const lastCheckInTime = localStorage.getItem('lastCheckInTime');

    if (lastCheckInTime) {
        const elapsedTime = currentTime - new Date(lastCheckInTime);
        const hoursElapsed = Math.floor(elapsedTime / (1000 * 60 * 60));

        if (hoursElapsed >= 24) {
            // Reward user after 24 hours
            awardCoinsToUser(userId, 10); // Award 10 coins for daily check-in
            showMessageToUser("Daily check-in successful! You have earned 10 coins.");
            localStorage.setItem('lastCheckInTime', currentTime);
        } else {
            showMessageToUser(`You can check in again after ${24 - hoursElapsed} hours.`);
        }
    } else {
        // First-time check-in
        awardCoinsToUser(userId, 10);
        showMessageToUser("Daily check-in successful! You have earned 10 coins.");
        localStorage.setItem('lastCheckInTime', currentTime);
    }
}

// Function to start farming
function startFarming(userId) {
    // Farming logic
    showMessageToUser("Farming started! You will earn coins after 24 hours.");
    setTimeout(() => {
        awardCoinsToUser(userId, 20); // Award 20 coins after farming period
        showMessageToUser("Farming completed! You have earned 20 coins.");
    }, 24 * 60 * 60 * 1000); // 24 hours delay
}

// Award coins to user function
function awardCoinsToUser(userId, amount) {
    let currentCoins = parseInt(localStorage.getItem('coins') || '0', 10);
    currentCoins += amount;
    localStorage.setItem('coins', currentCoins);
    document.getElementById('coinsCount').innerText = `Coins: ${currentCoins}`;
}

// Show message to user function
function showMessageToUser(message) {
    alert(message);
}

// Event listeners for buttons
document.getElementById('dailyCheckInBtn').addEventListener('click', () => dailyCheckIn('user_id_placeholder'));
document.getElementById('startFarmingBtn').addEventListener('click', () => startFarming('user_id_placeholder'));
document.getElementById('completeSocialTaskBtn').addEventListener('click', () => completeSocialTask('user_id_placeholder'));
