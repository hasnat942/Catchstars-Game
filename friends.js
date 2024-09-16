// Dummy data for friends list
const friendsData = ['Friend1', 'Friend2', 'Friend3'];

const friendsList = document.getElementById('friendsList');

// Populate the friends list
friendsData.forEach(friend => {
    const listItem = document.createElement('li');
    listItem.textContent = friend;
    friendsList.appendChild(listItem);
});
