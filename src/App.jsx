import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ThemeContext } from "./Context/ThemeProvider";

function App() {
  const [count, setCount] = useState(0);
  const { darkTheme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <div className={darkTheme ? "dark" : ""}>
        <h1 className="dark:bg-red-500">Hello</h1>
      </div>
    </>
  );
}

export default App;
