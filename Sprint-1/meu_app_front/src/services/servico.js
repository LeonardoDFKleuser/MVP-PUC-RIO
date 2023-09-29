import axios from 'axios';
const RAWG_KEY = 'ae6a3b28513d4a62a58da983aa14ba27';

const Servico = {
  formatarDataMaquina(data) {
    if (!data || isNaN(new Date(data))) {
      return '';
    }

    if (typeof data == "string" && !isNaN(new Date(data))) {
      data = new Date(data);
    }

    if (data && Object.prototype.toString.call(data) == '[object Date]') {
      return (data.getFullYear() + '-' + ('0' + (data.getMonth() + 1)).substr(-2, 2) + '-' + ('0' + data.getDate()).substr(-2, 2));
    }
  },

  formatarDataBrasileira(data) {
    if (!data || isNaN(new Date(data))) {
      return '';
    }

    if (typeof data == "string" && !isNaN(new Date(data))) {
      data = new Date(data);
    }

    if (data && Object.prototype.toString.call(data) === '[object Date]') {
      let dataString = ('0' + data.getDate()).substr(-2, 2) + '/' + ('0' + (data.getMonth() + 1)).substr(-2, 2) + '/' + data.getFullYear();
      return dataString;
    }
  },

  GetListaDesejos: async () => {
    return await axios
      .get('http://127.0.0.1:5000/jogos')
      .then(response => {
        console.log("GetListaDesejos", response);
        return response.data;
      })
      .catch((error) => {
        console.error("GetListaDesejos", error);
        throw error;
      });
  },

  PostListaDesejos: async (nome, loja, preco, plataforma) => {
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("loja", loja);
    formData.append("preco", preco);
    formData.append("plataforma", plataforma);

    return await axios
      .post('http://127.0.0.1:5000/jogo', formData)
      .then(response => {
        console.log("PostListaDesejos", response);
        return response.data;
      })
      .catch((error) => {
        console.error("PostListaDesejos", error);
        throw error;
      });
  },

  DeleteListaDesejos: async (id) => {
    return await axios
      .delete(`http://127.0.0.1:5000/jogo?id=${id}`)
      .then(response => {
        console.log("DeleteListaDesejos", response);
        return response.data;
      })
      .catch((error) => {
        console.error("DeleteListaDesejos", error);
        throw error;
      });
  },

  GetListaLancamentosFuturos: async (search, page) => {
    // daqui a 3 meses = agora + 7.776.000.000 milisegundos
    const dataFinal = Servico.formatarDataMaquina(new Date(new Date().getTime() + 7776000000));
    const dataInicial = Servico.formatarDataMaquina(new Date());
    let url = `https://api.rawg.io/api/games?dates=${dataInicial},${dataFinal}&page_size=10&ordering=released&key=${RAWG_KEY}`;

    if (search) {
      url += `&search=${encodeURI(search)}`;
    }

    if (page) {
      url += `&page=${page}`;
    } else {
      url += '&page=1';
    }

    return await axios
      .get(url)
      .then(response => {
        console.log("GetListaLancamentosFuturos", response);
        return response.data;
      })
      .catch((error) => {
        console.error("GetListaLancamentosFuturos", error);
        throw error;
      });
  },

  GetLancamentoFuturo: async (id) => {
    return await axios
      .get(`https://api.rawg.io/api/games/${id}?key=${RAWG_KEY}`)
      .then(response => {
        console.log("GetLancamentoFuturo", response);
        return response.data;
      })
      .catch((error) => {
        console.error("GetLancamentoFuturo", error)
        throw error;
      });
  }
};

export default Servico;