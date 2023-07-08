from pydantic import BaseModel
from typing import Optional, List
from model.jogo import Jogo

from schemas import ComentarioSchema


class JogosSchema(BaseModel):
    # Define como um novo jogo a ser inserido deve ser representado 
    nome: str = "Dark Cats 3"
    plataforma: str = "Pc"
    loja: str = "Valvula"
    preço: float = 250.00


class JogoBuscaSchema(BaseModel):
    # Define como deve ser a estrutura que representa a busca. Que será feita apenas com base no nome do jogo.

    nome: str = "Teste"



class JogoViewSchema(BaseModel):
    """ Define como um produto será retornado: jogo + comentários.
    """
    id: int = 1
        nome: str = "dark cats 3"
        plataforma: str = "Pc"
        loja: str = "Valvula"
        preço: float = 250.00
        total_comentarios: int = 1
        comentarios:List[ComentarioSchema]



class ListagemJogosSchema(BaseModel):
    # Define como a listegem de jogos será retornada

    jogos: List[JogosSchema]

def apresenta_jogos(jogos: List[Jogos]):
    """ Retorna uma representação do jogo seguindo o schema definido em jogoViewSchama.
    """
    result = []
    for jogo in produtos:
        result.append({
            "nome": jogo.nome,
                "plataforma": jogo.plataforma,
                "loja": jogo.loja,
                "preço": jogo.preço,
        })

    return {"Jogos": result}
    


class JogoDeleteSchema(BaseModel):
    # Define como deve ser a estrutura do dado retornado após uma requisição de remoção:
    message: str
    nome: str


def apresenta_jogo(jogo: Jogo):
    """ Retorna uma apresentação do jogo segundo o schema definido em JogoViewSchema.
    """
    return {
         "id"
            "nome": jogo.nome,
            "plataforma": jogo.plataforma,
            "loja": jogo.loja,
            "preço": jogo.preço,
            "total_comentarios": len(jogo.comentarios),
            "comentarios": [{"texto": c.texto} for c in jogo.comentarios]
    }
  