import React, {useEffect, useState, useRef} from "react";
import io from "socket.io-client";
import Editor from "@monaco-editor/react";

function CodeBlock(props) {
  const [code, setCode] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const socketRef = useRef(null); // Use useRef to keep a mutable reference

  useEffect(() => {
      // Connect to the server
      socketRef.current = io.connect('http://localhost:3000', { transports: ['websocket'] }); 

      // Listen for role updates from the server
      socketRef.current.on('assign-role', (role) => {
        setIsReadOnly(role !== 'student'); // Set read-only based on role
      });

      // Listen for code updates from the server
      socketRef.current.on("code-change", (code) => {
          setCode(code);
      });

      // Cleanup function when component unmounts
      return () => {
        if (socketRef.current) {
            socketRef.current.disconnect();
        }
      };
  }, []);

  const handleEditorChange = (value) => {
    setCode(value);
    if (!isReadOnly && socketRef.current) {
      socketRef.current.emit("code-change", value);
    }
    // Check if the current code matches the solution
    setIsCorrect(value === props.solution);
  };

  return (
    <div className="codeBlock">
        <h1 className="blockTitle">{props.title}</h1>
        {isCorrect && 
        <img 
          src="./images/smiley.png" 
          alt="smiley"
          className="smiley"/>}
        <Editor
          height="90vh" 
          language="javascript"
          value={code}
          onChange={handleEditorChange}
          options={{
            readOnly: isReadOnly,
            automaticLayout: true
          }}
        />
    </div>
  );
}

export default CodeBlock;