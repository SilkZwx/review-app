import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import "./App.css";
import { Router } from "./routes/Router";
import { signIn } from "./authSlice";
import { useEffect } from "react";

export const App = () => {
  const [cookies] = useCookies(["token"]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (cookies.token) {
      dispatch(signIn(cookies.token));
    }
  }, [cookies]);
  return (
    <div className="App">
      <Router />
    </div>
  );
};
