import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";

export const App = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const handleChange = (e) => {
    if (e.target.value.match(/.+@.+\..+/)) {
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
        />
        {errorMessage && <p id="errorMessage">メールアドレスが無効です</p>}
      </header>
    </div>
  );
};
