import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import s from "./Movies.module.css";
import { useSearchParams } from "react-router-dom";
import { searchMovie } from "../../services/movieApi";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search");
    if (!search) return;

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const searchMovies = await searchMovie(search);

        if (searchMovies.length === 0) {
          Error.fire({
            icon: "warning",
            title: "No movies found",
          });
        } else {
          setMovies(searchMovies);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [searchParams]);

  const handleSubmit = (value, options) => {
    const trimmedQuery = value.search.trim();

    if (!trimmedQuery) {
      return Error.fire({
        icon: "error",
        title: "Please enter your query",
      });
    }

    setSearchParams({ search: trimmedQuery });
    options.resetForm();
  };

  return (
    <div>
      <div className={s.form}>
        <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
          <Form>
            <Field
              className={s.input}
              type="text"
              placeholder="Enter movie name..."
              name="search"
            />
            <button type="submit" className={s.btn}>
              Search
            </button>
          </Form>
        </Formik>
      </div>
      {isLoading && <Loader />}
      {isError && <Error />}
      <MovieList movies={movies} />
    </div>
  );
};

export default Movies;
