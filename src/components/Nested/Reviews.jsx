import { useEffect, useState } from "react";
import { fetchReviews } from "../../services/movieApi";
import { useParams } from "react-router-dom";

import Error from "../../components/Error/Error";
import s from "./Reviews.module.css";

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const movieReviews = await fetchReviews(movieId);
        if (movieReviews.length === 0)
          return <p>Unfortunately no reviews found</p>;
        setReviews(movieReviews);
      } catch (error) {
        setIsError(true);
        Error.fire({
          icon: "error",
          title: "Something went wrong",
        });
      }
    };
    getReviews();
  }, [movieId]);

  if (isError)
    return <div className={s.error}>Oops! Something went wrong.</div>;
  if (reviews.length === 0) return <p>Unfortunately no reviews found</p>;

  return (
    <div className={s.reviewsContainer}>
      <ul className={s.reviewsList}>
        {reviews.map((review) => (
          <li key={review.id} className={s.reviewItem}>
            <h4 className={s.reviewAuthor}>{review.author}</h4>
            <p className={s.reviewContent}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
