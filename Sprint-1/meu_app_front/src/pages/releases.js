import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Servico from '../services/servico';
import Paginator from '../components/paginator';
import ReleasesForm from '../components/releasesForm';
import ReleasesTable from '../components/releasesTable';

export default function Releases({ onLoad, setGameTitle }) {
  const totalPages = useRef(1);
  const navigate = useNavigate();
  const [buscaLancamento, setBuscaLancamento] = useState('');
  const [lancamentosFuturos, setLancamentosFuturos] = useState([]);

  let { page } = useParams();
  page = page ? parseInt(page) : 1;

  useEffect(() => {
    onLoad('releases', 'Lançamentos Futuros');
    Servico.GetListaLancamentosFuturos(buscaLancamento, page).then(data => {
      totalPages.current = Math.ceil(data.count / 10);
      setLancamentosFuturos(data.results);
    });
  }, []);

  function buscarLancamento() {
    Servico.GetListaLancamentosFuturos(buscaLancamento, 1).then(data => {
      totalPages.current = Math.ceil(data.count / 10);
      setLancamentosFuturos(data.results);
    });
  }

  function navTo(pageAttr) {
    navigate('/releases/' + pageAttr);
    Servico.GetListaLancamentosFuturos(buscaLancamento, pageAttr).then(data => {
      page = pageAttr;
      totalPages.current = Math.ceil(data.count / 10);
      setLancamentosFuturos(data.results);
    });
  }

  return (
    <div className='container'>
      <ReleasesForm buscarLancamento={buscarLancamento} setBuscaLancamento={setBuscaLancamento} />
      <ReleasesTable lancamentosFuturos={lancamentosFuturos} formatarDataBrasileira={Servico.formatarDataBrasileira} setGameTitle={setGameTitle} />
      <Paginator page={page} navTo={navTo} totalPages={totalPages.current} />
    </div>
  );
};