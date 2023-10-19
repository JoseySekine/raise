import "./index.css";
import "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import New_cards from "./pages/New_cards";
import CardsModification from "./pages/CardsModification";
import { LightModeProvider } from "./context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    children: [],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  { path: "/new_cards", element: <New_cards /> },
  { path: "/cards_modification", element: <CardsModification /> },
]);

const App = () => (
  <LightModeProvider lightMode={true}>
    <RouterProvider router={router} />
  </LightModeProvider>
);

export default App;
