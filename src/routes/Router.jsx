import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { PublicHome } from "../pages/PublicHome";
import { PrivateHome } from "../pages/PrivateHome";
import { UserProfile } from "../pages/UserProfile";
import { PostSubmit } from "../pages/PostSubmit";
import { PostDetail } from "../pages/PostDetail";
import { useSelector } from "react-redux";

export const Router = () => {
  const auth = useSelector((state) => state.auth.sessionToken);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/"
          element={auth ? <PrivateHome /> : <PublicHome />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={auth ? <PrivateHome /> : <SignUp />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/new" element={<PostSubmit />} />
        <Route path="/detail/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
};
