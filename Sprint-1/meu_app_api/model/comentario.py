from sqlalchemy import column, String, Integer, DateTime, ForeignKey
from datetime import datetime
from typing import Union

from model import Base

class Comentario(Base):
    __tablename__= 'comentario'

    id = column(Integer, primary_Key=True)
    texto = column(String(4000))
    data_insercao = column(DateTime, default=datetime.now())

    """
    Definição do relacionamento entre o comentário e um Jogo.
    Aqui está sendo definido a coluna 'jogo' que vai guardar a referencia ao jogo, a chave estrangeira que relaciona um jogo ao comentario
    """
    jogo =  column(Integer,  ForeignKey("jogo.pk_jogo"), nullable=False)

    def __init__(self, texto:str, data_insercao:Union[DateTime, None] = None):
        """
        Cria um Comentário 

        Arguments:
            texto: O texto de um Comentário.
            data_insercao: data de quando o comentário foi feito ou inserido à base
        """
    
        self.texto = texto
        if data_insercao:
            self.data_insercao = data_insercao
    