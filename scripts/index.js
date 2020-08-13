//Click start game button.
//Generate the forms for the players.
//fill up the forms and start the game.
//

const players = [];
let currentPlayer;
let flagContinue = false;

const gameBoard = () => {
  let board = [];
  board = [['','',''],['','',''],['','','']];  
  const updateBoard = (row,column,token) => {
    console.log(board[row][column]+ " = " + token);
    const cell = document.getElementById(row + '-' + column);
    //if (cell.innerHTML == '') {
    console.log(board[row][column]);
    if (board[row][column] == '') {
      board[row][column] = token;
      return board;
    } else {
      console.log("cell contains "+cell.innerHTML);
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
        board[i][j]='';
        cell.innerHTML=board[i][j];
      }     
    }
    
  }

  const isFull = () => {
    let condition = board[0].includes('') || board[1].includes('') || board[2].includes('');
    return condition;
  }

  return { board, updateBoard, drawBoard, cleanBoard, isFull};
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
  
  const name1 = document.getElementById('nameField-1').value;
  const name2 = document.getElementById('nameField-2').value;
  player1 = player(name1, 'X');
  player2 = player(name2, 'O');
  
  currentPlayer  = player1;
  
  
  // add to table
  document.getElementById("buttonDiv").remove();
  document.getElementById(`myPlayerForm-1`).innerHTML = "";
  document.getElementById(`myPlayerForm-2`).innerHTML = "";
  divForm.innerHTML = '';
  const playerDiv1 = document.getElementById('Player1');
  const playerDiv2 = document.getElementById('Player2');

  playerDiv1.innerHTML = `Welcome ${player1.name}, your symbol is ${player1.token}`;
  playerDiv2.innerHTML = `Welcome ${player2.name}, your symbol is ${player2.token}`;
}

const formRender = (formDiv, PNumber ) => {
  
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
  formDiv2 = document.getElementById("divForm2");
  buttonDisable = document.getElementById("111");
  buttonDisable.disabled = true;
  formRender(formDiv, 1);
  formRender(formDiv2, 2);
  newGame();  
}

const createStartButton = () => {
  
  buttonDiv = document.getElementById("buttonDiv");
  const submitButton = document.createElement('Button');
  submitButton.addEventListener('click', startGame);
  submitButton.setAttribute("id","111")
  submitButton.textContent = 'New Players';
  submitButton.setAttribute('type', 'button');
  buttonDiv.appendChild(submitButton);
}

const gameCycle = (board,players) => {


  const endGame = (message,player) => {
    if (message == "Victory") {
      window.confirm(`"You win" ${player.name}`);
          
    }else {
      window.confirm("DRAW");      
    }
    flagContinue = false;
    
  }
   
  const playerUpdate = () => {
    
    if (currentPlayer === player1 ) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
    
  }

  const playerMovement = (evt) => {  
   if (flagContinue) {
    console.log(board);
    updatedBoard=board.updateBoard(evt.target.row,evt.target.column,currentPlayer.token);
    if (!updatedBoard ) {
      alert("Invalid Movement, try again.");
    } else {     
      
      board.drawBoard();
      
      if (checkVictory(board) == false){
        playerUpdate();
      } else {
       
        endGame(checkVictory(board), currentPlayer);
        
      }}
    }
  }

  const clickListener = () => {
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let id = i + '-' + j
        const cellClick = document.getElementById(id);
        //cellClick.addEventListener('click', playerMovement);
        cellClick.onclick = playerMovement;
        cellClick.row = i;
        cellClick.column = j;
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
    }else if (!table.isFull()) {
      return "DRAW";
    }else {
      return false;
    }
  }
  
  const execute = () => {    
    flagContinue = true;
    board.cleanBoard();
    board.drawBoard();
    console.log("inside execute "+board.board);
    clickListener();
  }

  return {execute};

}

const go = () => {
  
  players.push(player1);
  players.push(player2);
  
  console.log("from go proc");
  game = null;
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












