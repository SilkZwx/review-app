import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../authSlice";
import "./SignUp.scss";
import { EmailInput } from "../components/EmailInput";
import { PasswordInput } from "../components/PasswordInput";
import { NameInput } from "../components/NameInput";
import { IconInput } from "../components/IconInput";

export const SignUp = () => {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_URL;
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [icon, setIcon] = useState(null);
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleIconChange = (e) => setIcon(e.target.files);
  const onSignUp = (e) => {
    e.preventDefault();
    const data = { name: name, email: email, password: password };
    axios
      .post(`${url}/users`, data)
      .then((res) => {
        dispatch(signIn(res.data.token));
        console.log(res);
        return res.data.token;
      })
      .then((res)=>{
        if (icon !== null) {
          const file = new FormData();
          file.append("icon", icon[0]);
          
          axios
          .post(`${url}/uploads`, file, {
            headers: {
              Authorization: `Bearer ${res}`,
            },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(`icon error ${err}`);
            console.log(auth);
          });
        }
        navigate("/");
      })
      .catch((err) => {
        console.log(`user setting error ${err}`);
      });
  };

  return (
    <div className="signup-form">
      <header>signUp</header>
      <form onSubmit={onSignUp}>
        <IconInput handleIconChange={handleIconChange} />
        <NameInput handleNameChange={handleNameChange} />
        <EmailInput handleEmailChange={handleEmailChange} />
        <PasswordInput handlePasswordChange={handlePasswordChange} />

        <div className="field button-field">
          <button>signUp</button>
        </div>
      </form>

      <div className="form-link">
        <span>
          Already have an account?{" "}
          <a href="login" className="link login-link">
            Login
          </a>
        </span>
      </div>
    </div>
  );
};
