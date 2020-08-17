
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
          DOMControl.writeInCell(i,j,board[i][j]);
        }
      }
    };
  
    const cleanBoard = () => {
      for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 3; j += 1) {
          board[i][j] = '';
          DOMControl.writeInCell(i,j,board[i][j]);
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
  