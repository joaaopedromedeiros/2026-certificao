export interface ItemCarrinho {
  produto_id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export interface Carrinho {
  itens: ItemCarrinho[];
  total: number;
}