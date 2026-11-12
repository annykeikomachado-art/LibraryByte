const CHAVE_HISTORICO = "searchHistory";
const listaHistorico = document.getElementById("historico-lista");
const botaoLimpar = document.getElementById("limpar-historico");
const listaHistoricoLeitura = document.getElementById("historico-leitura-lista");
const botaoLimparLeitura = document.getElementById("limpar-historico-leitura");

function carregarHistorico() {
  try {
    const historico = JSON.parse(localStorage.getItem(CHAVE_HISTORICO));
    return Array.isArray(historico)
      ? historico.filter((termo) => typeof termo === "string" && termo.trim())
      : [];
  } catch (erro) {
    console.warn("Não foi possível carregar o histórico de buscas.", erro);
    return [];
  }
}

function renderizarHistorico() {
  listaHistorico.replaceChildren();
  const historico = carregarHistorico().slice().reverse();
  botaoLimpar.hidden = historico.length === 0;

  if (historico.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "history-empty";
    vazio.textContent = "Você ainda não fez buscas. Acesse os livros para começar.";
    listaHistorico.appendChild(vazio);
    return;
  }

  historico.forEach((termo) => {
    const item = document.createElement("li");
    const texto = document.createElement("span");
    texto.className = "history-search";
    texto.textContent = termo;

    const link = document.createElement("a");
    link.className = "history-open";
    link.href = `area_livros.html?busca=${encodeURIComponent(termo)}`;
    link.textContent = "Ver resultados";

    item.append(texto, link);
    listaHistorico.appendChild(item);
  });
}

// histórico de leitura: vem do banco (g02_historico_acesso)
async function carregarHistoricoLeitura() {
  try {
    const { itens } = await LibraryByteAPI.get("historico.php");
    return itens
      .map((item) => {
        const livro = LIVROS.find((l) => l.id_ebook === item.id_ebook);
        return livro
          ? { id: livro.id, titulo: livro.titulo, abertoEm: new Date(item.ts * 1000).toISOString() }
          : null;
      })
      .filter(Boolean);
  } catch (erro) {
    console.warn("Não foi possível carregar o histórico de leitura.", erro);
    return [];
  }
}

async function renderizarHistoricoLeitura() {
  const historico = await carregarHistoricoLeitura();
  listaHistoricoLeitura.replaceChildren();
  botaoLimparLeitura.hidden = historico.length === 0;

  if (historico.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "history-empty";
    vazio.textContent = "Você ainda não abriu nenhum livro.";
    listaHistoricoLeitura.appendChild(vazio);
    return;
  }

  historico.forEach((leitura) => {
    const item = document.createElement("li");
    const informacoes = document.createElement("div");
    informacoes.className = "history-book";

    const titulo = document.createElement("span");
    titulo.className = "history-search";
    titulo.textContent = leitura.titulo;

    const data = document.createElement("time");
    data.className = "history-date";
    data.dateTime = leitura.abertoEm;
    data.textContent = new Date(leitura.abertoEm).toLocaleString("pt-BR");

    const link = document.createElement("a");
    link.className = "history-open";
    link.href = `livro.html?id=${encodeURIComponent(leitura.id)}`;
    link.textContent = "Abrir livro";

    informacoes.append(titulo, data);
    item.append(informacoes, link);
    listaHistoricoLeitura.appendChild(item);
  });
}

botaoLimpar.addEventListener("click", () => {
  try {
    localStorage.removeItem(CHAVE_HISTORICO);
    renderizarHistorico();
  } catch (erro) {
    console.error("Não foi possível limpar o histórico de buscas.", erro);
  }
});

botaoLimparLeitura.addEventListener("click", async () => {
  try {
    await LibraryByteAPI.post("historico.php", { acao: "limpar" });
    await renderizarHistoricoLeitura();
  } catch (erro) {
    console.error("Não foi possível limpar o histórico de leitura.", erro);
  }
});

renderizarHistorico();
renderizarHistoricoLeitura();
