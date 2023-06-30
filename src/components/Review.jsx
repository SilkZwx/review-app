import "./Review.scss";

export const Review = (props) => {
  return (
    <div className="review-box">
      <div className="review-box__title">{props.title}</div>
      <div className="review-box__reviewer">{props.reviewer}</div>
      <div className="review-box__review">{props.review}</div>
    </div>
  );
};
