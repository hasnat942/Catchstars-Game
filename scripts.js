document.addEventListener("DOMContentLoaded", function() {
    const checkInButton = document.getElementById("checkInButton");
    const coinsDisplay = document.getElementById("coins");

    let coins = parseInt(localStorage.getItem("coins")) || 0;
    const dailyCoins = 20;
    const checkInInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    let lastCheckIn = parseInt(localStorage.getItem("lastCheckIn")) || 0;

    coinsDisplay.textContent = `Coins: ${coins}`;

    if (Date.now() - lastCheckIn < checkInInterval) {
        checkInButton.disabled = true;
    }

    checkInButton.addEventListener("click", () => {
        const now = Date.now();
        if (now - lastCheckIn >= checkInInterval) {
            coins += dailyCoins;
            localStorage.setItem("coins", coins);
            localStorage.setItem("lastCheckIn", now);
            coinsDisplay.textContent = `Coins: ${coins}`;
            checkInButton.disabled = true;
            alert("You collected 20 coins!");
        } else {
            alert("You can only check in once every 24 hours.");
        }
    });
});
