import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Actors from './pages/Actors';
import ActorDetail from './pages/ActorDetail';
import Directors from './pages/Directors';
import DirectorDetail from './pages/DirectorDetail';
import Trailers from './pages/Trailers';
import Studios from './pages/Studios';
import Categories from './pages/Categories';
import Countries from './pages/Countries';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';

const App = () => {
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/movies', element: <Movies /> },
    { path: '/movie/:id', element: <MovieDetail /> },
    { path: '/actors', element: <Actors /> },
    { path: '/actor/:id', element: <ActorDetail /> },
    { path: '/directors', element: <Directors /> },
    { path: '/director/:id', element: <DirectorDetail /> },
    { path: '/trailers', element: <Trailers /> },
    { path: '/studios', element: <Studios /> },
    { path: '/categories', element: <Categories /> },
    { path: '/countries', element: <Countries /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/admin', element: <AdminDashboard /> },
    { path: '/search', element: <SearchResults /> },
    { path: '*', element: <NotFound /> },
  ];

  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Default to light mode for the editorial theme
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
