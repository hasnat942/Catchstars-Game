const clickButton = document.getElementById("clickButton");
const starsDisplay = document.getElementById("stars");
const referralLinkInput = document.getElementById("referralLink");
const copyReferralLinkButton = document.getElementById("copyReferralLink");
const referralMessage = document.getElementById("referralMessage");
const userIdDisplay = document.getElementById("userId");
const followYouTubeButton = document.getElementById("followYouTube");
const followTwitterButton = document.getElementById("followTwitter");
const followTelegramButton = document.getElementById("followTelegram");

// Define constants
const maxStars = 100;
const referralBonus = 25;
const socialFollowBonus = 200;

// Retrieve or initialize the user ID
let userId = localStorage.getItem("userId");
if (!userId) {
  userId = generateUserId();
  localStorage.setItem("userId", userId);
}

// Display user ID
userIdDisplay.textContent = userId;

// Generate and display referral link
const telegramBotUsername = "Catchstars_bot"; // Your bot's username
const referralLink = `https://t.me/${telegramBotUsername}?start=${userId}`;
referralLinkInput.value = referralLink;

// Retrieve or initialize the stars count
let stars = parseInt(localStorage.getItem("stars"), 10);
if (isNaN(stars)) {
  stars = 0;
}
starsDisplay.textContent = stars;

clickButton.addEventListener("click", () => {
  if (stars < maxStars) {
    stars++;
    starsDisplay.textContent = stars;
    localStorage.setItem("stars", stars);
  } else {
    alert("Daily limit of 100 stars reached!");
  }
});

// Handle referral link from Telegram bot
const urlParams = new URLSearchParams(window.location.search);
const referrerId = urlParams.get("start");
if (referrerId && referrerId !== userId) {
  notifyBotOfReferral(referrerId);
}

copyReferralLinkButton.addEventListener("click", () => {
  referralLinkInput.select();
  document.execCommand("copy");
  referralMessage.textContent = "Referral link copied to clipboard!";
});

followYouTubeButton.addEventListener("click", () => {
  window.open("https://www.youtube.com/@catchstars942", "_blank");
  rewardStars(socialFollowBonus);
});

followTwitterButton.addEventListener("click", () => {
  window.open(
    "https://x.com/catchstars_CTH?t=5F3k7CY_6F3B2eM9OmPPVw&s=09",
    "_blank"
  );
  rewardStars(socialFollowBonus);
});

followTelegramButton.addEventListener("click", () => {
  window.open("https://t.me/catchstars942", "_blank");
  rewardStars(socialFollowBonus);
});

function rewardStars(amount) {
  stars = Math.min(stars + amount, maxStars);
  starsDisplay.textContent = stars;
  localStorage.setItem("stars", stars);
}

function generateUserId() {
  return Math.floor(Math.random() * 1000000);
}

function notifyBotOfReferral(referrerId) {
  fetch(`/referral?referrer=${referrerId}&userId=${userId}`, { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        stars = Math.min(stars + referralBonus, maxStars);
        starsDisplay.textContent = stars;
        localStorage.setItem("stars", stars);
        referralMessage.textContent = `Referral code accepted! You've earned ${referralBonus} stars.`;
      } else {
        referralMessage.textContent = "Referral code is invalid or expired.";
      }
    });
}
