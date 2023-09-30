import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Servico from "../services/servico";
import GameForm from "../components/gameForm";
import GameTable from "../components/gameTable";
import GameDetails from "../components/gameDetails";
import AppToastContainer from "../components/appToastContainer";
import AppToast from "../components/appToast";

export default function Game({ onLoad, setGameTitle, gameTitle }) {
  let { id } = useParams();
  id = parseInt(id);

  const imgSrcAlt = require('../img/giphy.webp');

  const [game, setGame] = useState({});
  const [nome, setNome] = useState('');
  const [loja, setLoja] = useState('');
  const [show, setShow] = useState(true);
  const [preco, setPreco] = useState('');
  const [toasts, setToasts] = useState([]);
  const [plataforma, setPlataforma] = useState('');

  const initialState = {
    lojas: [{ id: 0, valor: null, nome: 'Loja' }],
    plataformas: [{ id: 0, valor: null, nome: 'Plataforma' }]
  };

  const toastInitialState = {
    idx: toasts.length,
    imgSrc: game.background_image ?? imgSrcAlt,
    imgAlt: game.name,
    autohide: true,
    show: show,
    setShow: onHideToast
  };

  const [lojas, setLojas] = useState(initialState.lojas);
  const [plataformas, setPlataformas] = useState(initialState.plataformas);

  useEffect(() => {
    onLoad('game', gameTitle);
    Servico.GetLancamentoFuturo(id).then(data => {
      onLoad('game', data.name);
      setGameTitle(data.name);
      setNome(data.name);
      setGame(data);
      setLojas(data.stores ? initialState.lojas.concat(data.stores.map(key => [{ id: key.store.id, valor: key.store.name, nome: key.store.name }]).flat()) : initialState.lojas);
      setPlataformas(data.platforms ? initialState.plataformas.concat(data.platforms.map(key => [{ id: key.platform.id, valor: key.platform.name, nome: key.platform.name }]).flat()) : initialState.plataformas);
    });
  }, []);

  function onHideToast(key) {
    setShow(false);
    setTimeout(() => {
      toasts.filter((val) => val.idx != key);
      setToasts(toasts);
      setShow(true);
    }, 500);
  }

  function onJogoDesejadoInsert() {
    if (!nome) {
      const toast = AppToast({ ...toastInitialState, title: "Nome não informado", bodyText: "Espero o nome do jogo ser carregado antes do cadastro", variant: "warning" });
      setToasts(toasts.concat(toast));
      return;
    }

    if (!plataforma) {
      const toast = AppToast({ ...toastInitialState, title: "Plataforma não informada", bodyText: "A plataforma do jogo deve ser informada antes do cadastro", variant: "warning" });
      setToasts(toasts.concat(toast));
      return;
    }

    if (!loja) {
      const toast = AppToast({ ...toastInitialState, title: "Loja não informada", bodyText: "A loja do jogo deve ser informada antes do cadastro", variant: "warning" });
      setToasts(toasts.concat(toast));
      return;
    }

    if (!preco) {
      const toast = AppToast({ ...toastInitialState, title: "Preço não informado", bodyText: "O preço do jogo deve ser informado antes do cadastro", variant: "warning" });
      setToasts(toasts.concat(toast));
      return;
    }

    Servico.PostListaDesejos(nome, loja, preco, plataforma).then(data => {
      const toast = AppToast({ ...toastInitialState, title: "Jogo adicionado", bodyText: `O jogo ${game.name} foi incluído na sua Lista de Desejos`, variant: "success" });
      setToasts(toasts.concat(toast));
    }).catch(error => {
      if (error.response.status == 409) {
        const toast = AppToast({ ...toastInitialState, title: "Jogo já cadastrado", bodyText: `O jogo ${game.name} já estava cadastrado na sua Lista de Desejos`, variant: "danger" });
        setToasts(toasts.concat(toast));
      }
    });
  }

  return (
    <section id="game">
      <div className="container d-flex justify-content-center">
        <div className="row">
          <div className="col-12 col-md-8">
            <GameDetails game={game} imgSrcAlt={imgSrcAlt} />
          </div>
          <div className="col-12 col-md-4 table-responsive">
            <GameTable game={game} formatarDataBrasileira={Servico.formatarDataBrasileira} />
            <GameForm
              plataformas={plataformas}
              lojas={lojas}
              nome={nome}
              setLoja={setLoja}
              setPreco={setPreco}
              setPlataforma={setPlataforma}
              onJogoDesejadoInsert={onJogoDesejadoInsert}
            />
          </div>
        </div>
        <AppToastContainer position="bottom-end" toasts={toasts} />
      </div>
    </section>
  );
};