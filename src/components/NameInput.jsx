import "./NameInput.scss"

export const NameInput = (props) => {
  const handleNameChange = (e) => {props.setName(e.target.value)}
  return (
    <div className="name-field">
      <input
        type="text"
        placeholder={props.placeholder}
        className="input"
        onChange={handleNameChange}
      />
    </div>
  )
}