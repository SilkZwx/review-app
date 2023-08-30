import Compressor from "compressorjs";
import "./IconInput.scss"

export const IconInput = (props) => {
  const handleIconChange = (e) => {
    const file = e.target.files[0];
    new Compressor(file, {
      maxHeight: 1024,
      maxWidth: 1024,
      success(result) {
        const fileResult = new File([result], file.name, {
          type: result.type,
          lastModified: new Date(),
        });
        props.setIcon(fileResult);
      },
    });
  };
  return (
    <div className="input-field">
      <input
        type="file"
        accept="image/png, image/jpeg"
        className="input"
        onChange={handleIconChange}
      />
    </div>
  );
};
