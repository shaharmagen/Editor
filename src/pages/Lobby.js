import React from "react";

function Lobby(props) {
  return (
    <div className="lobby">
      <h1 className="lobbyTitle">Choose code block</h1>
      <div className="codeBlocks">
        {props.codeBlocks.map((block, index) => (
          <div key={index}>
            <button className="block" onClick={() => props.navigateToCodeBlock(index)}>
              {block.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lobby;