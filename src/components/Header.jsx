import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { signOut } from "../authSlice";
import "./Header.scss";

export const Header = () => {
  const url = process.env.REACT_APP_API_URL;
  const auth = useSelector((state) => state.auth.isSignIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [iconUrl, setIconUrl] = useState(null);
  const [isSignIn, setIsSignIn] = useState(false);
  const login = () => {
    navigate("/login");
  };
  const logout = () => {
    removeCookie("token");
    dispatch(signOut());
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get(`${url}/users`, { headers: { Authorization: `Bearer ${auth}` } })
      .then((res) => {
        setIconUrl(res.data.iconUrl);
        setIsSignIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth]);

  return (
    <div className="header">
      <Link to="/">
        <h1>書籍レビュー</h1>
      </Link>
      {isSignIn ? (
        <>
          <button onClick={logout}>ログアウト</button>
          <Link to="/profile">
            <img src={iconUrl} />
          </Link>
        </>
      ) : (
        <button onClick={login}>ログイン</button>
      )}
    </div>
  );
};
