const players = [];
let currentPlayer;
let flagContinue = false;
let player1 = player('player1', 'T');
let player2 = player('player2', 'N');
const board = gameBoard();

let DOMControl = (function () {
  function writeInCell(i, j, value) {
    document.getElementById(`${i}-${j}`).innerHTML = value;
  }

  function removePlayerForm() {
    document.getElementById('buttonDiv').remove();
    document.getElementById('saveButtonDiv').remove();
    document.getElementById('myPlayerForm-1').innerHTML = '';
    document.getElementById('myPlayerForm-2').innerHTML = '';
    document.getElementById('StartGameButton').disabled = false;
  }

  function displayPlayers() {
    const playerDiv1 = document.getElementById('Player1');
    const playerDiv2 = document.getElementById('Player2');

    playerDiv1.innerHTML = `${player1.name}, You're ${player1.token}`;
    playerDiv2.innerHTML = `${player2.name}, You're ${player2.token}`;
  }

  function getNameField(n) {
    return document.getElementById(`nameField-${n}`).value;
  }

  function playerCapture() {
    const name1 = getNameField(1);
    const name2 = getNameField(2);
    player1 = player(name1, 'X');
    player2 = player(name2, 'O');

    currentPlayer = player1;
    removePlayerForm();
    displayPlayers();
  }

  const formRender = (formDiv, PNumber) => {
    formDiv.innerHTML = '';

    const newPlayerForm = document.createElement('FORM');
    newPlayerForm.setAttribute('id', `myPlayerForm-${PNumber}`);
    formDiv.appendChild(newPlayerForm);

    const fieldLabel = document.createElement('label');
    fieldLabel.textContent = `Player ${PNumber} Name `;
    newPlayerForm.appendChild(fieldLabel);

    const playerName = document.createElement('INPUT');
    playerName.setAttribute('id', `nameField-${PNumber}`);
    playerName.setAttribute('type', 'text');
    playerName.setAttribute('placeholder', 'Name');
    newPlayerForm.appendChild(playerName);

    const saveButtonDiv = document.getElementById('saveButtonDiv');

    if (PNumber === 2) {
      const submitButton = document.createElement('Button');
      submitButton.addEventListener('click', playerCapture);
      submitButton.textContent = 'Save';
      submitButton.setAttribute('class', 'SaveButton');
      submitButton.setAttribute('type', 'button');
      submitButton.number = PNumber;

      saveButtonDiv.appendChild(submitButton);
    }
  };

  function enableBtn() {
    document.getElementById('StartGameButton').disabled = false;
  }

  return {
    formRender,
    writeInCell,
    enableBtn,
  };
}());

const go = () => {
  players.push(player1);
  players.push(player2);
  document.getElementById('StartGameButton').disabled = true;
  document.getElementById('StartGameButton').textContent = 'RESTART';
  let game = null;
  game = gameCycle(board);
  game.execute();
};

const newGame = () => {
  const buttonDiv = document.getElementById('buttonDiv2');
  const submitButton = document.createElement('Button');
  submitButton.addEventListener('click', go);
  submitButton.textContent = 'START';
  submitButton.disabled = true;
  submitButton.setAttribute('id', 'StartGameButton');
  submitButton.setAttribute('class', 'StartButton');
  submitButton.setAttribute('type', 'button');
  buttonDiv.appendChild(submitButton);
};

const startGame = () => {
  const formDiv = document.getElementById('divForm');
  const formDiv2 = document.getElementById('divForm2');
  const buttonDisable = document.getElementById('111');
  buttonDisable.disabled = true;
  DOMControl.formRender(formDiv, 1);
  DOMControl.formRender(formDiv2, 2);
  newGame();
};

const createStartButton = () => {
  const buttonDiv = document.getElementById('buttonDiv');
  const submitButton = document.createElement('Button');
  submitButton.addEventListener('click', startGame);
  submitButton.setAttribute('id', '111');
  submitButton.setAttribute('class', 'newPlayersButton');
  submitButton.textContent = 'New Players';
  submitButton.setAttribute('type', 'button');
  buttonDiv.appendChild(submitButton);
};

createStartButton();
