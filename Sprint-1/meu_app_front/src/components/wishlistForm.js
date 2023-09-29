export default function WishlistForm({ plataformasArray, lojas, onPlataformaChange, onJogoDesejadoInsert, setNome, setLoja, setPreco }) {
  let plataformas = [];

  for (let i = 0; i < plataformasArray.length; i++) {
    plataformas.push({ id: i, nome: plataformasArray[i], valor: i == 0 ? null : plataformasArray[i] });
  }

  return (
    <section className="newGame">
      <div className="row g-0">
        <div className="col-6 col-md-auto">
          <input type="text" id="newGameName" placeholder="Adicione novo Jogo" onKeyUp={(e) => setNome(e.target.value)} />
        </div>
        <div className="col-6 col-md-auto">
          <select id="newPlatform" option="Plataforma" title="Plataforma" onChange={(e) => onPlataformaChange(e.target.value)}>
            {plataformas.map((plataforma) => (
              <option key={plataforma?.id} value={plataforma?.valor}>
                {plataforma?.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6 col-md-auto">
          <select id="newStore" placeholder="Loja" title="Loja" onChange={(e) => setLoja(e.target.value)}>
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
        <div className="col-12 col-md-auto d-flex align-content-center">
          <span className="addBtn" onClick={onJogoDesejadoInsert}>Adicionar</span>
        </div>
      </div>
    </section>
  );
}