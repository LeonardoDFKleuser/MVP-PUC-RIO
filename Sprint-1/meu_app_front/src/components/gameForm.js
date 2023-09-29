export default function GameForm({ plataformas, lojas, nome, setLoja, setPreco, setPlataforma, onJogoDesejadoInsert }) {
  return (
    <div className="row g-0">
      <div className="col-6 col-md-auto">
        <input type="text" id="newGameName" value={nome} readOnly />
      </div>
      <div className="col-6 col-md-auto">
        <select id="newPlatform" title="Plataforma" onChange={(e) => setPlataforma(e.target.value)}>
          {plataformas.map((plataforma) => (
            <option key={plataforma?.id} value={plataforma?.valor}>
              {plataforma?.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="col-6 col-md-auto">
        <select id="newStore" title="Loja" onChange={(e) => setLoja(e.target.value)}>
          {lojas.map((loja) => (
            <option key={loja?.id} value={loja?.valor}>
              {loja?.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="col-6 col-md-auto">
        <input type="number" id="newPrice" placeholder="Preço" onKeyUp={(e) => setPreco(e.target.value)} />
      </div>
      <div className="col-12 col-md-auto d-flex align-content-center d-md-initial">
        <span className="addBtn" onClick={onJogoDesejadoInsert}>Adicionar</span>
      </div>
    </div>
  );
};