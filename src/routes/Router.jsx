import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/Home";

export const Router = () => {
  // const auth = useAuth((state) => state.auth.isSignedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
