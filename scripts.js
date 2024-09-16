document.addEventListener('DOMContentLoaded', function() {
    const checkInButton = document.getElementById('checkInButton');
    const lastCheckInTime = localStorage.getItem('lastCheckInTime');
    const now = new Date().getTime();

    if (lastCheckInTime && now - lastCheckInTime < 24 * 60 * 60 * 1000) {
        checkInButton.disabled = true;
        checkInButton.textContent = 'Come back in 24 hours';
    } else {
        checkInButton.disabled = false;
    }

    checkInButton.addEventListener('click', function() {
        localStorage.setItem('lastCheckInTime', new Date().getTime());
        checkInButton.disabled = true;
        checkInButton.textContent = 'Come back in 24 hours';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const referralButton = document.getElementById('referralButton');
    const referralLinkText = document.getElementById('referralLinkText');
    const userId = 'YOUR_TELEGRAM_USER_ID'; // Replace with actual logic for getting user's ID
    
    const referralLink = `https://t.me/YOUR_BOT_USERNAME?start=${userId}`;
    referralLinkText.textContent = referralLink;

    referralButton.addEventListener('click', function() {
        navigator.clipboard.writeText(referralLink).then(function() {
            alert('Referral link copied to clipboard!');
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
        });
    });
});


    <a href="ton://connect" id="connectWalletButton" class="button">Connect Wallet</a>


