import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./containers";
import DefaultPage from "./pages/defaultPage";
import Users from "./pages/users";
import NotFound from "./pages/notFound";
import SignIn from "./pages/auth/singIn";
import SignUp from "./pages/auth/signUp";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DefaultPage />} />
        <Route path="users" element={<Users />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
