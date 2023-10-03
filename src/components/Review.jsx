import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { url } from "../env";
import "./Review.scss";

export const Review = (props) => {
  const auth = useSelector((state) => state.auth.sessionToken);
  const navigate = useNavigate();
  const handleReviewClick = (id) => {
    if (auth !== null) {
      axios
        .post(
          `${url}/logs`,
          { selectBookId: id },
          { headers: { Authorization: `Bearer ${auth}` } }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      navigate(`/detail/${id}`);
    }
  };
  return (
    <div
      className="review-box"
      onClick={() => handleReviewClick(props.review.id)}
    >
      <div className="review-box__title">{props.review.title}</div>
      <div className="review-box__reviewer">{props.review.reviewer}</div>
      <div className="review-box__review">{props.review.review}</div>
    </div>
  );
};
