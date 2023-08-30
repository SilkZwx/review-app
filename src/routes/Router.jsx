import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { PublicHome } from "../pages/PublicHome";
import { PrivateHome } from "../pages/PrivateHome";
import { UserProfile } from "../pages/UserProfile";
import { useSelector } from "react-redux";

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={auth ? <PrivateHome /> : <Login />} />
        <Route path="/signup" element={auth ? <PrivateHome /> : <SignUp />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/" element={auth ? <PrivateHome /> : <PublicHome />} />
      </Routes>
    </BrowserRouter>
  );
};
