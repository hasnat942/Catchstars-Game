// Dummy data for leaderboard
const leaderboardData = [
    { rank: 1, username: 'Player1', coins: 50000 },
    { rank: 2, username: 'Player2', coins: 45000 },
    { rank: 3, username: 'Player3', coins: 40000 }
];

const leaderboardTable = document.getElementById('leaderboardTable');

// Populate the leaderboard
leaderboardData.forEach(player => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${player.rank}</td><td>${player.username}</td><td>${player.coins}</td>`;
    leaderboardTable.appendChild(row);
});
