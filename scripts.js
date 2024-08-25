const checkInButton = document.getElementById("checkInButton");
const coinsDisplay = document.getElementById("coins");
const referralLinkInput = document.getElementById("referralLink");
const copyReferralLinkButton = document.getElementById("copyReferralLink");
const referralMessage = document.getElementById("referralMessage");
const userIdDisplay = document.getElementById("userId");
const profileButton = document.getElementById("profileButton");
const searchIdButton = document.getElementById("searchIdButton");
const profileSettings = document.getElementById("profileSettings");
const profileNameInput = document.getElementById("profileName");
const telegramWalletInput = document.getElementById("telegramWallet");
const saveProfileButton = document.getElementById("saveProfile");

// Define constants
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

    // Disable button immediately and show "Done!" text
    checkInButton.disabled = true;
    checkInButton.textContent = "Done!";
    checkInButton.classList.add("animate-done");

    // Set a 2-second timeout for alert and then re-enable after 24 hours
    setTimeout(() => {
      alert(`You collected ${dailyCoins} coins today!`);
      disableCheckInButton(); // Keep the button disabled until 24 hours have passed
    }, 2000);
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

// Handling follow buttons
const followYouTubeButton = document.getElementById("followYouTube");
const followTwitterButton = document.getElementById("followTwitter");
const followTelegramButton = document.getElementById("followTelegram");

followYouTubeButton.addEventListener("click", () => {
  openLinkInNewTab("https://www.youtube.com/@catchstars942");
});

followTwitterButton.addEventListener("click", () => {
  openLinkInNewTab(
    "https://x.com/catchstars_CTH?t=5F3k7CY_6F3B2eM9OmPPVw&s=09"
  );
});

followTelegramButton.addEventListener("click", () => {
  openLinkInNewTab("https://t.me/catchstars942");
});

function openLinkInNewTab(url) {
  window.open(url, "_blank");
}

copyReferralLinkButton.addEventListener("click", () => {
  referralLinkInput.select();
  document.execCommand("copy");
  alert("Referral link copied to clipboard!");
});

profileButton.addEventListener("click", () => {
  profileSettings.classList.toggle("hidden");
});

saveProfileButton.addEventListener("click", () => {
  const name = profileNameInput.value;
  const walletAddress = telegramWalletInput.value;

  if (name && walletAddress) {
    alert("Profile settings saved!");
    // Save profile information to the server here
    profileSettings.classList.add("hidden");
  } else {
    alert("Please fill in all required fields.");
  }
});
