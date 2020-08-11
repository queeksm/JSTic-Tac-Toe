let player1;
let player2;
let turn = 0;

const gameBoard = (() => {
  let board = [];
  board = [[1,2,3],[4,5,6],[7,8,9]];  
  const updateBoard = (row,column,token) => {
    board[row][column] = token;
    return board;
  }
  return { board, updateBoard};
})();

const player = (name,token) => {
  return {name,token};
};

const gameController = (gameBoard,players,turn,status) => {
  let board = gameBoard();
  

  //start the game
  const createFormDiv = () => {
    const formDiv = document.createElement("div");  
    formDiv.setAttribute("id", "divForm")
    document.appendChild(formDiv);
  }


  function playerCapture(evt) {
    // get values
    const name = document.getElementById('nameField').value;
    if (evt.target.number == 1 ) {
      player1 = player(name, 'X');
    } else {
      player2 = player(name, 'O');
    }

    // add to table
    const divForm = document.getElementById('form');
    divForm.innerHTML = '';
    
  }

  const formRender = (formDiv, PNumber ) => {
    formDiv.innerHTML = '';
  
    const newPlayerForm = document.createElement('FORM');
    newPlayerForm.setAttribute('id', 'myPlayerForm');
    formDiv.appendChild(newPlayerForm);

    const fieldLabel = document.createElement("label");
    fieldLabel.textContent = "Player" + PNumber  + " Name ";
  
    const playerName = document.createElement('INPUT');
    playerName.setAttribute('id', 'nameField');
    playerName.setAttribute('type', 'text');
    playerName.setAttribute('placeholder', 'Name');
    v.appendChild(playerName);
  
    
    const submitButton = document.createElement('Button');
    submitButton.addEventListener('click', playerCapture);
    submitButton.textContent = 'Save';
    submitButton.setAttribute('type', 'button');
    submitButton.number = PNumber;
  
    newPlayerForm.appendChild(submitButton);
  }

  const startGame = () => {
    formDiv = document.getElementById("divForm");
    formRender(formDiv, 1);
    formRender(formDiv, 2);
    
  }

  const createStartButton = () => {

    const submitButton = document.createElement('Button');
    submitButton.addEventListener('click', startGame);
    submitButton.textContent = 'Start Game';
    submitButton.setAttribute('type', 'button');
  }
  

    // ask for players
  
    
  //cycle of the game

  players = [player1,player2];
  const gameCycle = (board,players) => {

    let currentPlayer = players[0];
    
    const playerUpdate = () => {
      [player[0],player[1]] = [player[1],player[0]];
    }

    const clickListener = () => {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let id = i + '-' + j
          const cellClick = document.getElementById(id);
          cellClick.addEventListener('click', playerMovement);
          cellClick.row = i;
          cellClick.column = j;
          cellClick.token = currentPlayer.token
        }        
      }
    }

    const playerMovement = (evt) => {      
      board.updateBoard(evt.target.row,evt.target.column,evt.target.token);
    }

    //render the board
    //turn logic
      //player1 movement done
      //checks the movement.
        //Board full = draw.
      //updates the board
      //check for victory
      //player2 movement
      //checks the movement.      
      //updates the board
      //checks for victory
      //increases turn by 1
      //restarts

    //checks for victory() 
      //analyzes the board array and compares it to victory conditions table. (1)      
      //checks the turn number and determines if there's a draw.
  }

  //print results of the game and clean-up  (ask for a new game?)
  //update the cells with the class "cell" to empty.
  //update the array to empty again.
  
}



