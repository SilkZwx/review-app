import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../authSlice";
import { setName, setIconUrl } from "../userSlice";
import "./Login.scss";
import { url } from "../env";
import { EmailInput } from "../components/EmailInput";
import { PasswordInput } from "../components/PasswordInput";
import { useCookies } from "react-cookie";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.sessionToken);
  const name = useSelector((state) => state.user.name);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUserProfile = (auth) => {
    axios
      .get(`${url}/users`, { headers: { Authorization: `Bearer ${auth}` } })
      .then((res) => {
        console.log(res);
        dispatch(setName(res.data.name));
        dispatch(setIconUrl(res.data.iconUrl));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSignIn = (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    axios
      .post(`${url}/signin`, data)
      .then((res) => {
        dispatch(signIn(encodeURIComponent(res.data.token)));
        // console.log(res);
        // console.log(encodeURIComponent(res.data.token));
        const expires = new Date();
        expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
        setCookie("token", res.data.token, {
          path: "/",
          secure: true,
          expires: expires,
        });
        setUserProfile(res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (auth !== null) {
      console.log(auth);
      navigate("/");
    }
  }, [auth]);

  return (
    <div className="login-form">
      <header>Login</header>
      <form onSubmit={onSignIn}>
        <EmailInput setEmail={setEmail} />
        <PasswordInput setPassword={setPassword} />
        <div className="button-field">
          <button>Login</button>
        </div>
      </form>

      <div className="form-link">
        <span>
          Don't have an account?{" "}
          <Link to="/signup" className="link signup-link">
            signUp
          </Link>
        </span>
      </div>
    </div>
  );
};
