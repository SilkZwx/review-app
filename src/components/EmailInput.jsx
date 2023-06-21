import "./EmailInput.scss"

export const EmailInput = (props) => {
  return (
    <div className="field">
      <input
        type="email"
        placeholder="Email"
        className="input"
        onChange={props.handleEmailChange}
      />
    </div>
  )
}