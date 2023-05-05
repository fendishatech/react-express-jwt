import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login";
import Home from "../views/Home";
import ProtectedRoute from "./routeProtect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
]);

export default router;
