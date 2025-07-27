import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../components/content/MovieCard';
import ActorCard from '../components/content/ActorCard';
import DirectorCard from '../components/content/DirectorCard';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import { getPopularMovies } from '../features/movies/moviesSlice';
import { getPopularActors } from '../features/actors/actorsSlice';
import { getPopularDirectors } from '../features/directors/directorsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { popular: movies, status: movieStatus, error: movieError } = useSelector((state) => state.movies);
  const { popular: actors, status: actorStatus, error: actorError } = useSelector((state) => state.actors);
  const { popular: directors, status: directorStatus, error: directorError } = useSelector((state) => state.directors);

  useEffect(() => {
    dispatch(getPopularMovies(1));
    dispatch(getPopularActors(1));
    dispatch(getPopularDirectors(1));
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Popular Movies</h2>
        {movieStatus === 'loading' && <Loading />}
        {movieStatus === 'failed' && <Error message={movieError} />}
        {movieStatus === 'succeeded' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.slice(0, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Popular Actors</h2>
        {actorStatus === 'loading' && <Loading />}
        {actorStatus === 'failed' && <Error message={actorError} />}
        {actorStatus === 'succeeded' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {actors.slice(0, 10).map((actor) => (
              <ActorCard key={actor.id} actor={actor} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Popular Directors</h2>
        {directorStatus === 'loading' && <Loading />}
        {directorStatus === 'failed' && <Error message={directorError} />}
        {directorStatus === 'succeeded' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {directors.slice(0, 10).map((director) => (
              <DirectorCard key={director.id} director={director} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;