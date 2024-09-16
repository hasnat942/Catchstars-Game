document.addEventListener('DOMContentLoaded', function() {
    // Daily Check-in
    const checkinButton = document.getElementById('daily-checkin');
    const checkinMsg = document.getElementById('checkin-msg');

    checkinButton.addEventListener('click', function() {
        checkinButton.disabled = true;
        checkinMsg.textContent = "You have checked in today!";
        // Simulate 24-hour lock by disabling the button for 24 hours
        setTimeout(() => {
            checkinButton.disabled = false;
            checkinMsg.textContent = "";
        }, 24 * 60 * 60 * 1000);  // 24 hours in milliseconds
    });

    // Referral Link Copy
    const referralInput = document.getElementById('referral-link');
    const copyButton = document.getElementById('copy-referral');

    copyButton.addEventListener('click', function() {
        referralInput.select();
        referralInput.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand("copy");

        alert("Referral link copied to clipboard!");
    });

    // Wallet Connect Button to TonSpace
    const walletButton = document.getElementById('connect-wallet');

    walletButton.addEventListener('click', function() {
        window.open('https://ton.space', '_blank');
    });
});


