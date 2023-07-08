from sqlalchemy import Column, String, Integer, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Union

from  model import Base, Comentario



class jogo(Base):
    __tablename__='jogo'


    id = Column("pk_jogo", Integer, primary_key=True)
    nome = Column(String(140), unique=True)
    plataforma = Column(String(140), unique=True)
    loja = Column(String(140), unique=True)
    preço = Column(float)
    data_insercao = Column(datetime, default=DateTime.now())


    """
    
    Definição do relacionamento entre o comentário e um Jogo.
    """

    comentarios = relationship("Comentario")

    def __init__(self, nome:str, plataforma:str, loja:str, preço:float, data_insercao:Union[DateTime, None] = None):

        """
        Cria um produto

        Arguments:
            nome: nome do jogo.
            plataforma: Plataforma que foi comprado.
            loja: Loja em que foi comprado.
            preço: Valor pago pelo jogo.
            data_insercao: data de quando o produto foi inserido a base

        """

        self.nome = nome
        self.plataforma = plataforma
        self.loja = loja
        self.preço = preço

        #se não for informada, será a data exata da inserção do bando

        if data_insercao:
            self.data_insercao = data_insercao

    def adiciona_comentario(self, comentario:Comentario):
        #Adiciona novo comentario ao jogo

        self.comentarios.append(comentario)