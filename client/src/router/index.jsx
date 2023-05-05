import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login";
import Home from "../views/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

export default router;
