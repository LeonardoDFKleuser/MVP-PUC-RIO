export default function Paginator({ page, navTo, totalPages }) {
  // Populo o array pagesItens apenas com:
  // - 2 páginas anteriores (se existirem)
  // - a atual
  // - 2 páginas seguintes (se existirem)
  const pagesItens = [];
  for (let p = Math.max(1, page - 5); p <= Math.min(page + 5, totalPages); p++) {
    pagesItens.push(p);
  }

  return (
    <section className="pagination">
      <nav>
        <ul className="pagination">
          <li className={'page-item ' + (page == 1 ? 'disabled' : '')}>
            <a className="page-link" onClick={() => page > 1 ? navTo(page - 1) : null}>
              Anterior
            </a>
          </li>
          {pagesItens.map(pageAttr => (
            <li className={'page-item ' + (pageAttr == page ? 'disabled' : '')} key={pageAttr}>
              <a className="page-link" onClick={() => pageAttr != page ? navTo(pageAttr) : null}>
                {pageAttr}
              </a>
            </li>
          ))}
          <li className={'page-item ' + (page == totalPages ? 'disabled' : '')}>
            <a className="page-link" onClick={() => page < totalPages ? navTo(page + 1) : null}>
              Próxima
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}