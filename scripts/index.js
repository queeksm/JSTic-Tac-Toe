let player1;
let player2;

const gameBoard = (() => {
  let board = [];
  return {board};
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

  //print results of the game and clean-up  (ask for a new game?)
  
  
}



