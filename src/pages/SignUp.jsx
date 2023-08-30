import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../authSlice";
import "./SignUp.scss";
import { EmailInput } from "../components/EmailInput";
import { PasswordInput } from "../components/PasswordInput";
import { NameInput } from "../components/NameInput";
import { IconInput } from "../components/IconInput";
import { useCookies } from "react-cookie";

export const SignUp = () => {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_URL;
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.sessionToken);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [icon, setIcon] = useState(null);
  const onSignUp = (e) => {
    e.preventDefault();
    const data = { name: name, email: email, password: password };
    axios
      .post(`${url}/users`, data)
      .then((res) => {
        dispatch(signIn(res.data.token));
        setCookie("token", res.data.token, { path: "/", secure: true });
        console.log(res);
        return res.data.token;
      })
      .then((res) => {
        if (icon !== null) {
          const file = new FormData();
          file.append("icon", icon);

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
            });
        }
        navigate("/");
      })
      .catch((err) => {
        console.log(`user setting error ${err}`);
      });
  };

  useEffect(() => {
    if (auth !== null) {
      navigate("/");
    }
  }, [auth]);

  return (
    <div className="signup-form">
      <header>signUp</header>
      <form onSubmit={onSignUp}>
        <IconInput setIcon={setIcon} />
        <NameInput setName={setName} placeholder={"Name"} />
        <EmailInput setEmail={setEmail} />
        <PasswordInput setPassword={setPassword} />

        <div className="button-field">
          <button>signUp</button>
        </div>
      </form>

      <div className="form-link">
        <span>
          Already have an account?{" "}
          <Link to="/login" className="link login-link">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};
