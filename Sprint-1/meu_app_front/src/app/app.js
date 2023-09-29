import { useRef, useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import Wishlist from '../pages/wishlist';
const Releases = lazy(() => import('../pages/releases'));
const Game = lazy(() => import('../pages/game'));

export default function App() {
  const [page, setPage] = useState('/');
  const [gameTitle, setGameTitle] = useState(null);
  const title = useRef('Lista de Desejos');

  const handleRouting = (navPage, navTitle) => {
    setPage(navPage);
    title.current = navTitle;
    document.getElementsByTagName('title')[0].innerText = title.current;
  };

  return (
    <>
      <Navbar currentPage={page} onNav={handleRouting} />
      <Banner title={title.current} />
      <Suspense fallback={<div className='d-flex justify-content-center align-content-center'>Carregando...</div>}>
        <Routes>
          <Route path='/' element={<Wishlist onLoad={handleRouting} />} />
          <Route path='/releases/:page?' element={<Releases onLoad={handleRouting} setGameTitle={setGameTitle} />} />
          <Route path='/game/:id' element={<Game onLoad={handleRouting} setGameTitle={setGameTitle} gameTitle={gameTitle} />} />
          <Route path='*' element={<Wishlist onLoad={handleRouting} />} />
        </Routes>
      </Suspense>
    </>
  );
};