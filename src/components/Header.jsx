import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { signOut } from "../redux/authSlice";
import "./Header.scss";
import { removeName, removeIconUrl } from "../redux/userSlice";
import { useEffect } from "react";

export const Header = () => {
  const auth = useSelector((state) => state.auth.sessionToken);
  const name = useSelector((state) => state.user.name);
  const iconUrl = useSelector((state) => state.user.iconUrl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const login = () => {
    navigate("/login");
  };
  const logout = () => {
    removeCookie("token");
    dispatch(signOut());
    dispatch(removeName());
    dispatch(removeIconUrl());
  };

  return (
    <div className="header">
      <Link to="/">
        <h1>書籍レビュー</h1>
      </Link>
      {auth !== null ? (
        <>
          <button onClick={logout}>ログアウト</button>
          <div className="user-profile">
            <Link to="/profile">
              <img src={iconUrl} alt="Go to the user profile page" />
            </Link>
            <div className="user-name">{name}</div>
          </div>
        </>
      ) : (
        <button onClick={login}>ログイン</button>
      )}
    </div>
  );
};
