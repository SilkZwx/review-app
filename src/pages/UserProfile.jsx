import { NameInput } from "../components/NameInput";
import { IconInput } from "../components/IconInput";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./UserProfile.scss";

export const UserProfile = () => {
  const url = process.env.REACT_APP_API_URL;
  const auth = useSelector((state) => state.auth.isSignIn);
  const [name, setName] = useState("");
  const [NewiconUrl, setNewIconUrl] = useState(null);
  const [DefaulticonUrl, setDefaultIconUrl] = useState(null);
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
        setName(res.data.name);
        setDefaultIconUrl(res.data.iconUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth]);

  return (
    <div>
      <Header />
      <h1>ユーザープロフィール</h1>
      <form onSubmit={onSubmit}>
        <NameInput setName={setName} placeholder={name} />
        <img src={DefaulticonUrl} />
        <IconInput setIcon={setNewIconUrl} />
        <button type="submit">変更</button>
      </form>
    </div>
  );
};
