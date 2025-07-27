import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import { getActorDetails } from '../features/actors/actorsSlice';
import { getImageUrl } from '../utils/helpers';
import { formatDate } from '../utils/formatters';

const ActorDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, status, error } = useSelector((state) => state.actors);
  const actor = details[id];

  useEffect(() => {
    dispatch(getActorDetails(id));
  }, [dispatch, id]);

  if (status === 'loading') return <Loading />;
  if (status === 'failed') return <Error message={error} />;
  if (!actor) return <Error message="Actor not found" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={getImageUrl(actor.profile_path, 'w500')}
          alt={actor.name}
          className="w-full md:w-1/3 rounded-lg"
        />
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{actor.name}</h1>
          <p className="text-gray-600 mb-2">{actor.biography || 'No biography available.'}</p>
          <p className="mb-2"><strong>Born:</strong> {formatDate(actor.birthday)}</p>
          <p className="mb-2"><strong>Department:</strong> {actor.known_for_department || 'Acting'}</p>
        </div>
      </div>
    </div>
  );
};

export default ActorDetail;