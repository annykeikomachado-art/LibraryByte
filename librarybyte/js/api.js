// Pequeno helper para chamar a pasta api/ (funciona em index.html e em pages/*.html)
(() => {
  const base = window.location.pathname.toLowerCase().includes("/pages/") ? "../" : "";

  async function chamar(arquivo, corpo) {
    const opcoes = { credentials: "same-origin", headers: { Accept: "application/json" } };
    if (corpo !== undefined) {
      opcoes.method = "POST";
      opcoes.headers["Content-Type"] = "application/json";
      opcoes.body = JSON.stringify(corpo);
    }

    let resposta;
    try {
      resposta = await fetch(`${base}api/${arquivo}`, opcoes);
    } catch (erro) {
      throw new Error("Não foi possível falar com o servidor.");
    }

    let dados = null;
    try {
      dados = await resposta.json();
    } catch (erro) {
      throw new Error("Resposta inválida do servidor.");
    }
    if (!resposta.ok || !dados.ok) {
      const e = new Error(dados && dados.erro ? dados.erro : "Erro inesperado.");
      e.status = resposta.status;
      throw e;
    }
    return dados;
  }

  window.LibraryByteAPI = {
    base,
    get: (arquivo) => chamar(arquivo),
    post: (arquivo, corpo) => chamar(arquivo, corpo)
  };
})();
