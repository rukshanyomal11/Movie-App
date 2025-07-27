import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import { getDirectorDetails } from '../features/directors/directorsSlice';
import { getImageUrl } from '../utils/helpers';
import { formatDate } from '../utils/formatters';

const DirectorDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, status, error } = useSelector((state) => state.directors);
  const director = details[id];

  useEffect(() => {
    dispatch(getDirectorDetails(id));
  }, [dispatch, id]);

  if (status === 'loading') return <Loading />;
  if (status === 'failed') return <Error message={error} />;
  if (!director) return <Error message="Director not found" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={getImageUrl(director.profile_path, 'w500')}
          alt={director.name}
          className="w-full md:w-1/3 rounded-lg"
        />
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{director.name}</h1>
          <p className="text-gray-600 mb-2">{director.biography || 'No biography available.'}</p>
          <p className="mb-2"><strong>Born:</strong> {formatDate(director.birthday)}</p>
          <p className="mb-2"><strong>Department:</strong> Directing</p>
        </div>
      </div>
    </div>
  );
};

export default DirectorDetail;