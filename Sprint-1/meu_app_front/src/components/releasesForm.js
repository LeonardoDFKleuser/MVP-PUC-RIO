export default function ReleasesForm({ buscarLancamento, setBuscaLancamento }) {
  return (
    <section className="searchGame">
      <input type="text" id="searchGameName" placeholder="Jogo a pesquisar" onKeyUp={(e) => setBuscaLancamento(e.target.value)} />
      <span className="searchBtn" onClick={buscarLancamento}>Buscar</span>
    </section>
  );
};