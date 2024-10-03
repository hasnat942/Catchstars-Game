<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDmD2jb61ovT3sxFKxnXv-q1CkiJ_tboUg",
    authDomain: "catchstar-4337e.firebaseapp.com",
    projectId: "catchstar-4337e",
    storageBucket: "catchstar-4337e.appspot.com",
    messagingSenderId: "374195869840",
    appId: "1:374195869840:web:bd4d6f86eed073fe152015",
    measurementId: "G-0X376YTEQT"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app); // Initialize Firestore

  document.addEventListener("DOMContentLoaded", () => {
    // Check-in Functionality
    const checkInBtn = document.getElementById("checkInBtn");
    const checkInMessage = document.getElementById("checkInMessage");
    let checkedIn = false;

    checkInBtn.addEventListener("click", async () => {
      if (!checkedIn) {
        checkedIn = true;
        checkInMessage.textContent =
          "Check-in successful! You have earned 500 stars.";
        checkInBtn.disabled = true;

        // Add check-in reward to Firestore
        await addScore("user123", 500); // Replace "user123" with the actual user ID
      } else {
        checkInMessage.textContent = "You have already checked in today.";
      }
    });

    // Function to add score to Firestore
    async function addScore(userId, score) {
      try {
        const docRef = await addDoc(collection(db, "leaderboard"), {
          userId: userId,
          score: score,
          timestamp: new Date()
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

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
      btn.addEventListener("click", async () => {
        const rewardForInvites = referralRewards[btn.id.replace("reward", "")];
        if (invitesCount >= parseInt(btn.id.replace("reward", ""))) {
          alert(`Congratulations! You've earned ${rewardForInvites} coins.`);
          btn.disabled = true;

          // Add referral reward to Firestore
          await addScore("user123", rewardForInvites); // Replace "user123" with the actual user ID
        } else {
          alert("You need more invites to claim this reward.");
        }
      });
    });

    // Social Task Buttons
    const socialTaskButtons = document.querySelectorAll(".task-item button");
    socialTaskButtons.forEach((taskButton) => {
      taskButton.addEventListener("click", async () => {
        taskButton.disabled = true;
        alert("Task completed! You've earned 125 stars.");

        // Add social task reward to Firestore
        await addScore("user123", 125); // Replace "user123" with the actual user ID
      });
    });
  });
</script>
