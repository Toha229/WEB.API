import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./containers";
import DefaultPage from "./pages/defaultPage";
import Users from "./pages/users";
import NotFound from "./pages/notFound";
import SignIn from "./pages/auth/singIn";
import SignUp from "./pages/auth/signUp";
import { useTypedSelector } from "./hooks/useTypedSelector";
import Profile from "./pages/profile";
import EditUser from "./pages/editUser";
import ConfirmEmail from "./pages/confirmEmail";
import Courses from "./pages/shop/courses";
import AddCourse from "./pages/shop/addCourse";
import EditCourse from "./pages/shop/editCourse";
import Category from "./pages/shop/categoryes";
import EditCategory from "./pages/shop/editCategory";
import AddCategory from "./pages/shop/addCategory";

const App: React.FC = () => {
  const { isAuth, user } = useTypedSelector((store) => store.UserReducer);
  return (
    <Routes>
      {isAuth && (
        <>
          {user.role === "Administrators" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DefaultPage />} />
              <Route path="users" element={<Users />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="profile" element={<Profile />} />
              <Route path="edituser" element={<EditUser />} />
              <Route path="courses" element={<Courses />} />
              <Route path="addcourse" element={<AddCourse />} />
              <Route path="updateCourse" element={<EditCourse />} />
              <Route path="categories" element={<Category />} />
              <Route path="addcategory" element={<AddCategory />} />
              <Route path="updateCategory" element={<EditCategory />} />
            </Route>
          )}
          {user.role === "Users" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DefaultPage />} />
              <Route path="users" element={<Users />} />
              <Route path="profile" element={<Profile />} />
              <Route path="courses" element={<Courses />} />
              <Route path="addcourse" element={<AddCourse />} />
              <Route path="updateCourse" element={<EditCourse />} />
              <Route path="categories" element={<Category />} />
              <Route path="addcategory" element={<AddCategory />} />
              <Route path="categories" element={<EditCategory />} />
            </Route>
          )}
        </>
      )}
      <Route path="/" element={<SignIn />} />
      <Route path="/dashboard/" element={<SignIn />} />
      <Route path="/confirmEmail/" element={<ConfirmEmail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
