//Click start game button.
//Generate the forms for the players.
//fill up the forms and start the game.
//

const players = [];
let currentPlayer;

const gameBoard = () => {
  let board = [];
  board = [['','',''],['','',''],['','','']];  
  const updateBoard = (row,column,token) => {
    const cell = document.getElementById( row + '-' +column);
    if (cell.innerHTML == '') {
      board[row][column] = token;
      return board;
    } else {
      return null;
    }
    
  }

  const drawBoard = () => {
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j <3; j += 1) {
        cell=document.getElementById(`${i}-${j}`);
        cell.innerHTML=board[i][j];
      }     
    }
  }

  const cleanBoard = () => {
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j <3; j += 1) {
        cell=document.getElementById(`${i}-${j}`);
        cell.innerHTML= '';
        board[i][j] = '';
      }     
    }
  }

  const isFull = () => {
    console.log(board.includes(''));
   return board.includes('');
  }

  return { board, updateBoard, drawBoard, isFull, cleanBoard};
};

const player = (name,token) => {
  return {name,token};
};

const createFormDiv = () => {
  const formDiv = document.createElement("div");  
  formDiv.setAttribute("id", "divForm")
  document.appendChild(formDiv);
}

function playerCapture(evt) {
  // get values
  console.log(player1);
  console.log(player2);
  const name1 = document.getElementById('nameField-1').value;
  const name2 = document.getElementById('nameField-2').value;
  player1 = player(name1, 'X');
  player2 = player(name2, 'O');
  
  currentPlayer  = player1;
  console.log('current ' + currentPlayer);
  
  // add to table
  console.log(player1.token);
  document.getElementById(`myPlayerForm-1`).innerHTML = "";
  document.getElementById(`myPlayerForm-2`).innerHTML = "";
  divForm.innerHTML = '';
  const playerDiv1 = document.getElementById('Player1');
  const playerDiv2 = document.getElementById('Player2');
  playerDiv1.innerHTML = `Welcome ${player1.name}, your symbol is ${player1.token}`;
  playerDiv2.innerHTML = `Welcome ${player2.name}, your symbol is ${player2.token}`;
}

const formRender = (formDiv, PNumber ) => {
  console.log(player1);
  console.log(player2);
  formDiv.innerHTML = '';

  const newPlayerForm = document.createElement('FORM');
  newPlayerForm.setAttribute('id', `myPlayerForm-${PNumber}`);
  formDiv.appendChild(newPlayerForm);

  const fieldLabel = document.createElement("label");
  fieldLabel.textContent = "Player" + PNumber  + " Name ";
  newPlayerForm.appendChild(fieldLabel);

  const playerName = document.createElement('INPUT');
  playerName.setAttribute('id', `nameField-${PNumber}`);
  playerName.setAttribute('type', 'text');
  playerName.setAttribute('placeholder', 'Name');
  newPlayerForm.appendChild(playerName);

  if (PNumber == 2) {
  const submitButton = document.createElement('Button');
  submitButton.addEventListener('click', playerCapture);
  submitButton.textContent = 'Save';
  submitButton.setAttribute('type', 'button');
  submitButton.number = PNumber;

  newPlayerForm.appendChild(submitButton);
  }
}

const startGame = () => {
  formDiv = document.getElementById("divForm");
  formDiv2 = document.getElementById("divForm2")
  formRender(formDiv, 1);
  formRender(formDiv2, 2);
  newGame();  
}

const createStartButton = () => {
  console.log("start button");
  console.log(player1);
  console.log(player2);
  buttonDiv = document.getElementById("buttonDiv");
  const submitButton = document.createElement('Button');
  submitButton.addEventListener('click', startGame);
  submitButton.textContent = 'New Players';
  submitButton.setAttribute('type', 'button');
  buttonDiv.appendChild(submitButton);
}

const gameCycle = (board,players) => {

  const endGame = (message,player) => {
    if (message == "Victory") {
      window.confirm(`"You win" + ${player.name}`);
    }else {
      window.confirm("DRAW")
    }
  }
   
  const playerUpdate = () => {
    console.log("swap player")
    console.log(currentPlayer);
    //players = players.reverse();
    if (currentPlayer === player1 ) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
    //[player1,player2] = [player2,player1];
    //currentPlayer = players[0];
    console.log("current swaped "+ currentPlayer);
  }

  const playerMovement = (evt) => {
    updatedBoard=board.updateBoard(evt.target.row,evt.target.column,currentPlayer.token);
    if (!updatedBoard ) {
      alert("Invalid Movement, try again.");
    } else {     
      board.drawBoard();
      if (checkVictory(board) == false){
        playerUpdate();
      } else {
        console.log("current befor check victory "+ currentPlayer);
        endGame(checkVictory(board), currentPlayer);
      }
    }
  }

  const clickListener = () => {
    console.log("create listener");
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let id = i + '-' + j
        const cellClick = document.getElementById(id);
        cellClick.addEventListener('click', playerMovement);
        cellClick.row = i;
        cellClick.column = j;
        //cellClick.token = currentPlayer.token;
      }        
    }
  }

  const checkVictory = (table) => {
    const case1 = (table.board[0][0] == table.board[0][1]) && (table.board[0][1] == table.board[0][2]) && (table.board[0][0] != '');
    const case2 = (table.board[1][0] == table.board[1][1]) && (table.board[1][1] == table.board[1][2]) && (table.board[1][0] != '');
    const case3 = (table.board[2][0] == table.board[2][1]) && (table.board[2][1] == table.board[2][2]) && (table.board[2][0] != '');
    const case4 = (table.board[0][0] == table.board[1][0]) && (table.board[1][0] == table.board[2][0]) && (table.board[0][0] != '');
    const case5 = (table.board[0][1] == table.board[1][1]) && (table.board[1][1] == table.board[2][1]) && (table.board[0][1] != '');
    const case6 = (table.board[0][2] == table.board[1][2]) && (table.board[1][2] == table.board[2][2]) && (table.board[0][2] != '');
    const case7 = (table.board[0][0] == table.board[1][1]) && (table.board[1][1] == table.board[2][2]) && (table.board[1][1] != '');
    const case8 = (table.board[0][2] == table.board[1][1]) && (table.board[1][1] == table.board[2][0]) && (table.board[1][1] != '');

    const cases = [case1,case2,case3,case4,case5,case6,case7,case8];
    if (cases.includes(true)){
      return "Victory";
    }else if (!table.isFull) {
      return "DRAW";
    }else {
      return false;
    }
  }
  
  const execute = () => {
    console.log("I?m RUNNING");
    board.cleanBoard();
    board.drawBoard();
    clickListener();
  }

  return {execute};

}

const go = () => {
  
  players.push(player1);
  players.push(player2);
  
  console.log(players);
  game = gameCycle(board,players);
  game.execute();
}

const newGame = () => {
  
  buttonDiv = document.getElementById("buttonDiv2");
  const submitButton = document.createElement('Button');
  submitButton.addEventListener('click', go);
  submitButton.textContent = 'START';
  submitButton.setAttribute('type', 'button');
  buttonDiv.appendChild(submitButton);
}



let player1 = player('player1', 'T');

let player2 = player('player2', 'N');

let board = gameBoard();

createStartButton();












