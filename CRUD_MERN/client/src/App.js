import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import Edit from "./components/Edit";
import Detail from "./components/Detail";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={ <Home />} />
        <Route path="/register" element={ <Register />} />
        <Route path="/view/:id" element={ <Detail />} />
        <Route path="/edit/:id" element={ <Edit />} />
      </Routes>
    </>
  );
}

export default App;
