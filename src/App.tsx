import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./Pages/index";
import Login from "./Pages/login";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path={"/"}>
            <Index />
          </Route>
          <Route path={"/login"}>
            <Login />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
