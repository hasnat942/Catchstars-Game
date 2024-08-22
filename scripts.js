const checkInButton = document.getElementById("checkInButton");
const coinsDisplay = document.getElementById("coins");
const referralLinkInput = document.getElementById("referralLink");
const copyReferralLinkButton = document.getElementById("copyReferralLink");
const referralMessage = document.getElementById("referralMessage");
const userIdDisplay = document.getElementById("userId");

// Constants
const dailyCoins = 20;
const maxCoins = 5000;
const checkInInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Retrieve or initialize the user ID
let userId = localStorage.getItem("userId");
if (!userId) {
  userId = generateUserId();
  localStorage.setItem("userId", userId);
}

// Display user ID
userIdDisplay.textContent = `Your ID: ${userId}`;

// Generate and display referral link
const telegramBotUsername = "Catchstars_bot";
const referralLink = `https://t.me/${telegramBotUsername}?start=${userId}`;
referralLinkInput.value = referralLink;

// Retrieve or initialize the coins count and last check-in time
let coins = parseInt(localStorage.getItem("coins"), 10);
let lastCheckIn = parseInt(localStorage.getItem("lastCheckIn"), 10);
if (isNaN(coins)) {
  coins = 0;
}
if (isNaN(lastCheckIn)) {
  lastCheckIn = 0;
}
coinsDisplay.textContent = coins;

// Check if the button should be disabled
if (Date.now() - lastCheckIn < checkInInterval) {
  disableCheckInButton();
}

checkInButton.addEventListener("click", () => {
  const now = Date.now();
  if (now - lastCheckIn >= checkInInterval) {
    coins = Math.min(coins + dailyCoins, maxCoins);
    coinsDisplay.textContent = coins;
    localStorage.setItem("coins", coins);
    localStorage.setItem("lastCheckIn", now);

    // Disable button immediately
    checkInButton.disabled = true;
    checkInButton.textContent = "Done!";
    checkInButton.classList.add("animate-done");

    // Disable button for 24 hours
    disableCheckInButton();
  } else {
    alert("You can only check-in once every 24 hours.");
  }
});

function disableCheckInButton() {
  checkInButton.disabled = true;
  checkInButton.style.backgroundColor = "#999"; // Change button color to indicate disabled state
  checkInButton.textContent = "Check-In Done! (Try again tomorrow)";
  setTimeout(() => {
    enableCheckInButton();
  }, checkInInterval - (Date.now() - lastCheckIn));
}

function enableCheckInButton() {
  checkInButton.disabled = false;
  checkInButton.style.backgroundColor = "#555";
  checkInButton.textContent = "Daily Check-In";
  checkInButton.classList.remove("animate-done");
}

function generateUserId() {
  return Math.floor(Math.random() * 1000000);
}

// Copy referral link to clipboard
copyReferralLinkButton.addEventListener("click", () => {
  referralLinkInput.select();
  referralLinkInput.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand("copy");
  referralMessage.textContent = "Referral link copied!";
});

// Handle follow buttons
const followYouTubeButton = document.getElementById("followYouTube");
const followTwitterButton = document.getElementById("followTwitter");
const followTelegramButton = document.getElementById("followTelegram");

followYouTubeButton.addEventListener("click", () => {
  openLinkInNewTab("https://www.youtube.com/@catchstars942");
});

followTwitterButton.addEventListener("click", () => {
  openLinkInNewTab("https://x.com/catchstars_CTH?t=5F3k7
