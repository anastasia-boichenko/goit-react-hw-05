import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchSingleMovie } from "../../services/movieApi";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import s from "./MoviePage.module.css";
import { SquareChevronLeft } from "lucide-react";

const MoviePage = () => {
  const location = useLocation();
  const { movieId } = useParams();
  const [isError, setIsError] = useState(false);
  const [movie, setMovie] = useState("");
  const goBackRef = useRef(location.state ?? "/");

  const placeholderImg =
    "/popcorn-flakes-and-bucket-popcorn-container-white-and-red-cardboard-cup-with-flying-out-and-scatter-snack-seeds-isolated-striped-3d-paper-box-with-fast-food-for-cinema-illustration-vector.jpg";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const singleMovie = await fetchSingleMovie(movieId);
        setMovie(singleMovie);
      } catch (error) {
        setIsError(true);
        Error.fire({
          icon: "error",
          title: "Something went wrong",
        });
      }
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) return <Loader />;
  if (isError) return <div>Oops! Something went wrong.</div>;

  const genreList =
    movie?.genres?.map((genre) => genre.name).join(", ") || "N/A";
  const formattedBudget = movie.budget.toLocaleString();

  return (
    <div>
      <Link to={goBackRef.current} aria-label="Go back" className={s.backLink}>
        <SquareChevronLeft size={25} className={s.backIcon} /> Go back
      </Link>
      <div className={s.movieContainer}>
        <img
          className={s.movieImage}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
              : placeholderImg
          }
          alt={movie.title}
        />
        <div className={s.movieInfo}>
          <ul>
            <li>
              Title: <span>{movie.original_title}</span>
            </li>
            <li>
              Genre: <span>{genreList}</span>
            </li>
            <li className={s.budget}>
              Budget: <span>{formattedBudget}$</span>
            </li>
            <li>
              Release date: <span>{movie.release_date}</span>
            </li>
            <li className={s.score}>
              Score: <span>{movie.vote_average}</span>
            </li>
            <li className={s.overview}>
              Overview: <span>{movie.overview}</span>
            </li>
            <li className={s.overview}>
              <a href={movie.homepage}>Visit website</a>
            </li>
            <li className={s.overview}>
              <NavLink to="cast">Cast</NavLink>
            </li>
            <li className={s.overview}>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
