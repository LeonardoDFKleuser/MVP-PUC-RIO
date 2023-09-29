export default function GameDetails({ game, imgSrcAlt }) {
  return (
    <div className="card">
      <img className="card-img-top" src={game?.background_image ?? imgSrcAlt} alt={game.name ?? 'Jogo'} />
      <div className="card-body">
        <h5 className="card-title">
          Descrição
        </h5>
        <p className="card-text">
          {game.description_raw ? game?.description_raw : "Este título não possui uma descrição no momento ainda"}
        </p>
        <h5 className="card-title">
          Classificação ESRB:
        </h5>
        <p className="card-text">
          {game.esrb_rating ? game?.esrb_rating.name : 'Ainda não avaliado'}
        </p>
        <h5 className="card-title">
          Tags
        </h5>
        <p className="card-text">
          {game.tags && game.tags.length ? game?.tags.map(tag => tag.name).reduce((acc, val) => acc + val + ', ', '').slice(0, -2) : 'Nenhuma tag adicionada'}
        </p>
      </div>
    </div>
  );
};