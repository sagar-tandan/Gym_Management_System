import { useContext, useState } from "react";
import "./App.css";
import { ThemeContext } from "./Context/ThemeProvider";

function App() {
  const [count, setCount] = useState(0);
  const { darkTheme, setTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    console.log(darkTheme);
    setTheme((prev) => !prev);
  };

  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="w-full h-screen dark:bg-neutral-700 dark:text-white flex justify-center items-center bg-white">
        <button
          onClick={changeTheme}
          className="dark:bg-white bg-black rounded-sm px-3 py-1 dark:text-black text-white"
        >
          Toggle theme
        </button>
      </div>
    </div>
  );
}

export default App;
