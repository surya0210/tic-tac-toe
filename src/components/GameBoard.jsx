export default function GameBoard({onSelectSquare,board}){

    // const [gameBoard,setGameBoard]=useState(initalGameBoard);

    // function handleSelectSquare(rowIndex,colIndex){
    //     setGameBoard((prevGameBoard)=>{
    //         const updatedBoard=[...prevGameBoard.map((innerArray)=>[...innerArray])];
    //         updatedBoard[rowIndex][colIndex]='X';
    //         return updatedBoard;
    //     })
    //     onSelectSquare();
    // }

    return <ol id='game-board'>
        {board.map((row,rowIndex)=> (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol,colIndex) => (
                        <li key ={colIndex}>
                            <button disabled ={playerSymbol?true:undefined}onClick={()=>onSelectSquare(rowIndex,colIndex)}>{playerSymbol}</button>
                        </li>
                    ))}
                </ol>
        </li>
        ))}
    </ol>;
}