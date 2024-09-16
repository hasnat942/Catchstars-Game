// Daily Check-in Functionality
document.addEventListener('DOMContentLoaded', function() {
    const checkInButton = document.getElementById('checkInBtn');
    const checkInMessage = document.getElementById('checkInMessage');
    const currentStreak = document.getElementById('currentStreak');
    const lastCheckInDate = localStorage.getItem('lastCheckInDate');
    const now = new Date();
    let streak = parseInt(localStorage.getItem('streak') || '0', 10);
    const streakDays = [100, 200, 300, 400, 500, 600, 700];

    function updateStreak() {
        if (lastCheckInDate) {
            const lastCheckIn = new Date(lastCheckInDate);
            if (now - lastCheckIn > 24 * 60 * 60 * 1000) {
                streak = 0; // Reset streak if not checked in for 24 hours
            } else {
                streak = Math.min(streak + 1, 7); // Max streak is 7 days
            }
        } else {
            streak = 1;
        }

        if (streak > 7) {
            streak = 1; // Reset streak if it exceeds 7 days
        }
        
        localStorage.setItem('streak', streak);
        localStorage.setItem('lastCheckInDate', now.toISOString());
        currentStreak.textContent = `Current Streak: ${streakDays[streak - 1] || 0} Coins`;
        checkInMessage.textContent = `You have earned ${streakDays[streak - 1] || 0} Coins for today!`;
    }

    if (lastCheckInDate && now - new Date(lastCheckInDate) < 24 * 60 * 60 * 1000) {
        checkInButton.disabled = true;
        checkInButton.textContent = 'Come back in 24 hours';
    } else {
        checkInButton.disabled = false;
    }

    checkInButton.addEventListener('click', function() {
        updateStreak();
        checkInButton.disabled = true;
        checkInButton.textContent = 'Come back in 24 hours';
    });
});

// Referral Functionality
document.addEventListener('DOMContentLoaded', function() {
    const referralButton = document.getElementById('copyReferralLink');
    const referralLinkText = document.getElementById('referralLink');
    const botUsername = 'Catchstars_bot'; // Your bot's username
    const userId = 'YOUR_TELEGRAM_USER_ID'; // Replace this dynamically or fetch from the bot

    // Function to get user ID dynamically
    function getUserId() {
        // Replace with your logic to fetch user ID if needed
        return 'DYNAMIC_USER_ID'; // Placeholder for dynamic user ID fetching
    }

    const referralLink = `https://t.me/${botUsername}?start=${getUserId()}`;
    referralLinkText.textContent = referralLink;

    referralButton.addEventListener('click', function() {
        navigator.clipboard.writeText(referralLink).then(function() {
            alert('Referral link copied to clipboard!');
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
        });
    });
});

// Wallet Connect Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const connectWalletButton = document.getElementById('connectWalletButton');
    connectWalletButton.addEventListener('click', function() {
        window.location.href = 'ton://connect'; // Ensure this URL scheme is correct for your wallet
    });
});



