import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AdminRoute } from "./admin.route";
import { MemberRoute } from "./member.route";
import Navbar from "./components/Navbar";
import AllBooks from "./pages/AllBooks";
import BorrowedBooks from "./pages/BorrowedBooks";
import IssuedBooks from "./pages/IssuedBooks";
import AvailableBooks from "./pages/AvailableBooks";
import BookView from "./pages/BookView";
import AllMembers from "./pages/AllMembers";
import MemberView from "./pages/MemberView";
import Login from "./pages/Login";
import IssueBook from "./pages/IssueBook";
import PageNotFound from "./pages/page404";
import Loader from "./components/Loader";
import "antd/dist/antd.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Switch>
          <MemberRoute
            path="/borrowedbooks/:id"
            exact
            static
            component={BorrowedBooks}
          />
          <AdminRoute path="/allbooks" exact static component={AllBooks} />

          <AdminRoute
            path="/issuedbooks"
            exact
            static
            component={IssuedBooks}
          />
          <AdminRoute
            path="/availablebooks"
            exact
            static
            component={AvailableBooks}
          />
          <AdminRoute
            path="/viewbook/:id/:pagecategory"
            exact
            static
            component={BookView}
          />
          <AdminRoute path="/allmembers" exact static component={AllMembers} />
          <AdminRoute
            path="/viewmember/:id"
            exact
            static
            component={MemberView}
          />
          <AdminRoute
            path="/issuebook/:id"
            exact
            static
            component={IssueBook}
          />
          <Route path="/loader" exact static component={Loader} />
          <Route path="/login" exact static component={Login} />
          <Route path="*" exact static component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
