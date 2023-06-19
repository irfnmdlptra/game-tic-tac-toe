import { useState } from "react";
import "./App.css";

function Square({ value, onSquareClick, winner }) {
  const backgroundColor =
    winner === "x" ? "bg-danger" : "o" ? "bg-primary" : "bg-transparent";
  return (
    <button className={`square ${backgroundColor}`} onClick={onSquareClick}>
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

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
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
    status = "pemenang :" + winner;
  } else {
    status = "pemain selanjutnya :" + (xIsNext ? "x" : "o");
  }

  return (
    <div id="root">
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} winner={winner} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} winner={winner} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} winner={winner} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} winner={winner} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} winner={winner} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} winner={winner} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} winner={winner} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} winner={winner} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} winner={winner} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}
