document.addEventListener("DOMContentLoaded", () => {
  // Check-in Functionality
  const checkInBtn = document.getElementById("checkInBtn");
  const checkInMessage = document.getElementById("checkInMessage");

  // Check if user has checked in today
  let checkedIn = localStorage.getItem('checkedIn') === 'true';

  // Function to update UI based on check-in status
  const updateCheckInStatus = () => {
    if (checkedIn) {
      checkInMessage.textContent = "You have already checked in today.";
      checkInBtn.disabled = true;
    } else {
      checkInMessage.textContent = "";
      checkInBtn.disabled = false;
    }
  };

  // Initial UI update
  updateCheckInStatus();

  checkInBtn.addEventListener("click", () => {
    if (!checkedIn) {
      checkedIn = true;
      localStorage.setItem('checkedIn', 'true');
      checkInMessage.textContent = "Check-in successful! You have earned 500 stars.";
      checkInBtn.disabled = true;

      // Reset check-in status after 24 hours
      setTimeout(() => {
        checkedIn = false;
        localStorage.setItem('checkedIn', 'false');
        updateCheckInStatus();
      }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    }
  });

  // Referral Rewards Functionality
  const referralRewards = {
    3: 25000,
    5: 50000,
    10: 100000,
    100: 1000000
  };

  let invitesCount = parseInt(localStorage.getItem('invitesCount') || '0');
  document.getElementById("invitesCount").textContent = invitesCount;

  document.getElementById("copyReferralLink").addEventListener("click", () => {
    const referralLink = "https://catchstar.com/referral/12345";
    navigator.clipboard.writeText(referralLink).then(() => {
      document.getElementById("referralLinkText").textContent = `Referral link copied: ${referralLink}`;
    });
  });

  const rewardButtons = document.querySelectorAll(".reward-btn");
  rewardButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const rewardThreshold = parseInt(btn.id.replace("reward", ""));
      const rewardForInvites = referralRewards[rewardThreshold];

      if (invitesCount >= rewardThreshold) {
        alert(`Congratulations! You've earned ${rewardForInvites} coins.`);
        btn.disabled = true;
        localStorage.setItem(`reward${rewardThreshold}`, 'claimed');
      } else {
        alert("You need more invites to claim this reward.");
      }
    });
  });

  // Disable claimed rewards
  Object.keys(referralRewards).forEach(threshold => {
    if (localStorage.getItem(`reward${threshold}`) === 'claimed') {
      document.getElementById(`reward${threshold}`).disabled = true;
    }
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
