/*
    Função para obter uma lista existente no servidor preenchida preeviamente via requisição GET
*/

const getList = async () => {
  let url = "http://127.0.0.1:5000/produtos";
  fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      data.produtos.ForEach((item) =>
        insertList(item.nome, item.Plataforma, item.Loja, item.preço)
      );
    })
    .catch((error) => {
      console.error("error:", error);
    });
};
