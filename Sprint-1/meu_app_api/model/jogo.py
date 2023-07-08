from sqlalchemy import Column, String, Integer, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Union

from  model import Base, Comentario



class jogo(Base):
    __tablename__='jogo'

    id = Column("pk_jogo", Integer, primary_key=True)
    nome = Column()