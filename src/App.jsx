import { useEffect, useState } from 'react';
import { checkEndGame, checkWinnerFrom, nextTurn, provideInitialArray, provideDefaultTurn } from './logic/board';
import { BoardTile } from './components/BoardTile';

function App() {
  const [board, setBoard] = useState(provideInitialArray);
  const [turn, setTurn] = useState(provideDefaultTurn);
  const [winner, setWinner] = useState(null);
  const [winnerCombo, setWinnerCombo] = useState(null);

  const handleReset = () => {
    setBoard(provideInitialArray);
    setTurn(provideDefaultTurn);
    setWinner(null);
    setWinnerCombo(null);
  };

  const canBoardBeUpdated = (index) => board[index] === null && winner === null;

  const updateBoardTile = (index, value) => {
    const newBoard = [...board];
    newBoard[index] = value;
    setBoard(newBoard);
    return newBoard;
  };

  const onBoardTileAction = (index) => {
    if (!canBoardBeUpdated(index)) return;
    const newBoard = updateBoardTile(index, turn);
    const newTurn = nextTurn(turn);
    setTurn(newTurn);
  };

  useEffect(() => {
    const [newWinner, newWinnerCombo] = checkWinnerFrom(board);
    if (newWinner !== null) {
      setWinner(newWinner);
      setWinnerCombo(newWinnerCombo);
    } else if (checkEndGame(board)) {
      setWinner(false); // tie
    }
  }, [board]);

  return (
    <main className="App">
      <section className="board">
        {board.map((value, index) => (
          <BoardTile
            key={index}
            value={value}
            action={onBoardTileAction}
            index={index}
            highlight={winnerCombo?.includes(index)}
          />
        ))}
      </section>
      <footer>
        <button className='resetBut' onClick={handleReset}>Reset</button>
        {winner === null && <p>{turn}'s turn</p>}
        {winner === false && <p>TIE!</p>}
        {winner && <p>{winner} won!</p>}
      </footer>
    </main>
  );
}

export default App;
