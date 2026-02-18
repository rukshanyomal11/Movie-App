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
    <div className="page-shell">
      <div className="page-hero">
        <div className="flex flex-col gap-8 lg:flex-row">
          <img
            src={getImageUrl(director.profile_path, 'w500')}
            alt={director.name}
            className="w-full rounded-2xl border border-white/10 shadow-[0_25px_60px_-45px_rgba(0,0,0,0.8)] lg:w-1/3"
          />
          <div className="lg:w-2/3">
            <p className="page-kicker">Director</p>
            <h1 className="page-title mt-3">{director.name}</h1>
            <p className="page-subtitle mt-4">{director.biography || 'No biography available.'}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="soft-panel">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Born</p>
                <p className="mt-2 text-sm text-slate-900 dark:text-slate-100">
                  {formatDate(director.birthday)}
                </p>
              </div>
              <div className="soft-panel">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Department</p>
                <p className="mt-2 text-sm text-slate-900 dark:text-slate-100">Directing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorDetail;
