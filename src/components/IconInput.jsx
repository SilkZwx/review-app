export const IconInput = (props) => {
  const handleIconChange = (e) => props.setIcon(e.target.files);
  return (
    <div className="field input-field">
      <input
        type="file"
        accept="image/png, image/jpeg"
        className="input"
        onChange={handleIconChange}
      />
    </div>
  )
}