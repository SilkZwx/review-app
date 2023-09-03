import { NameInput } from "../components/NameInput";
import { IconInput } from "../components/IconInput";
import { Header } from "../components/Header";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setName, setIconUrl } from "../userSlice";
import "./UserProfile.scss";

export const UserProfile = () => {
  const url = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.sessionToken);
  const name = useSelector((state) => state.user.name);
  const [newName, setNewName] = useState("");
  const [newiconUrl, setNewIconUrl] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    if (newName !== "") {
      axios
        .put(
          `${url}/users`,
          { name: newName },
          { headers: { Authorization: `Bearer ${auth}` } }
        )
        .then((res) => {
          console.log(res);
          dispatch(setName(newName));
        })
        .catch((err) => {
          console.log(`user setting error ${err}`);
        });
    }

    if (newiconUrl !== null) {
      const file = new FormData();
      file.append("icon", newiconUrl);

      axios
        .post(`${url}/uploads`, file, {
          headers: { Authorization: `Bearer ${auth}` },
        })
        .then((res) => {
          console.log(res);
          dispatch(setIconUrl(res.data.iconUrl));
        })
        .catch((err) => {
          console.log(`icon error ${err}`);
        });
    }
  };

  return (
    <div>
      <Header />
      <h3>プロフィール編集</h3>
      <form onSubmit={onSubmit}>
        <p>現在の名前: {name}</p>
        <NameInput setName={setNewName} placeholder={"Name"} />
        <IconInput setIcon={setNewIconUrl} />
        <button type="submit">変更</button>
      </form>
    </div>
  );
};
