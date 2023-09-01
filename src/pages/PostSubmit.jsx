import { useSelector } from "react-redux";
import { useState } from "react";
import { Header } from "../components/Header";
import axios from "axios";
import "./PostSubmit.scss";

export const PostSubmit = () => {
  const auth = useSelector((state) => state.auth.sessionToken);
  const url = process.env.REACT_APP_API_URL;
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");

  // フォームに記入した内容を送信する関数
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: title,
      url: link,
      detail: detail,
      review: review,
    };
    axios
      .post(`${url}/books`, data, {
        headers: { Authorization: `Bearer ${auth}` },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`post error ${err}`);
      });
  };

  return (
    <div>
      <Header />
      <form>
        <div>
          <label htmlFor="title">書籍名</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="link">書籍のURL</label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="detail">書籍の詳細</label>
          <input
            type="text"
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="review">レビュー</label>
          <input
            type="text"
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <button type="submit" onClick={onSubmit}>投稿</button>
      </form>
    </div>
  );
}