import "./EmailInput.scss";
import { useState } from "react";

export const EmailInput = (props) => {
  const [error, setError] = useState(false);
  const handleEmailChange = (e) => {
    if (e.target.value.match(/.+@.+\..+/)) {
      setError(false);
      props.setEmail(e.target.value);
    } else {
      setError(true);
    }
  };
  return (
    <div className="email-field">
      <input
        aria-label="email"
        type="email"
        placeholder="Email"
        className="input"
        onChange={handleEmailChange}
      />
      {error && <p className="error">メールアドレスが無効です</p>}
    </div>
  );
};
