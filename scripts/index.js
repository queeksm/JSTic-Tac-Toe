const players = [];
let currentPlayer;
let flagContinue = false;


const gameBoard = () => {
  let board = [];
  board = [['', '', ''], ['', '', ''], ['', '', '']];
  const updateBoard = (row, column, token) => {
    if (board[row][column] === '') {
      board[row][column] = token;
      return board;
    }
    return null;
  };

  const drawBoard = () => {
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        document.getElementById(`${i}-${j}`).innerHTML = board[i][j];
      }
    }
  };

  const cleanBoard = () => {
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        board[i][j] = '';
        document.getElementById(`${i}-${j}`).innerHTML = board[i][j];
      }
    }
  };

  const isFull = () => {
    const condition = board[0].includes('') || board[1].includes('') || board[2].includes('');
    return condition;
  };

  return {
    board, updateBoard, drawBoard, cleanBoard, isFull,
  };
};

const player = (name, token) => ({ name, token });

let player1 = player('player1', 'T');
let player2 = player('player2', 'N');
const board = gameBoard();

function playerCapture() {
  const name1 = document.getElementById('nameField-1').value;
  const name2 = document.getElementById('nameField-2').value;
  player1 = player(name1, 'X');
  player2 = player(name2, 'O');

  currentPlayer = player1;

  document.getElementById('buttonDiv').remove();
  document.getElementById('saveButtonDiv').remove();
  document.getElementById('myPlayerForm-1').innerHTML = '';
  document.getElementById('myPlayerForm-2').innerHTML = '';
  document.getElementById('StartGameButton').disabled = false;

  const playerDiv1 = document.getElementById('Player1');
  const playerDiv2 = document.getElementById('Player2');

  playerDiv1.innerHTML = `${player1.name}, You're ${player1.token}`;
  playerDiv2.innerHTML = `${player2.name}, You're ${player2.token}`;
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

const gameCycle = (board) => {
  const endGame = (message, player) => {
    if (message === 'Victory') {
      window.confirm(`You win ${player.name}`);
      document.getElementById('StartGameButton').disabled = false;
    } else {
      window.confirm('DRAW');
      document.getElementById('StartGameButton').disabled = false;
    }
    flagContinue = false;
  };

  const playerUpdate = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const checkVictory = (table) => {
    const case1 = (table.board[0][0] === table.board[0][1]) && (table.board[0][1] === table.board[0][2]) && (table.board[0][0] !== '');
    const case2 = (table.board[1][0] === table.board[1][1]) && (table.board[1][1] === table.board[1][2]) && (table.board[1][0] !== '');
    const case3 = (table.board[2][0] === table.board[2][1]) && (table.board[2][1] === table.board[2][2]) && (table.board[2][0] !== '');
    const case4 = (table.board[0][0] === table.board[1][0]) && (table.board[1][0] === table.board[2][0]) && (table.board[0][0] !== '');
    const case5 = (table.board[0][1] === table.board[1][1]) && (table.board[1][1] === table.board[2][1]) && (table.board[0][1] !== '');
    const case6 = (table.board[0][2] === table.board[1][2]) && (table.board[1][2] === table.board[2][2]) && (table.board[0][2] !== '');
    const case7 = (table.board[0][0] === table.board[1][1]) && (table.board[1][1] === table.board[2][2]) && (table.board[1][1] !== '');
    const case8 = (table.board[0][2] === table.board[1][1]) && (table.board[1][1] === table.board[2][0]) && (table.board[1][1] !== '');

    const cases = [case1, case2, case3, case4, case5, case6, case7, case8];
    if (cases.includes(true)) {
      return 'Victory';
    } else if (!table.isFull()) {
      return 'DRAW';
    }
    return false;
  };

  const playerMovement = (evt) => {
    if (flagContinue) {
      const updatedBoard = board.updateBoard(evt.target.row, evt.target.column, currentPlayer.token);
      if (!updatedBoard) {
        alert('Invalid Movement, try again.');
      } else {
        board.drawBoard();
        if (checkVictory(board) === false) {
          playerUpdate();
        } else {
          endGame(checkVictory(board), currentPlayer);
        }
      }
    }
  };

  const clickListener = () => {
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        const id = `${i}-${j}`;
        const cellClick = document.getElementById(id);
        cellClick.onclick = playerMovement;
        cellClick.row = i;
        cellClick.column = j;
      }    
    }
  };

  const execute = () => {
    flagContinue = true;
    board.cleanBoard();
    board.drawBoard();
    clickListener();
  };
  return { execute };
};

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
  formRender(formDiv, 1);
  formRender(formDiv2, 2);
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
