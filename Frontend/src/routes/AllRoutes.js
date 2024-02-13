import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import AdminLogin from "../Pages/AdminLogin";
import AdminHome from "../Pages/AdminHome";
import AdminEditPost from "../Pages/AdminEditPost";
import NotFound from "../Pages/NotFound";
import PrivateRoute from "../Components/PrivateRoute";
import { AdminCreateNewPost } from "../Pages/AdminCreateNewPost";

export const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminHome />
            </PrivateRoute>
          }
        ></Route>
        {/* <Route
          path="/post/:id"
          element={
            <PrivateRoute>
              <AdminEditPost />
            </PrivateRoute>
          }
        ></Route> */}
        <Route path="/admin/createpost" element={<PrivateRoute><AdminCreateNewPost /></PrivateRoute>  }></Route>
        <Route path="/admin/:postId" element={<PrivateRoute><AdminEditPost /></PrivateRoute>  }></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};
