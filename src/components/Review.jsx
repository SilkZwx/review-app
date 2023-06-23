import { useSelector } from "react-redux";
import { url } from "../env";
import axios from "axios";
import { useEffect, useState } from "react";

export const Review = (props) => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [reviewer, setReviewer] = useState("");

  useEffect(() => {
    axios
      .get(`${url}/books/${props.id}`, {
        headers: { Authorization: `Bearer ${auth}` },
      })
      .then((res) => {
        // console.log(res);
        setTitle(res.data.title);
        setReview(res.data.review);
        setReviewer(res.data.reviewer);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);
  return (
    <div className="review-box">
      <div className="review-title">{title}</div>
      <div className="review-reviewer">{reviewer}</div>
      <div className="review-review">{review}</div>
    </div>
  );
};
