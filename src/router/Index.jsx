import { createBrowserRouter } from "react-router-dom";

import Admin from "@/pages/Admin/Index";
import Error from "@/pages/Error/Index";
import Home from "@/pages/Home/Index";
import NotFound from "@/pages/NotFound/Index";
import Register from "@/pages/Register/Index";

import Protected from "./Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: "/admin",
    element: <Protected> <Admin/> </Protected>,
    errorElement: <Error />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
