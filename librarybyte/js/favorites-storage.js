// Favoritos agora são gravados no banco (tabela g02_favoritos) pela API api/favoritos.php.
// O site identifica os livros por "id" (texto); o banco usa "id_ebook" (número) - a conversão é feita aqui.
(() => {
  const API = window.LibraryByteAPI;

  function paraIdEbook(id) {
    const livro = buscarLivroPorId(id);
    if (!livro) throw new Error("Livro não encontrado.");
    return livro.id_ebook;
  }

  window.LibraryByteFavorites = {
    // devolve uma Promise com os ids (texto) dos livros favoritos
    async getIds() {
      const { ids } = await API.get("favoritos.php");
      return ids
        .map((idEbook) => LIVROS.find((livro) => livro.id_ebook === idEbook))
        .filter(Boolean)
        .map((livro) => livro.id);
    },
    async add(id) {
      await API.post("favoritos.php", { acao: "adicionar", id_ebook: paraIdEbook(id) });
    },
    async remove(id) {
      await API.post("favoritos.php", { acao: "remover", id_ebook: paraIdEbook(id) });
    }
  };
})();
