import "./PasswordInput.scss"

export const PasswordInput = (props) => {
  return (
    <div className="field">
      <input
        type="password"
        placeholder="Password"
        className="input"
        onChange={props.handlePasswordChange}
      />
    </div>
  )
}