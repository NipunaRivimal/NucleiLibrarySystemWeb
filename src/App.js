import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllBooks from "./pages/AllBooks";
import BorrowedBooks from "./pages/BorrowedBooks";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route path="/allbooks" exact static component={AllBooks} />
          <Route path="/borrowedbooks" exact static component={BorrowedBooks} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
