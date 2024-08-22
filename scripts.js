const checkInButton = document.getElementById("checkInButton");
const coinsDisplay = document.getElementById("coins");
const referralLinkInput = document.getElementById("referralLink");
const copyReferralLinkButton = document.getElementById("copyReferralLink");
const referralMessage = document.getElementById("referralMessage");
const userIdDisplay = document.getElementById("userId");

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

// Handling referral link copy
copyReferralLinkButton.addEventListener("click", () => {
  referralLinkInput.select();
  document.execCommand("copy");
  alert("Referral link copied to clipboard!");
});

// Handling social tasks
const socialTasks = document.querySelectorAll(".social-rewards button");

socialTasks.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (!button.classList.contains("completed")) {
      // Add reward logic here
      coins = Math.min(coins + 125, maxCoins);
      coinsDisplay.textContent = coins;
      localStorage.setItem("coins", coins);

      // Mark task as completed
      button.classList.add("completed");
      button.textContent = `Completed - 125 Tokens`;
      alert(`You earned 125 tokens for completing a social task!`);
    } else {
      alert("You have already completed this task.");
    }
  });
});

// Profile settings modal
const settingsButton = document.getElementById("settingsButton");
const settingsModal = document.getElementById("settingsModal");
const closeModal = document.querySelector(".modal .close");
const saveSettingsButton = document.getElementById("saveSettings");

settingsButton.addEventListener("click", () => {
  settingsModal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  settingsModal.style.display = "none";
});

saveSettingsButton.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const telegramWallet = document.getElementById("telegramWallet").value;

  if (name && telegramWallet) {
    // Save profile settings
    localStorage.setItem("profileName", name);
    localStorage.setItem("telegramWallet", telegramWallet);

    alert("Profile settings saved successfully!");
    settingsModal.style.display = "none";
  } else {
    alert("Please fill in all required fields.");
  }
});
