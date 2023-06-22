import "./PasswordInput.scss"

export const PasswordInput = (props) => {
  const handlePasswordChange = (e) => {props.setPassword(e.target.value)}
  return (
    <div className="password-field">
      <input
        type="password"
        placeholder="Password"
        className="input"
        onChange={handlePasswordChange}
      />
    </div>
  )
}