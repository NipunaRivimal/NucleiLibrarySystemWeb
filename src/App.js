import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllBooks from "./pages/AllBooks";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route path="/allbooks" exact static component={AllBooks} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
