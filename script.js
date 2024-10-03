<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
  <title>Catchstar - Earn Rewards</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js"></script>
  <script src="script.js" defer></script>
  <style>
    /* Block non-mobile devices */
    @media screen and (min-width: 768px) {
      body {
        display: none;
        visibility: hidden;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="header-content">
      <h1>Catchstar - Earn Stars & Coins</h1>
      <p>Your journey to becoming a star collector begins here. Invite friends, complete tasks, and earn rewards!</p>
    </div>
  </header>

  <main>
    <section class="welcome-section">
      <div class="welcome-text">
        <h2>Welcome to Catchstar</h2>
        <p>Catchstar allows you to earn coins and stars by completing simple tasks, inviting friends, and staying active daily. Collect coins and redeem them for exciting rewards. The more you invite, the more you earn!</p>
      </div>
      <div class="daily-check-in">
        <h3>Daily Check-in</h3>
        <button id="checkInBtn">Check-in for Today</button>
        <p id="checkInMessage"></p>
      </div>
    </section>

    <!-- Rewards Section -->
    <section class="rewards-section">
      <div class="section-header">
        <h2>Earn More Stars & Coins</h2>
        <p>Invite friends, complete social tasks, and unlock special rewards by growing your Catchstar network!</p>
      </div>

      <div class="rewards-content">
        <!-- Referral Section -->
        <div class="referral-container">
          <h3>Referral Program</h3>
          <p>Invite your friends to Catchstar and earn big rewards based on how many friends join using your referral link!</p>

          <div class="invite-status">
            <p>Friends Referred: <span id="invitesCount">0</span></p>
            <button id="copyReferralLink">Copy Referral Link</button>
            <p id="referralLinkText">Your referral link: <span id="referralLink"></span></p>
          </div>

          <div class="reward-container">
            <div class="reward">
              <p>Refer 3 Friends</p>
              <button class="reward-btn" id="reward3">+25,000 Coins</button>
            </div>
            <div class="reward">
              <p>Refer 5 Friends</p>
              <button class="reward-btn" id="reward5">+50,000 Coins</button>
            </div>
            <div class="reward">
              <p>Refer 10 Friends</p>
              <button class="reward-btn" id="reward10">+100,000 Coins</button>
            </div>
            <div class="reward">
              <p>Refer 100 Friends</p>
              <button class="reward-btn" id="reward100">+1,000,000 Coins</button>
            </div>
          </div>
        </div>

        <!-- Social Tasks -->
        <div class="social-tasks">
          <h3>Social Tasks</h3>
          <p>Complete social media tasks to earn stars and coins. Make sure you're connected to all of our channels!</p>

          <div class="task-item">
            <p>Follow us on Twitter</p>
            <button id="twitterTask">+125 Stars</button>
          </div>
          <div class="task-item">
            <p>Subscribe to our YouTube channel</p>
            <button id="youtubeTask">+125 Stars</button>
          </div>
          <div class="task-item">
            <p>Join our Telegram group</p>
            <button id="telegramTask">+125 Stars</button>
          </div>
        </div>
      </div>
    </section>

    <section class="leaderboard-section">
      <h2>Leaderboard</h2>
      <p>See how you rank against other players. The more stars you collect, the higher your ranking!</p>
      <button onclick="window.location.href='leaderboard.html'">View Leaderboard</button>
    </section>

    <section class="wallet-section">
      <h2>Connect Your Wallet</h2>
      <p>Connect your wallet to Catchstar and securely store the coins you've earned. Withdraw or exchange them anytime!</p>
      <button id="connectWalletBtn">Connect Wallet</button>
    </section>
  </main>

  <footer>
    <div class="footer-nav">
      <button onclick="window.location.href='home.html'">Home</button>
      <button onclick="window.location.href='profile.html'">Profile</button>
      <button onclick="window.location.href='help.html'">Help & FAQ</button>
    </div>
    <p>&copy; 2024 Catchstar. All rights reserved.</p>
  </footer>

  <script>
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAvuEg4cz87jLaZFp0jkVdkVCCnpU_L3MM",
      authDomain: "catchstar-mining-game.firebaseapp.com",
      projectId: "catchstar-mining-game",
      storageBucket: "catchstar-mining-game.appspot.com",
      messagingSenderId: "585571833493",
      appId: "1:585571833493:web:1751bf232d73ac7a0bed9c",
      measurementId: "G-BJY2B999R7"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

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
  </script>
</body>
</html>
