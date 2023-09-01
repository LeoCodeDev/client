import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Landing } from "./views/Landing";
import { Home } from "./views/Home";
import { Details } from "./views/Details";
import { Form } from "./views/Form";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Landing />
            </>
          }
        />

        <Route
          path="/home"
          element={
            <>
              <Home />
            </>
          }
        />

        <Route
          path="/detail/:id"
          element={
            <>
              <Details />
            </>
          }
        />

        <Route
          path="/form"
          element={
            <>
              <Form />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export { App };
