const gameCycle = (board) => {
    const endGame = (message, player) => {
      if (message === 'Victory') {
        window.confirm(`You win ${player.name}`);
        DOMControl.enableBtn();
      } else {
        window.confirm('DRAW');
        DOMControl.enableBtn();
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
      }
      if (!table.isFull()) {
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