import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActorCard from '../components/content/ActorCard';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import Button from '../components/common/Button';
import { getPopularActors } from '../features/actors/actorsSlice';

const Actors = () => {
  const dispatch = useDispatch();
  const { popular: actors, status, error } = useSelector((state) => state.actors);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPopularActors(page));
  }, [dispatch, page]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Actors</h1>
      {status === 'loading' && <Loading />}
      {status === 'failed' && <Error message={error} />}
      {status === 'succeeded' && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            {actors.map((actor) => (
              <ActorCard key={actor.id} actor={actor} />
            ))}
          </div>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
              Previous
            </Button>
            <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Actors;