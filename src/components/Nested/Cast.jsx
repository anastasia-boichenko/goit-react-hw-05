import { useEffect, useState } from "react";
import { fetchCast } from "../../services/movieApi";
import { useParams } from "react-router-dom";

import Error from "../../components/Error/Error";
import s from "./Cast.module.css";
import Loader from "../Loader/Loader";

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isError, setIsError] = useState(false);

  const placeholderImg = "/woocommerce-placeholder-800x800.png";

  useEffect(() => {
    const getCast = async () => {
      try {
        const movieCast = await fetchCast(movieId);
        if (movieCast.length === 0)
          return <p>Unfortunately no information found</p>;
        setCast(movieCast);
      } catch (error) {
        setIsError(true);
        Error.fire({
          icon: "error",
          title: "Something went wrong",
        });
      }
    };
    getCast();
  }, [movieId]);

  if (isError)
    return <div className={s.error}>Oops! Something went wrong.</div>;
  if (cast.length === 0) return <Loader className={s.loader} />;

  return (
    <div className={s.castContainer}>
      <ul className={s.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={s.castItem}>
            <div className={s.actorContainer}>
              <img
                className={s.actorImage}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${actor.profile_path}`
                    : placeholderImg
                }
                alt={actor.name}
              />
              <div className={s.actorInfo}>
                <h3 className={s.actorName}>{actor.name}</h3>
                <p className={s.actorRole}>Role: {actor.character}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
