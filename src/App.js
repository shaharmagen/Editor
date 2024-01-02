import React, {useState} from "react";
import Lobby from "./pages/Lobby";
import CodeBlock from "./pages/CodeBlock";

function App() {
  const [currentPage, setCurrentPage] = useState("lobby");

  const codeBlocks = [
    { title: "Async Case", code: "" , solution: "Async Case solution"},
    { title: "Callback Function", code: "", solution: "Callback Function solution" },
    { title: "Init Function", code: "" , solution: "Init Function solution"},
    { title: "Set Function", code: "", solution: "Set Function solution" },
  ];

  const navigateToCodeBlock = (index) => {
    setCurrentPage(`code/${index}`);
  };

  const renderPage = () => {
    if (currentPage === "lobby") {
      return <Lobby 
        codeBlocks={codeBlocks} 
        navigateToCodeBlock={navigateToCodeBlock} />;
    } else if (currentPage.startsWith("code/")) {
      const codeBlockIndex = parseInt(currentPage.split("/")[1], 10);
      const codeBlock = codeBlocks[codeBlockIndex] || codeBlocks[0];
      return <CodeBlock title={codeBlock.title} solution={codeBlock.solution}/>;
    }
    return null;
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
