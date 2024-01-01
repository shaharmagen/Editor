import React, {useEffect, useState, useRef} from "react";
import io from "socket.io-client";
// import hljs from "highlight.js";
// import "highlight.js/styles/atom-one-dark.css";

function CodeBlock(props) {
  const [title, setTitle] = useState(props.title);
  const [code, setCode] = useState('');
  const [readOnly, setReadOnly] = useState(false);
  const [isMentor, setIsMentor] = useState(false);
  const socketRef = useRef(null); // Use useRef to keep a mutable reference


  useEffect(() => {
      // Connect to the server
      socketRef.current = io.connect('http://localhost:3000'); 

      //the first user who opens the code block page is the mentor
      // socket.on("assign-mentor", ({ isMentor }) => {
      //   setIsMentor(isMentor);
      //   setReadOnly(isMentor);
      // });

      // Listen for code updates from the server
      socketRef.current.on("code-change", (code) => {
          setCode(code);
      });

      //initial setup for the mentor
      // if (isMentor) {
      //     // Emit the initial code to the server
      //     socket.emit("code-change", { title, code: editor.value });
      // }

      // Cleanup function when component unmounts
      return () => {
        if (socketRef.current) {
            socketRef.current.disconnect();
        }
      };
  }, []);

  // useEffect(() => {
  //     hljs.highlightAll();
  //   }, [code]);

  // const handleTitleChange = (event) => {
  //   setTitle(event.target.value);
  // };

  const handleCodeChange = (event) => {
    const updatedCode = event.target.value;
    setCode(updatedCode);
    if (socketRef.current) {
      socketRef.current.emit("code-change", updatedCode);
    }
  };

  return (
    <div className="codeblock">
        <h1
          className="title" 
          // onChange={handleTitleChange}
          >
          {title}
        </h1>
        <textarea
          id="editor"
          value={code}
          onChange={handleCodeChange}
          // readOnly={readOnly}
      />
    </div>
  );
}

export default CodeBlock;