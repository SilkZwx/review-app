import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../authSlice";
import "./Login.scss";
import { url } from "../env";

export const Login = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const onSignIn = (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    axios
      .post(`${url}/signin`, data)
      .then((res) => {
        dispatch(signIn());
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-form">
      <header>Login</header>
      <form onSubmit={onSignIn}>
        <div className="field input-field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            onChange={handleEmailChange}
          />
        </div>

        <div className="field input-field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="password"
            onChange={handlePasswordChange}
          />
          <i className="bx bx-hide eye-icon"></i>
        </div>

        <div className="field button-field">
          <button>Login</button>
        </div>
      </form>

      <div className="form-link">
        <span>
          Don't have an account?{" "}
          <a href="signup" className="link signup-link">
            signUp
          </a>
        </span>
      </div>
    </div>
  );
};
