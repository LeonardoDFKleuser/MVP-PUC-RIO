from flask_openapi3 import OpenAPI, Info, Tag
from flask import redirect
from urllib.parse import unquote

from sqlalchemy.exc import IntegrityError

from model import Session, Jogo, Comentario
from logger import logger
from schemas import *  
from flask_cors import CORS

info =Info(title="Minha API", version="1.0.0")
app = OpenAPI(__name__, info=info)
CORS(app)

#Definindo Tags
Home_tag = Tag(name="Documentação", description="documentação em Swagger")
jogo_tag = Tag(name="Jogo", description="Adição, visualização e remoção de jogos à base")
comentario_tag = Tag(name="Comentário", description="Adição de um comentário à produtos cadastrados na base")


@app.get('/openapi/swagger', tags=[Home_tag])
def home():
    """ Redireciona para o Swagger para consulta da documentação.
    """
    return redirect('/openapi/swagger')


@app.post('/jogo', tags=[jogo_tag], responses={"200": JogoViewSchema, "409": ErrorSchema, "400": ErrorSchema})
def add_jogo(form: JogosSchema):
    """Adiciona um novo jogo ao banco
    
    retorna uma representação dos jogos e comentários associados.
    """

jogo = Jogo(
    nome=form.nome,
    plataforma=form.plataforma,
    loja=form.loja,
    preço=form.preço,)
logger.debug(f"Adicionando jogo de nome:  '{jogo.nome}'")
try:
    #criando conexão com a base
    session = Session()
    #Adicionando um jogo
    session.add(jogo)
    #efetivando o comando de adição de novo item na tabela
    session.commit()
    logger.debug(f"adicionando jogo de nome:  '{jogo.nome}'")
    return apresenta_jogo(jogo), 200

except IntegrityError as e:
    #como a duplicidade do nome é a razão do IntegrityError
    error_msg = "Jogo de mesmo nome já salvo na base :/"
    logger.warning(f"Erro ao adicionar jogo '{jogo.nome}', {error_msg}")
    return {"message": error_msg}, 409

except Exception as e: 
    # Caso fora do previsto 
    error_msg = "Não Foi possivel salvar novo jogo :/"
    logger.debug(f"erro ao adicionar produto '{jogo.nome}',{error_msg}")
    return {"message": error_msg}, 400