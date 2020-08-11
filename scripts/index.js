const gameBoard = (() => {
  let board = [];
  return {board};
})();

const player = (name,token) => {
  return {name,token};
};

const gameController = (gameBoard,players,turn,status) => {
  let board = gameBoard();
  let player1 = player(name,'0');
  let player2 = player(name, 'X');
  
}