import { NameInput } from "../components/NameInput";
import { IconInput } from "../components/IconInput";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./UserProfile.scss";

export const UserProfile = () => {
  const url = process.env.REACT_APP_API_URL;
  const auth = useSelector((state) => state.auth.sessionToken);
  const [name, setName] = useState("");
  const [defaultName, setDefaultName] = useState("");
  const [NewiconUrl, setNewIconUrl] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${url}/users`,
        { name: name },
        { headers: { Authorization: `Bearer ${auth}` } }
      )
      .then((res) => {
        console.log(res);
        setDefaultName(res.data.name);
      })
      .catch((err) => {
        console.log(`user setting error ${err}`);
      });

    if (NewiconUrl !== null) {
      const file = new FormData();
      file.append("icon", NewiconUrl);

      axios
        .post(`${url}/uploads`, file, {
          headers: { Authorization: `Bearer ${auth}` },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(`icon error ${err}`);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`${url}/users`, { headers: { Authorization: `Bearer ${auth}` } })
      .then((res) => {
        setDefaultName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth]);

  return (
    <div>
      <Header />
      <h3>プロフィール編集</h3>
      <form onSubmit={onSubmit}>
        <p>現在の名前: {defaultName}</p>
        <NameInput setName={setName} placeholder={"Name"} />
        <IconInput setIcon={setNewIconUrl} />
        <button type="submit">変更</button>
      </form>
    </div>
  );
};
