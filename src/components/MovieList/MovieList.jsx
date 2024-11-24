import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  const placeholderImg =
    "/popcorn-flakes-and-bucket-popcorn-container-white-and-red-cardboard-cup-with-flying-out-and-scatter-snack-seeds-isolated-striped-3d-paper-box-with-fast-food-for-cinema-illustration-vector.jpg";

  return (
    <ul className={s.movieGrid}>
      {movies.map((movie) => (
        <li key={movie.id} className={s.movieCard}>
          <Link to={`/movies/${movie.id}`} state={location}>
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
              <h2>{movie.title}</h2>
              <p>Score: {movie.vote_average.toFixed(1)}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
