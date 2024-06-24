import React, { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Editor from "@monaco-editor/react";
import { useRouter } from "next/router";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
`;

const lightTheme = {
  body: "#ffffff",
  text: "#000000",
  editorBg: "#f5f5f5",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Section = styled.div`
  flex: 1;
  padding: 20px;
  overflow: auto;
`;

const ProblemStatement = styled(Section)`
  background: ${({ theme }) => theme.editorBg};
  border-right: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    flex: unset;
  }
`;

const CodeEditor = styled(Section)`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.editorBg};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #0070f3;
  color: white;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  button {
    margin-left: 10px;
    padding: 10px 20px;
    border: none;
    background-color: #0070f3;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      background-color: #005bb5;
    }
    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  }

  @media (max-width: 768px) {
    button {
      margin: 20;
    }
    align-items: flex-start;
  }
`;

const OutputContainer = styled.div`
  background: white;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  white-space: pre-wrap;
  word-break: break-word;
  min-height: 50px;
  max-height: 300px;
  overflow-y: auto;
`;

const ToggleButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #0070f3;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #005bb5;
  }
`;

const Home = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [editorTheme, setEditorTheme] = useState("light");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    `// Write your ${selectedLanguage} code here`
  );
  const [output, setOutput] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const router = useRouter();
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    console.log("Editor mounted:", editor);
  };

  const handleRun = () => {
    if (editorRef.current) {
      const currentCode = editorRef.current.getValue();
      console.log("Current code:", currentCode);

      try {
        let capturedOutput = "";
        const originalConsoleLog = console.log;
        console.log = (...args) => {
          capturedOutput += args.join(" ") + "\n";
        };

        let result;

        const wrappedCode = `
            (function() {
              try {
                ${currentCode}
              } catch (e) {
                return 'Error: ' + e.message;
              }
            })();
          `;
        result = new Function(wrappedCode)();

        console.log = originalConsoleLog;

        console.log("Execution result:", result);

        if ((result !== undefined && result !== null) || result == "") {
          capturedOutput += result;
        }

        setOutput(capturedOutput || "Please enter some code");
      } catch (error) {
        console.error("Error running code:", error);
        setOutput(`Error: ${error.message}`);
      }
    } else {
      console.error("Editor reference is null or undefined");
    }
  };

  const handleSubmit = () => {
    router.push("/success");
  };

  const toggleEditorTheme = () => {
    setEditorTheme(editorTheme === "light" ? "dark" : "light");
  };
  useEffect(() => {
    setIsSubmitDisabled(
      !code ||
        code.trim() === "" ||
        code === "// Write your javascript code here"
    );
  }, [code]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header>
        <Title>Competitive Coding</Title>
        <ToggleButton onClick={toggleEditorTheme}>
          {editorTheme === "light" ? "Dark" : "Light"} Mode
        </ToggleButton>
      </Header>
      <Container>
        <ProblemStatement>
          <h2>Problem Statement</h2>
          <p>
            Given a string, the task is to reverse the order of the letters in
            the given string.{" "}
          </p>
          <p>Example:</p>
          <p>Input s = "shreyas"</p>
          <p>Output: sayerhs</p>
        </ProblemStatement>
        <CodeEditor>
          <Editor
            height='60vh'
            defaultLanguage={selectedLanguage}
            theme={editorTheme === "light" ? "light" : "vs-dark"}
            defaultValue={code}
            onMount={handleEditorDidMount}
            onChange={(value) => setCode(value)}
          />
          <ButtonContainer>
            <button onClick={handleRun}>Run</button>
            <button
              id='button'
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
            >
              Submit
            </button>
          </ButtonContainer>
          {output && <OutputContainer>{output}</OutputContainer>}
        </CodeEditor>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
