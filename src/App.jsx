import { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";


// Cambia el título de la página.
window.document.title = 'Tres en linea'; 

// Componente Square: representa un cuadrado en el tablero del juego.
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Propiedades del componente Square.
Square.propTypes = {
  value: PropTypes.string,
  onSquareClick: PropTypes.func,
};

/*
 * Componente Board: representa el tablero del juego.
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.xIsNext - Indica si el siguiente jugador es X.
 * @param {Array} props.squares - El estado actual del tablero.
 * @param {Function} props.onPlay - La función que se llama cuando se hace clic en un cuadrado.
 * @returns {JSX.Element} - El componente Board.
 */

function Board({ xIsNext, squares, onPlay }) {
  // Función que se llama cuando se hace clic en un cuadrado.
  function handleClick(i) {
    // Si ya hay un ganador o el cuadrado ya está ocupado, no hacer nada.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Crear una nueva matriz de cuadrados y actualizar el estado del juego.
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  // Propiedades del componente Board.
  Board.propTypes = {
    xIsNext: PropTypes.bool,
    squares: PropTypes.array,
    onPlay: PropTypes.func,
  };

  // Determinar si hay un ganador en el tablero actual.
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Ganador: " + winner;
  } else {
    status = "Siguiente jugador: " + (xIsNext ? "X" : "O");
  }

  // Renderizar el tablero con los cuadrados.
  return (
    <>
      <div className="cajonAplicacion">
      <div>
        <h1 className="Titulo">TRES EN LINEA</h1>
        </div>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>  
    </>
  )
}




// Componente Game: representa el juego completo.
function Game() {
  // Estado del juego: historial de movimientos y movimiento actual.
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Función que se llama cuando se hace clic en un cuadrado.
  function handlePlay(nextSquares) {
    // Actualizar el historial de movimientos y el movimiento actual.
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Función que se llama cuando se selecciona un movimiento anterior.
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Renderizar la lista de movimientos anteriores.
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Ir al movimiento #" + move;
    } else {
      description = "Ir al inicio del juego";
    }
    return (
        <li key={move} className="listado">
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
    );
  });
  
  

  // Renderizar el juego completo.
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
      <div className="pie_pagina">
          <hr/>
            <footer>
              <h2>Componente front-end del proyecto formativo y proyecto de clase GA7-220501096-EV03</h2>
              <p>APRENDICES: ALISON YULIET OSPINA CORTES | ALEXANDER OROZCO | LUIS ANDRÉS RÍOS NOREÑA | LUIS RINCON</p>
            </footer>
      </div>
    </div>
  );
}

// Función que determina si hay un ganador en el tablero actual.
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

export default Game;
