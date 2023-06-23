import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { url } from "../env";
import { Review } from "../components/Review";

export const Home = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const navigate = useNavigate();
  const [idList, setIdList] = useState([]);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (auth === null) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${url}/books?offset=${offset}`, {
        headers: { Authorization: `Bearer ${auth}` },
      })
      .then((res) => {
        console.log(res);
        setIdList(res.data.map((item) => item.id));
      })
      .catch((err) => {
        console.log(err);
        console.log(auth);
      });
  }, [offset]);

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {idList.map((id, key) => (
          <li key={key}>
            <Review id={id} />
          </li>
        ))}
      </ul>
      <button onClick={() => (offset - 10 >= 0 ? setOffset(offset - 10) : console.log(offset))}>
        戻る
      </button>
      <button onClick={() => setOffset(offset + 10)}>進む</button>
    </div>
  );
};
