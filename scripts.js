document.addEventListener("DOMContentLoaded", () => {
  // Check-in Functionality
  const checkInBtn = document.getElementById("checkInBtn");
  const checkInMessage = document.getElementById("checkInMessage");

  let checkedIn = false;
  checkInBtn.addEventListener("click", () => {
    if (!checkedIn) {
      checkedIn = true;
      checkInMessage.textContent =
        "Check-in successful! You have earned 500 stars.";
      checkInBtn.disabled = true;
    } else {
      checkInMessage.textContent = "You have already checked in today.";
    }
  });

  // Referral Rewards Functionality
  const referralRewards = {
    3: 25000,
    5: 50000,
    10: 100000,
    100: 1000000
  };

  let invitesCount = 0;

  document.getElementById("copyReferralLink").addEventListener("click", () => {
    const referralLink = "https://catchstar.com/referral/12345";
    navigator.clipboard.writeText(referralLink).then(() => {
      document.getElementById(
        "referralLinkText"
      ).textContent = `Referral link copied: ${referralLink}`;
    });
  });

  const rewardButtons = document.querySelectorAll(".reward-btn");
  rewardButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const rewardForInvites = referralRewards[btn.id.replace("reward", "")];
      if (invitesCount >= parseInt(btn.id.replace("reward", ""))) {
        alert(`Congratulations! You've earned ${rewardForInvites} coins.`);
        btn.disabled = true;
      } else {
        alert("You need more invites to claim this reward.");
      }
    });
  });

  // Social Task Buttons
  const socialTaskButtons = document.querySelectorAll(".task-item button");
  socialTaskButtons.forEach((taskButton) => {
    taskButton.addEventListener("click", () => {
      taskButton.disabled = true;
      alert("Task completed! You've earned 125 stars.");
    });
  });
});
