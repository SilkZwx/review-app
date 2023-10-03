import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { url } from "../env";
import { Review } from "../components/Review";
import { Header } from "../components/Header";
import { useRedirectPublicUser } from "../hooks/redirect";
import icon from "../images/PostIcon.png";
import "./PrivateHome.scss";

export const PrivateHome = () => {
  useRedirectPublicUser();
  const auth = useSelector((state) => state.auth.sessionToken);
  const navigate = useNavigate();
  const [reviewList, setReviewList] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    axios
      .get(`${url}/books?offset=${offset}`, {
        headers: { Authorization: `Bearer ${auth}` },
      })
      .then((res) => {
        console.log(res);
        setReviewList(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(auth);
      });
  }, [auth, offset, navigate]);

  return (
    <div>
      <Header className="site-header" />
      <ul className="post">
        {reviewList.map((review, key) => (
          <li key={key} className="post__item">
            <Review review={review} />
          </li>
        ))}
      </ul>

      <img
        className="post-image"
        src={icon}
        onClick={() => navigate("/new")}
        alt="Go to the post page"
      />
      <button
        className="button next-button"
        onClick={() =>
          offset - 10 >= 0 ? setOffset(offset - 10) : console.log(offset)
        }
      >
        戻る
      </button>
      <button
        className="button prev-button"
        onClick={() => setOffset(offset + 10)}
      >
        進む
      </button>
    </div>
  );
};
