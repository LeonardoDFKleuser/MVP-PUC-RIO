import { useEffect, useRef, useState } from 'react';
import Servico from '../services/servico';
import WishlistForm from '../components/wishlistForm';
import WishlistTable from '../components/wishlistTable';
import AppToastContainer from '../components/appToastContainer';
import AppToast from '../components/appToast';

export default function Wishlist({ onLoad }) {
  const [nome, setNome] = useState('');
  const [loja, setLoja] = useState('');
  const [show, setShow] = useState(true);
  const [jogo, setJogo] = useState(null);
  const [preco, setPreco] = useState('');
  const [toasts, setToasts] = useState([]);
  const [plataforma, setPlataforma] = useState('');
  const [jogosDesejados, setJogosDesejados] = useState([]);

  const lojas = useRef([{ id: 0, valor: null, nome: "Loja" }]);

  const imgSrcAlt = require('../img/giphy.webp');

  const plataformas = {
    Plataforma: null,
    PC: [
      { id: 1, valor: "Steam", nome: "Steam" },
      { id: 2, valor: "Epic", nome: "Epic" },
      { id: 3, valor: "EA Play", nome: "EA Play" },
      { id: 4, valor: "Ubisoft Connect", nome: "Ubisoft Connect" },
      { id: 5, valor: "Battle.net", nome: "Battle.net" },
      { id: 6, valor: "GOG", nome: "GOG" },
      { id: 7, valor: "Xbox", nome: "Xbox" },
      { id: 8, valor: "Rockstar Launcher", nome: "Rockstar Launcher" }
    ],
    PlayStation: [{ id: 1, valor: "PlayStation Store", nome: "PlayStation Store" }],
    Xbox: [{ id: 1, valor: "Microsoft Store", nome: "Microsoft Store" }],
    Nintendo: [{ id: 1, valor: "Nintendo eShop", nome: "Nintendo eShop" }],
    Mobile: [
      { id: 1, valor: "Play Store", nome: "Play Store" },
      { id: 2, valor: "Apple Store", nome: "Apple Store" }
    ]
  };

  const toastInitialState = {
    idx: toasts.length,
    imgSrc: imgSrcAlt,
    imgAlt: nome,
    autohide: true,
    show: show,
    setShow: onHideToast
  };

  Object.filterValues = (obj, predicate) => Object.values(Object.fromEntries(Object.entries(obj).filter(predicate)));

  useEffect(() => {
    onLoad('/', 'Lista de Desejos');
    Servico.GetListaDesejos().then((data) => {
      setJogosDesejados(data.jogos);
    });
  }, [jogo]);

  function onPlataformaChange(plataformaAttr) {
    if (!plataformaAttr) {
      lojas.current = [{ id: 0, valor: null, nome: "Loja" }];
      return;
    }

    setPlataforma(plataformaAttr);
    lojas.current = [{ id: 0, valor: null, nome: "Loja" }].concat(
      Object.filterValues(
        plataformas,
        ([nome, lojas]) => nome == plataformaAttr
      ).flat());
  };

  function onHideToast(key) {
    setShow(false);
    setTimeout(() => {
      toasts.filter((val) => val.idx != key);
      setToasts(toasts);
      setShow(true);
    }, 500);
  }

  function onJogoDesejadoDelete(id) {
    Servico.DeleteListaDesejos(id).then(data => {
      setJogosDesejados(Object.filterValues(
        jogosDesejados,
        ([id, nome, loja, plataforma, preco]) => id != id
      ));
      setJogo(data);
    });
  }

  function onJogoDesejadoInsert() {
    if (!nome) {
      const toast = AppToast({ ...toastInitialState, title: "Nome não informado", bodyText: "O nome do jogo precisa ser informado antes do cadastro", variant: "warning" });
      setToasts(toasts.concat(toast));
      return;
    }

    if (!plataforma) {
      const toast = AppToast({ ...toastInitialState, title: "Plataforma não informada", bodyText: "A plataforma do jogo precisa ser informada antes do cadastro", variant: "warning" });
      setToasts(toasts.concat(toast));
      return;
    }

    if (!loja) {
      const toast = AppToast({ ...toastInitialState, title: "Loja não informada", bodyText: "A loja do jogo precisa ser informada antes do cadastro", variant: "warning" });
      setToasts(toasts.concat(toast));
      return;
    }

    if (!preco) {
      const toast = AppToast({ ...toastInitialState, title: "Preço não informado", bodyText: "O preço do jogo precisa ser informado antes do cadastro", variant: "warning" });
      setToasts(toasts.concat(toast));
      return;
    }

    Servico.PostListaDesejos(nome, loja, preco, plataforma).then((data) => {
      const toast = AppToast({ ...toastInitialState, title: "Jogo adicionado", bodyText: `O jogo ${nome} foi incluído na sua Lista de Desejos`, variant: "success" });
      setToasts(toasts.concat(toast));
      jogosDesejados.push(data);
      setJogo(data);
    }).catch(error => {
      if (error.response.status == 409) {
        const toast = AppToast({ ...toastInitialState, title: "Jogo já cadastrado", bodyText: `O jogo ${nome} já estava cadastrado na sua Lista de Desejos`, variant: "danger" });
        setToasts(toasts.concat(toast));
      }
    });
  }

  return (
    <div className='container'>
      <WishlistForm
        plataformasArray={Object.keys(plataformas)}
        lojas={lojas.current}
        onPlataformaChange={onPlataformaChange}
        onJogoDesejadoInsert={onJogoDesejadoInsert}
        setNome={setNome}
        setLoja={setLoja}
        setPreco={setPreco} />
      <WishlistTable jogosDesejados={jogosDesejados} onJogoDesejadoDelete={onJogoDesejadoDelete} />
      <AppToastContainer position="bottom-end" toasts={toasts} />
    </div>
  );
};