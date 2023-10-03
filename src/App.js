import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import "./App.css";
import { Router } from "./routes/Router";
import { signIn } from "./redux/authSlice";
import { setName, setIconUrl } from "./redux/userSlice";
import { useEffect } from "react";

export const App = () => {
  const [cookies] = useCookies(["token", "name", "iconUrl"]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (cookies.token) {
      dispatch(signIn(cookies.token));
      dispatch(setName(cookies.name));
      dispatch(setIconUrl(cookies.iconUrl));
    }
  }, [cookies, dispatch]);
  return (
    <div className="App">
      <Router />
    </div>
  );
};
