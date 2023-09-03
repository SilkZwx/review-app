import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { url } from "../env";
import { Review } from "../components/Review";
import { Header } from "../components/Header";
import "./PublicHome.scss";

export const PublicHome = () => {
  const navigate = useNavigate();
  const [reviewList, setReviewList] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    axios
      .get(`${url}/public/books?offset=${offset}`)
      .then((res) => {
        console.log(res);
        setReviewList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [offset]);

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
