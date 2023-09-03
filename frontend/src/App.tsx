import "./index.css";
import "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Dashbord from "./pages/Dashbord";
import New_cards from "./pages/New_cards";
import CardsModification from "./pages/CardsModification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    children: [],
  },
  {
    path: "dashbored",
    element: <Dashbord />,
  },
  { path: "new_cards", element: <New_cards /> },
  { path: "cards_modification", element: <CardsModification /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
