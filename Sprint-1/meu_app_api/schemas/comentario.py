from pydantic import BaseModel

class ComentarioSchema(BaseModel):
    # Define como um novo comentário a ser inserido deve ser representado
    produto_id: int = 1
    text: str = "Só comprar se o preço relmente estiver bom!"