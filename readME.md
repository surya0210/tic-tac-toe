2 way binding ->input and output at same time
<input type="text" value={playerName} required onChange={handlePlayerChange} />   
taking output also from value and doing input also from onchange

don't merge different states in updating a state that means dont depend on anyother state which is also updating 