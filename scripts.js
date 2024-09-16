document.addEventListener('DOMContentLoaded', function () {
    const checkInBtn = document.getElementById('checkInBtn');
    const checkInMessage = document.getElementById('checkInMessage');
    const timerDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Check for the last check-in time from local storage
    const lastCheckInTime = localStorage.getItem('lastCheckInTime');
    const currentTime = Date.now();

    if (lastCheckInTime && (currentTime - lastCheckInTime) < timerDuration) {
        checkInBtn.disabled = true;
        checkInMessage.textContent = 'You have already checked in today. Come back tomorrow.';
    }

    checkInBtn.addEventListener('click', function () {
        // Set the last check-in time to the current time
        localStorage.setItem('lastCheckInTime', Date.now());
        checkInBtn.disabled = true;
        checkInMessage.textContent = 'Check-in successful! Come back tomorrow.';
    });
});

