const clickButton = document.getElementById('clickButton');
const starsDisplay = document.getElementById('stars');
const referralLinkInput = document.getElementById('referralLink');
const copyReferralLinkButton = document.getElementById('copyReferralLink');
const referralMessage = document.getElementById('referralMessage');
const userIdDisplay = document.getElementById('userId');

// Define constants
const maxDailyStars = 100;
const referralBonus = 25;

// Retrieve or initialize the user ID
let userId = localStorage.getItem('userId');
if (!userId) {
    // Generate a new ID or get it from your Telegram bot server
    userId = generateUserId();
    localStorage.setItem('userId', userId);
}

// Display user ID
userIdDisplay.textContent = `User ID: ${userId}`;

// Generate and display referral link
const telegramBotUsername = 'Catchstars_bot'; // Your bot's username
const referralLink = `https://t.me/${telegramBotUsername}?start=${userId}`;
referralLinkInput.value = referralLink;

// Retrieve or initialize the stars count and last collected date
let stars = parseInt(localStorage.getItem('stars'), 10) || 0;
let lastCollectedDate = localStorage.getItem('lastCollectedDate');
const today = new Date().toISOString().split('T')[0];

// Reset stars if a new day has started
if (lastCollectedDate !== today) {
    localStorage.setItem('lastCollectedDate', today);
    stars = 0; // Reset daily stars
    localStorage.setItem('stars', stars);
}

// Display the current stars
starsDisplay.textContent = stars;

// Handle click event for collecting stars
clickButton.addEventListener('click', () => {
    if (stars < maxDailyStars) {
        stars++;
        starsDisplay.textContent = stars;
        localStorage.setItem('stars', stars); // Save stars to localStorage
    } else {
        alert('Daily limit of 100 stars reached!');
    }
});

// Handle referral link from Telegram bot
const urlParams = new URLSearchParams(window.location.search);
const referrerId = urlParams.get('start'); // Get the referrer ID from the 'start' parameter
if (referrerId && referrerId !== userId) {
    notifyBotOfReferral(referrerId);
}

copyReferralLinkButton.addEventListener('click', () => {
    referralLinkInput.select();
    document.execCommand('copy');
    referralMessage.textContent = 'Referral link copied to clipboard!';
});

// Generate a unique user ID (replace with actual method)
function generateUserId() {
    // This function should ideally interact with your server or Telegram bot to get a unique ID
    return Math.floor(Math.random() * 1000000);
}

// Notify the Telegram bot about the referral
function notifyBotOfReferral(referrerId) {
    // Example: Send referral data to your server or bot
    fetch(`/referral?referrer=${referrerId}&userId=${userId}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                stars = Math.min(stars + referralBonus, maxDailyStars);
                starsDisplay.textContent = stars;
                localStorage.setItem('stars', stars); // Save updated stars to localStorage
                referralMessage.textContent = `Referral code accepted! You've earned ${referralBonus} stars.`;
            } else {
                referralMessage.textContent = 'Referral code is invalid or expired.';
            }
        });
}
