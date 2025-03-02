import {useState} from 'react'

export default function Player({initialName,symbol,isActive,onChangeName}){
    const [playerName,setPlayerName]=useState(initialName);
    const [isEditing,setIsEditing] =useState(false);
    
    
    function handleEditClick(){
        setIsEditing(edit=>!edit);

        // console.log("gfgfg");
        if (isEditing){
            onChangeName(symbol,playerName)};
        //     console.log("fdfd");
        
    }

    function handlePlayerChange(event){
        setPlayerName(event.target.value);
        // ;
    }
    let editablePlayerName=<span className="player-name">{playerName}</span>;
    if (isEditing){
        editablePlayerName=<input type="text" value={playerName} required onChange={handlePlayerChange} />   
    }
    return (
        <li className={isActive?'active':undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button>
            
          </li>
    );
}