import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { signOut } from "../authSlice";

export const Header = () => {
  const url = process.env.REACT_APP_API_URL;
  const auth = useSelector((state) => state.auth.isSignIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [name, setName] = useState("");
  const [iconUrl, setIconUrl] = useState(null);
  const [isSignIn, setIsSignIn] = useState(false);
  const login = () => {
    removeCookie("token");
    dispatch(signOut());
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get(`${url}/users`, { headers: { Authorization: `Bearer ${auth}` } })
      .then((res) => {
        setName(res.data.name);
        setIconUrl(res.data.iconUrl);
        setIsSignIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth]);

  return (
    <div>
      <h1>書籍レビュー一覧</h1>
      {isSignIn ? <></> : <button onClick={login} >ログイン</button>}
    </div>
  );
};
