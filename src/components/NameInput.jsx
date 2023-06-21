import "./NameInput.scss"

export const NameInput = (props) => {
  return (
    <div className="field">
      <input
        type="text"
        placeholder="Name"
        className="input"
        onChange={props.handleNameChange}
      />
    </div>
  )
}