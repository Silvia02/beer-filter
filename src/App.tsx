import "./styles/App.scss";

import Home from "./pages/Home";
import { SingleBeers } from "./components/SingleBeer";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/singlebeer/:id" element={<SingleBeers  />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
