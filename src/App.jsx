import {useState} from 'react';
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from './components/Log';
import { WINNING_COMBINATIONS } from '../winning-combinations';
import GameOver from './components/GameOver';

const PLAYERS={
  X:'Player 1',
  O:'Player 2'
};


const INITIAL_GAME_BOARD=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

function deriveGameBoard(gameTurns){
  let gameBoard=[...INITIAL_GAME_BOARD.map(innerArray=>[...innerArray])];
  for (const turn of gameTurns){
      const {square,player}=turn;
      const {row,col}=square;
      gameBoard[row][col]=player; 
  }

  return gameBoard;
}

function dervieWinner(gameBoard,players){
  let winner;
  console.log(players);
  for (const combinatin of WINNING_COMBINATIONS){
    const firstSquare=gameBoard[combinatin[0].row][combinatin[0].column];
    const secondSquare=gameBoard[combinatin[1].row][combinatin[1].column];
    const thirdSquare=gameBoard[combinatin[2].row][combinatin[2].column];

    if (firstSquare && firstSquare===secondSquare && firstSquare===thirdSquare){
      winner=players[firstSquare];
    }
  }
  return winner;
}

function deriveActivePlayer(gameTurns){
  let currentPlayer='X';
      if (gameTurns.length>0 && gameTurns[0].player === 'X'){
        currentPlayer='O';
      }
  return currentPlayer;
}

function App() {
  const [players,setPlayers]=useState(PLAYERS)
  const [gameTurns,setGameTurns]=useState([]);
  const activePlayer=deriveActivePlayer(gameTurns);
  const gameBoard=deriveGameBoard(gameTurns);
  const winner=dervieWinner(gameBoard,players);
  const hasDraw=gameTurns.length===9 && !winner;


  function handleSelectSquare(rowIndex,colIndex){
    // don't merge different states in updating a state that means dont depend on anyother state which is also updating 
    setGameTurns((prevTurns)=>{
      const currentPlayer=deriveActivePlayer(prevTurns);
      const updatedTurns=[{square:{row:rowIndex,col:colIndex},player:currentPlayer},...prevTurns];
      return updatedTurns;
    })
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers(prevPlayers=>{
      return {
        ...prevPlayers,
        [symbol]:newName
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol='X'
            isActive={activePlayer==='X'}
            onChangeName={handlePlayerNameChange}/> 
          <Player
            initialName={PLAYERS.O}
            symbol='O'
            isActive={activePlayer==='O'}
            onChangeName={handlePlayerNameChange}
            />
          </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard 
          board={gameBoard}
          onSelectSquare={handleSelectSquare}
          />
      </div>
      <Log turns={gameTurns}
          />
    </main>
  );
}

export default App;