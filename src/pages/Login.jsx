import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../authSlice";
import "./Login.scss";
import { url } from "../env";
import { EmailInput } from "../components/EmailInput";
import { PasswordInput } from "../components/PasswordInput";

export const Login = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        <EmailInput setEmail={setEmail} />
        <PasswordInput setPassword={setPassword} />
        <div className="button-field">
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
