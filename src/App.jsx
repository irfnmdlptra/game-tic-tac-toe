import { useState } from "react";
import "./App.css";

function Square({ value, onSquareClick, name }) {
  
  return (
    <button className={name}  onClick={onSquareClick}>
      {value}
    </button>
  );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function restart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = [...squares];

    if (xIsNext) {
      nextSquares[i] = "x";
    } else {
      nextSquares[i] = "o";
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Pemenang: " + winner;
  } else if (!squares.includes(null)) {
    status = "Permainan Seri";
  } else {
    status = "Pemain selanjutnya: " + (xIsNext ? "x" : "o");
  }
  return (
    <div id="root">
      <div className="status">{status}</div>
      <div className="board-row">
        <Square name="square" value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square name="square" value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square name="square" value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square name="square" value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square name="square" value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square name="square" value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square name="square" value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square name="square" value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square name="square" value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <Square name="reset" value="ulangi permainan" onSquareClick={restart}/>
    </div>
  );
}
