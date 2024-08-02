const clickButton = document.getElementById("clickButton");
const starsDisplay = document.getElementById("stars");
const referralLinkInput = document.getElementById("referralLink");
const copyReferralLinkButton = document.getElementById("copyReferralLink");
const referralMessage = document.getElementById("referralMessage");
const userIdDisplay = document.getElementById("userId");

// Define constants
const maxStars = 100;
const referralBonus = 25;

// Retrieve or initialize the user ID
let userId = localStorage.getItem("userId");
if (!userId) {
  // Generate a new ID
  userId = getNextUserId();
  localStorage.setItem("userId", userId);
}

// Display user ID
userIdDisplay.textContent = userId;

// Generate and display referral link
const baseUrl = window.location.href.split("?")[0];
const referralLink = `${baseUrl}?ref=${userId}`;
referralLinkInput.value = referralLink;

let stars = 0; // Initialize stars
starsDisplay.textContent = stars;

clickButton.addEventListener("click", () => {
  if (stars < maxStars) {
    stars++;
    starsDisplay.textContent = stars;
  } else {
    alert("Daily limit of 100 stars reached!");
  }
});

// Handle referral link from URL
const referrerId = new URLSearchParams(window.location.search).get("ref");
if (referrerId && referrerId !== userId) {
  // Simulate awarding referral bonus
  stars = Math.min(stars + referralBonus, maxStars);
  starsDisplay.textContent = stars;
  referralMessage.textContent = `Referral code accepted! You've earned ${referralBonus} stars.`;
}

copyReferralLinkButton.addEventListener("click", () => {
  referralLinkInput.select();
  document.execCommand("copy");
  referralMessage.textContent = "Referral link copied to clipboard!";
});

// Get the next user ID
function getNextUserId() {
  let nextId = parseInt(localStorage.getItem("nextUserId"), 10);
  if (isNaN(nextId)) {
    nextId = 1; // Start with ID 1 if not set
  }
  localStorage.setItem("nextUserId", nextId + 1); // Increment ID
  return nextId;
}
