import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/main_componnets/Main"
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);

  return (
    <>
      <Header score={score} />
      <Main score={score} setScore={setScore} />
      <Footer />
    </>
  );
}

export default App;
