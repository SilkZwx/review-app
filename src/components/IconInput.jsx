export const IconInput = (props) => {
  return (
    <div className="field input-field">
      <input
        type="file"
        accept="image/png, image/jpeg"
        className="input"
        onChange={props.handleIconChange}
      />
    </div>
  )
}