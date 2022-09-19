import "./styles/App.scss";

import Home from "./pages/Home";
import { SingleBeers } from "./components/SingleBeer";
import { HashRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/singlebeer/:id" element={<SingleBeers  />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
