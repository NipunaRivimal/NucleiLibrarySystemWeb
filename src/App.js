import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllBooks from "./pages/AllBooks";
import BorrowedBooks from "./pages/BorrowedBooks";
import AvailableBooks from "./pages/AvailableBooks";
import BookView from "./pages/BookView";
import Loader from "./components/Loader";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route path="/allbooks" exact static component={AllBooks} />
          <Route path="/borrowedbooks" exact static component={BorrowedBooks} />
          <Route path="/loader" exact static component={Loader} />
          <Route
            path="/availablebooks"
            exact
            static
            component={AvailableBooks}
          />
          <Route
            path="/viewbook/:id/:pagecategory"
            exact
            static
            component={BookView}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
