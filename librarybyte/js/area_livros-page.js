const CHAVE_HISTORICO = "searchHistory";
const MAX_SUGESTOES = 5;

const campoBusca = document.getElementById("search");
const sugestoes = document.getElementById("suggestions");
const listaLivros = document.getElementById("lista-livros");
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroAutor = document.getElementById("filtro-autor");
const filtroAno = document.getElementById("filtro-ano");
const resultadoLivros = document.getElementById("resultado-livros");
campoBusca.value = new URLSearchParams(window.location.search).get("busca") || "";

function carregarHistorico() {
  try {
    const historico = JSON.parse(localStorage.getItem(CHAVE_HISTORICO));
    return Array.isArray(historico) ? historico : [];
  } catch (erro) {
    console.warn("Não foi possível carregar o histórico de buscas.", erro);
    return [];
  }
}

let historicoBusca = carregarHistorico();

function salvarBusca(termo) {
  historicoBusca.push(termo);
  try {
    localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(historicoBusca));
  } catch (erro) {
    console.warn("Não foi possível salvar o histórico de buscas.", erro);
  }
}

function esconderSugestoes() {
  sugestoes.replaceChildren();
}

function mostrarSugestoes() {
  esconderSugestoes();

  historicoBusca.slice(-MAX_SUGESTOES).reverse().forEach((item) => {
    const sugestao = document.createElement("button");
    sugestao.type = "button";
    sugestao.className = "suggestion";
    sugestao.textContent = item;
    sugestao.addEventListener("click", () => {
      campoBusca.value = item;
      renderizarLivros();
      esconderSugestoes();
    });
    sugestoes.appendChild(sugestao);
  });
}

function preencherFiltro(select, valores) {
  [...new Set(valores)]
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .forEach((valor) => {
      const opcao = document.createElement("option");
      opcao.value = valor;
      opcao.textContent = valor;
      select.appendChild(opcao);
    });
}

function preencherFiltros() {
  preencherFiltro(filtroCategoria, LIVROS.map((livro) => livro.categoria).filter(Boolean));
  AUTORES
    .slice()
    .sort((a, b) => a.nome_autor.localeCompare(b.nome_autor, "pt-BR"))
    .forEach((autor) => {
      const opcao = document.createElement("option");
      opcao.value = String(autor.id_autor);
      opcao.textContent = autor.nome_autor;
      filtroAutor.appendChild(opcao);
    });
  preencherFiltro(
    filtroAno,
    LIVROS.map((livro) => livro.publicacao).filter(Boolean).sort((a, b) => b - a)
  );
}

function livrosFiltrados() {
  const termo = campoBusca.value.trim().toLocaleLowerCase("pt-BR");

  return LIVROS.filter((livro) => {
    const autores = autoresDoLivro(livro);
    const correspondeBusca = !termo || [
      livro.titulo,
      livro.categoria,
      livro.resumo
    ].some((valor) => valor.toLocaleLowerCase("pt-BR").includes(termo)) ||
      autores.some((autor) => autor.nome_autor.toLocaleLowerCase("pt-BR").includes(termo));
    const correspondeCategoria = !filtroCategoria.value || livro.categoria === filtroCategoria.value;
    const correspondeAutor = !filtroAutor.value ||
      autores.some((autor) => String(autor.id_autor) === filtroAutor.value);
    const correspondeAno = !filtroAno.value || livro.publicacao === filtroAno.value;

    return correspondeBusca && correspondeCategoria && correspondeAutor && correspondeAno;
  });
}

function criarElemento(tag, texto, classe) {
  const elemento = document.createElement(tag);
  elemento.textContent = texto;
  if (classe) elemento.className = classe;
  return elemento;
}

function renderizarLivros() {
  listaLivros.replaceChildren();

  const resultado = livrosFiltrados();
  resultadoLivros.textContent = `${resultado.length} ${resultado.length === 1 ? "livro encontrado" : "livros encontrados"}`;

  resultado.forEach((livro) => {
    const card = document.createElement("article");
    card.className = "book-card";

    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = "Acessar";
    botao.addEventListener("click", () => {
      window.location.href = `livro.html?id=${encodeURIComponent(livro.id)}`;
    });

    const capa = document.createElement("div");
    capa.className = "capa-livro";

    if (livro.capa) {
      const imagem = document.createElement("img");
      imagem.src = livro.capa;
      imagem.alt = `Capa do livro ${livro.titulo}`;
      imagem.loading = "lazy";
      imagem.onerror = () => {
        capa.classList.add("capa-livro-sem-imagem");
        imagem.remove();
        capa.textContent = livro.titulo;
      };
      capa.appendChild(imagem);
    } else {
      capa.classList.add("capa-livro-sem-imagem");
      capa.textContent = livro.titulo;
      capa.setAttribute("role", "img");
      capa.setAttribute("aria-label", `Capa ilustrativa de ${livro.titulo}`);
    }

    const informacoes = criarElemento("div", null, "informacoes-livro");
    informacoes.append(
      criarElemento("p", livro.categoria || "Sem categoria", "book-category"),
      criarElemento("h2", livro.titulo),
      criarElemento("p", `${autoresDoLivro(livro).length > 1 ? "Autores" : "Autor"}: ${autoresDoLivro(livro).map((autor) => autor.nome_autor).join(", ")}`, "autor-livro"),
      criarElemento("p", `Publicação: ${livro.publicacao}`, "ano-publicacao"),
      botao
    );
    card.append(capa, informacoes);
    listaLivros.appendChild(card);
  });

  if (resultado.length === 0) {
    listaLivros.appendChild(
      criarElemento("p", "Nenhum livro corresponde à busca e aos filtros selecionados.", "sem-livros")
    );
  }
}

campoBusca.addEventListener("keydown", (evento) => {
  if (evento.key !== "Enter") return;
  const termo = campoBusca.value.trim();
  if (!termo) return;

  salvarBusca(termo);
  historicoBusca = carregarHistorico();
  esconderSugestoes();
});

campoBusca.addEventListener("input", renderizarLivros);
campoBusca.addEventListener("focus", mostrarSugestoes);
filtroCategoria.addEventListener("change", renderizarLivros);
filtroAutor.addEventListener("change", renderizarLivros);
filtroAno.addEventListener("change", renderizarLivros);

document.addEventListener("click", (evento) => {
  if (!(evento.target instanceof Element) || !evento.target.closest(".topbar")) {
    esconderSugestoes();
  }
});

preencherFiltros();
renderizarLivros();
