import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App";
import { UserProvider } from "./contexts/UserContext";
import { AlertProvider } from "./contexts/AlertContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AlertProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </AlertProvider>
);
