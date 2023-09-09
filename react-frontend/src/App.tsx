import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NavComponent from "./components/NavComponent";
import "./assets/styles/app.css";
import { useUserContext } from "./contexts/UserContext";
import CreateListingPage from "./pages/CreateListingPage";

function App() {
  const userContext = useUserContext();
  return (
    <div className="app">
      <BrowserRouter>
        <NavComponent></NavComponent>
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                userContext.username === "" ? <LoginPage /> : <HomePage />
              }
            />
            <Route
              path="/create-listing"
              element={
                userContext.username === "" ? (
                  <LoginPage />
                ) : (
                  <CreateListingPage />
                )
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
