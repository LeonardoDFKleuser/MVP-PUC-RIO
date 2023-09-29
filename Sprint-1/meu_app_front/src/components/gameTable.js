export default function GameTable({ game, formatarDataBrasileira }) {
  return (
    <table className="table table-borderless">
      <tbody>
        <tr>
          <th>Desenvolvedor(es)</th>
          <td>
            {game.developers ? game?.developers.map(developer => (
              <p key={developer.id}>
                {developer.name ?? ''}
              </p>
            )) : ''}
          </td>
        </tr>
        <tr>
          <th>Publicador(es)</th>
          <td>
            {game.publishers ? game?.publishers.map(publisher => (
              <p key={publisher.id}>
                {publisher.name ?? ''}
              </p>
            )) : ''}
          </td>
        </tr>
        <tr>
          <th>Plataforma(s)</th>
          <td>
            {game.platforms ? game?.platforms.map(key => (
              <p key={key.platform.id}>
                {key.platform.name ?? ''}
              </p>
            )) : ''}
          </td>
        </tr>
        <tr>
          <th>Loja(s)</th>
          <td>
            {game.stores ? game?.stores.map(key => (
              <p key={key.store.id}>
                {key.store.name ?? ''}
              </p>
            )) : ''}
          </td>
        </tr>
        <tr>
          <th>Data de Lançamento Esperada</th>
          <td>
            {formatarDataBrasileira(game?.released)}
          </td>
        </tr>
        <tr>
          <th>Última Atualização</th>
          <td>
            {formatarDataBrasileira(game?.updated)}
          </td>
        </tr>
        <tr>
          <th>Gênero(s)</th>
          <td>
            {game.genres ? game?.genres.map(genre => (
              <p key={genre.id}>
                {genre.name ?? ''}
              </p>
            )) : ''}
          </td>
        </tr>
        <tr>
          <th>Site</th>
          <td>
            <a target="_blank" href={game.website ?? ''}>
              Endereço
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
};