import { useNavigate } from 'react-router-dom';

export default function ReleasesTable({ lancamentosFuturos, formatarDataBrasileira, setGameTitle }) {
  const coverAlt = require('../img/giphy.webp');
  const navigate = useNavigate();

  function onCoverClick(nome, id){
    setGameTitle(nome);
    navigate(`/game/${id}`);
  }

  return (
    <section className="games">
      <table className="table table-borderless">
        <caption className="text-white">
          Lista de lançamentos fornecida pela <a target="_blank" href="https://rawg.io/apidocs">API RAWG</a>
        </caption>
        <thead>
          <tr>
            <th>Capa</th>
            <th>Nome</th>
            <th>Plataformas</th>
            <th>Lojas</th>
            <th>Data de Lançamento Esperada</th>
          </tr>
        </thead>
        <tbody>
          {lancamentosFuturos.map(lancamento => (
            <tr key={lancamento?.id}>
              <td>
                <img className="game-cover" src={lancamento?.background_image ?? coverAlt} alt={lancamento?.name} onClick={() => onCoverClick(lancamento?.name, lancamento?.id)} />
              </td>
              <td>{lancamento?.name}</td>
              <td>{lancamento.platforms ? lancamento?.platforms.map(key => key.platform.name).reduce((acc, val) => acc + val + ', ', '').slice(0, -2) : ''}</td>
              <td>{lancamento.stores ? lancamento?.stores.map(key => key.store.name).reduce((acc, val) => acc + val + ', ', '').slice(0, -2) : ''}</td>
              <td>{formatarDataBrasileira(lancamento?.released)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};