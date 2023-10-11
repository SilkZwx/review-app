import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRedirectPublicUser } from "../hooks/redirect";
import { Header } from "../components/Header";
import "./PostEdit.scss";

export const PostEdit = () => {
  const url = process.env.REACT_APP_API_URL;
  const auth = useSelector((state) => state.auth.sessionToken);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");

  useRedirectPublicUser();

  useEffect(() => {
    axios
      .get(`${url}/books/${id}`, {
        headers: { Authorization: `Bearer ${auth}` },
      })
      .then((res) => {
        console.log(res);
        setTitle(res.data.title);
        setLink(res.data.url);
        setDetail(res.data.detail);
        setReview(res.data.review);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleUpdateClick = () => {
    const data = {
      title: title,
      url: link,
      detail: detail,
      review: review,
    };
    axios
      .put(`${url}/books/${id}`, data, {
        headers: { Authorization: `Bearer ${auth}` },
      })
      .then((res) => {
        console.log(res);
        navigate(`/detail/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteClick = () => {
    axios
      .delete(`${url}/books/${id}`, {
        headers: { Authorization: `Bearer ${auth}` },
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Header />
      {/*書籍の編集画面*/}
      <div className="post-title">
        <div className="post-title__title">タイトル</div>
        <input
          className="post-title__input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="post-link">
        <div className="post-link__title">リンク</div>
        <input
          className="post-link__input"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <div className="post-detail">
        <div className="post-detail__title">詳細</div>
        <textarea
          className="post-detail__input"
          type="text"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
      </div>
      <div className="post-review">
        <div className="post-review__title">レビュー</div>
        <textarea
          className="post-review__input"
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>
      <button className="post-detail__button" onClick={handleUpdateClick}>
        更新
      </button>
      <button className="post-detail__button" onClick={handleDeleteClick}>
        削除
      </button>
    </div>
  );
};
