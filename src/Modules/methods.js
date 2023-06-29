const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const idApi = 'Zl4d7IVkemOTTVg';
let leaderboardData = null;
// Function to create a new score for a game
const createScore = async (user, score) => {
  const url = `${baseUrl}/games/${idApi}/scores/`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user,
      score,
    }),
  });
  const data = await response.json();
  return data;
};
// Function to get the scores for a game
const getScores = async () => {
  const url = `${baseUrl}/games/${idApi}/scores/`;
  const response = await fetch(url);
  const data = await response.json();
  leaderboardData = data.result;
};

// Function to update the leaderboard on the web page
const updateLeaderboard = () => {
  const scoreList = document.getElementById('scoreList');
  scoreList.innerHTML = '';
  let index = 0;
  leaderboardData.forEach((score) => {
    const listItem = document.createElement('tr');
    listItem.classList.add('tr-padding');
    listItem.textContent = `${score.user}: ${score.score}`;
    index += 1;
    if (index % 2 === 0) {
      listItem.classList.add('even');
    }
    scoreList.appendChild(listItem);
  });
};

// Function to handle form submission
const submitScore = async (event) => {
  event.preventDefault();

  const nameField = document.getElementById('name');
  const scoreField = document.getElementById('score');

  const name = nameField.value;
  const score = parseInt(scoreField.value, 10);

  if (!name || Number.isNaN(score)) {
    const alertPara = document.querySelector('.alert-parascore');
    alertPara.textContent = 'Please enter a valid name and score';
    return;
  }

  try {
    await createScore(name, score);
    const alertPara = document.querySelector('.alert-parascore');
    alertPara.textContent = 'Name and Score added soccessfully';

    nameField.value = '';
    scoreField.value = '';
  } catch (error) {
    console.error('Error:', error.message);
    alert('An error occurred. Please try again.');
  }
};

// Function to handle refresh button click
const refreshScores = async () => {
  try {
    await getScores();
    updateLeaderboard();
  } catch (error) {
    console.error('Error:', error.message);
    alert('An error occurred. Please try again.');
  }
};
window.onload= refreshScores;
const refreshButton = document.querySelector('.Refresh');
refreshButton.addEventListener('click', refreshScores);

const submitButton = document.querySelector('.btn-submit');
submitButton.addEventListener('click', submitScore);
