import { useEffect, useState } from "react";
import { fetchTrendMovies } from "../../services/movieApi";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import MovieList from "../../components/MovieList/MovieList";
import s from "./Home.module.css";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setIsLoading(true);
        const trends = await fetchTrendMovies();
        setTrendingMovies(trends);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        Error.fire({
          icon: "error",
          title: "Something went wrong",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrends();
  }, []);

  if (isError) {
    return (
      <div className={s.errorContainer}>
        <h1 className={s.errorMessage}>Oops! Something went wrong.</h1>
      </div>
    );
  }

  return (
    <div className={s.homeContainer}>
      {isLoading && <Loader />}
      <h2 className={s.title}>Trending this week</h2>
      <MovieList movies={trendingMovies} />
    </div>
  );
};

export default Home;
