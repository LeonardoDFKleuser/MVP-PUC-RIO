import { Trash3 } from "react-bootstrap-icons";

export default function WishlistTable({ jogosDesejados, onJogoDesejadoDelete }) {
  return (
    <section className="games">
      <table className="table table-borderless">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Plataforma</th>
            <th>Loja</th>
            <th>Preço</th>
            <th className="text-center">Apagar</th>
          </tr>
        </thead>
        <tbody>
          {jogosDesejados.map(jogo => (
            <tr key={jogo?.id}>
              <td>{jogo?.nome}</td>
              <td>{jogo?.plataforma}</td>
              <td>{jogo?.loja}</td>
              <td>{jogo?.preco}</td>
              <td className="delete-item">
                <button type="button" className="btn btn-danger" onClick={() => onJogoDesejadoDelete(jogo?.id)}>
                  <Trash3 color="#e3b9e3" size={25} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};