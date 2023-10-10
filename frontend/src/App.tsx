import "./index.css";
import "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import New_cards from "./pages/New_cards";
import CardsModification from "./pages/CardsModification";

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
  { path: "/new_cards", element: <New_cards /> },
  { path: "/cards_modification", element: <CardsModification /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
