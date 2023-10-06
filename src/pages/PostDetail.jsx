import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Header } from "../components/Header";
import { useRedirectPublicUser } from "../hooks/redirect";
import "./PostDetail.scss";

export const PostDetail = () => {
  const url = process.env.REACT_APP_API_URL;
  const auth = useSelector((state) => state.auth.sessionToken);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [bookInfo, setBookInfo] = useState(null);

  useRedirectPublicUser();

  useEffect(() => {
    axios
      .get(`${url}/books/${id}`, {
        headers: { Authorization: `Bearer ${auth}` },
      })
      .then((res) => {
        console.log(res);
        setBookInfo(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="post-detail">
        <div className="post-detail__title">タイトル</div>
        <p className="post-detail__title">{bookInfo.title}</p>
        <div className="post-detail__link">リンク</div>
        <p className="post-detail__link">{bookInfo.link}</p>
        <div className="post-detail__reviewer">投稿者</div>
        <p className="post-detail__reviewer">{bookInfo.reviewer}</p>
        <div className="post-detail__review">レビュー</div>
        <p className="post-detail__review">{bookInfo.review}</p>
        <div className="post-detail__detail">詳細</div>
        <p className="post-detail__detail">{bookInfo.detail}</p>
      </div>
    </div>
  );
};
