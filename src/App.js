import "./App.css";
import MonacoEditor from "./components/MonacoEditor";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            index
            element={
              <Header>
                <LandingPage />
              </Header>
            }
          />
          <Route path="/class" element={<MonacoEditor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
