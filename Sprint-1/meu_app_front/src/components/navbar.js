import { Link } from "react-router-dom";

export default function Navbar({ currentPage, onNav }) {
  return (
    <nav className="navbar navbar-expand-lg bg-transparent">
      <div className="container-fluid">
        <a className="navbar-brand" href="./home">
          <img src=".\nian cat.gif" alt="Nyan Cat" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Habilita navegação">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className={currentPage === '/' ? 'nav-link active' : 'nav-link'} onClick={() => onNav('/', 'Lista de Desejos')}>Início</Link>
            </li>
            <li className="nav-item">
              <Link to="/releases" className={currentPage === 'releases' ? 'nav-link active' : 'nav-link'} onClick={() => onNav('releases', 'Lançamentos Futuros')}>Lançamentos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
};