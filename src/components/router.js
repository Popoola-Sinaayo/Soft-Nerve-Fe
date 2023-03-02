import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Create from "./Create";
import UpdateCard from "./UpdateCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/update/:id",
    element: <UpdateCard />,
  },
]);

export default router;
