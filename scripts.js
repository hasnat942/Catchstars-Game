// Elements
const checkInButton = document.getElementById("checkInButton");
const coinsDisplay = document.getElementById("coins");
const referralLinkInput = document.getElementById("referralLink");
const copyReferralLinkButton = document.getElementById("copyReferralLink");
const referralMessage = document.getElementById("referralMessage");
const userIdDisplay = document.getElementById("userId");
const settingsButton = document.getElementById("settingsButton");
const settingsModal = document.getElementById("settingsModal");
const closeSettingsButton = document.querySelector("#settingsModal .close");
const profileNameInput = document.getElementById("profileName");
const profileWalletInput = document.getElementById("profileWallet");
const saveProfileButton = document.getElementById("saveProfile");
const socialButtons = document.querySelectorAll(".social-rewards button");

// Constants
const dailyCoins = 20;
const maxCoins = 5000;
const checkInInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const rewardPerSocialTask = 125;

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

// Check-in button functionality
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

// Function to disable the check-in button
function disableCheckInButton() {
  checkInButton.disabled = true;
  checkInButton.style.backgroundColor = "#999"; // Change button color to indicate disabled state
  checkInButton.textContent = "Check-In Done! (Try again tomorrow)";
  setTimeout(() => {
    enableCheckInButton();
  }, checkInInterval - (Date.now() - lastCheckIn));
}

// Function to enable the check-in button
function enableCheckInButton() {
  checkInButton.disabled = false;
  checkInButton.style.backgroundColor = "#555";
  checkInButton.textContent = "Daily Check-In";
  checkInButton.classList.remove("animate-done");
}

// Generate a random user ID
function generateUserId() {
  return Math.floor(Math.random() * 1000000);
}

// Function to handle the profile settings modal
settingsButton.addEventListener("click", () => {
  settingsModal.style.display = "block";
});

closeSettingsButton.addEventListener("click", () => {
  settingsModal.style.display = "none";
});

saveProfileButton.addEventListener("click", () => {
  const name = profileNameInput.value.trim();
  const walletAddress = profileWalletInput.value.trim();

  if (name && walletAddress) {
    localStorage.setItem("profileName", name);
    localStorage.setItem("profileWallet", walletAddress);
    alert("Profile settings saved successfully.");
    settingsModal.style.display = "none";
  } else {
    alert("Please fill in both fields.");
  }
});

// Function to handle social tasks
socialButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.classList.contains("completed")) {
      coins = Math.min(coins + rewardPerSocialTask, maxCoins);
      coinsDisplay.textContent = coins;
      localStorage.setItem("coins", coins);
      button.classList.add("completed");
      button.textContent = "Reward Claimed";
      alert(
        `You earned ${rewardPerSocialTask} tokens for completing this task!`
      );
    } else {
      alert("You have already claimed this reward.");
    }
  });
});

// Function to handle copying referral link
copyReferralLinkButton.addEventListener("click", () => {
  referralLinkInput.select();
  document.execCommand("copy");
  alert("Referral link copied to clipboard!");
});
