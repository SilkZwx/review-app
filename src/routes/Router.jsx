import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { PublicHome } from "../pages/PublicHome";
import { PrivateHome } from "../pages/PrivateHome";
import { UserProfile } from "../pages/UserProfile";
import { Post } from "../pages/Post";
import { useSelector } from "react-redux";

export const Router = () => {
  const auth = useSelector((state) => state.auth.sessionToken);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={auth ? <PrivateHome /> : <Login />} />
        <Route path="/signup" element={auth ? <PrivateHome /> : <SignUp />} />
        <Route path="/profile" element={auth ? <UserProfile /> : <PublicHome />} />
        <Route path="/new" element={auth ? <Post /> : <PublicHome />} />
        <Route path="/" element={auth ? <PrivateHome /> : <PublicHome />} />
      </Routes>
    </BrowserRouter>
  );
};
