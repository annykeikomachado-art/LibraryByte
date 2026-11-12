const CHAVE_HISTORICO = "searchHistory";
const MAX_SUGESTOES = 5;

const campoBusca = document.getElementById("search");
const sugestoes = document.getElementById("suggestions");
const listaLivros = document.getElementById("lista-livros");
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroAutor = document.getElementById("filtro-autor");
const filtroAno = document.getElementById("filtro-ano");
const resultadoLivros = document.getElementById("resultado-livros");

function carregarHistorico() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_HISTORICO)) || [];
  } catch {
    return [];
  }
}

let historicoBusca = carregarHistorico();

function salvarBusca(termo) {
  historicoBusca.push(termo);
  localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(historicoBusca));
}

function mostrarSugestoes() {
  sugestoes.innerHTML = "";

  historicoBusca.slice(-MAX_SUGESTOES).forEach((item) => {
    const p = document.createElement("p");
    p.textContent = item;
    p.addEventListener("click", () => {
      campoBusca.value = item;
      renderizarLivros();
      esconderSugestoes();
    });
    sugestoes.appendChild(p);
  });
}

function esconderSugestoes() {
  sugestoes.innerHTML = "";
}

function preencherFiltro(select, valores) {
  [...new Set(valores)].sort((a, b) => a.localeCompare(b, "pt-BR")).forEach((valor) => {
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
  preencherFiltro(filtroAno, LIVROS.map((livro) => livro.publicacao).filter(Boolean).sort((a, b) => b - a));
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

function renderizarLivros() {
  if (!listaLivros || !Array.isArray(LIVROS)) return;

  listaLivros.innerHTML = "";

  const resultado = livrosFiltrados();
  resultadoLivros.textContent = `${resultado.length} ${resultado.length === 1 ? "livro encontrado" : "livros encontrados"}`;

  resultado.forEach((livro) => {
    const card = document.createElement("article");
    card.className = "book-card";

    const categoria = document.createElement("p");
    categoria.className = "book-category";
    categoria.textContent = livro.categoria || "Sem categoria";

    const titulo = document.createElement("h3");
    titulo.textContent = livro.titulo;

    const autor = document.createElement("p");
    const autores = autoresDoLivro(livro);
    autor.textContent = `${autores.length > 1 ? "Autores" : "Autor"}: ${autores.map((item) => item.nome_autor).join(", ")}`;

    const publicacao = document.createElement("p");
    publicacao.textContent = `Publicação: ${livro.publicacao}`;

    const resumo = document.createElement("p");
    resumo.className = "book-summary";
    resumo.textContent = livro.resumo;

    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = "Acessar";
    botao.addEventListener("click", () => {
      window.location.href = `livro.html?id=${encodeURIComponent(livro.id)}`;
    });

    card.append(categoria, titulo, autor, publicacao, resumo, botao);
    listaLivros.appendChild(card);
  });

  if (resultado.length === 0) {
    const mensagem = document.createElement("p");
    mensagem.className = "sem-livros";
    mensagem.textContent = "Nenhum livro corresponde à busca e aos filtros selecionados.";
    listaLivros.appendChild(mensagem);
  }
}

campoBusca.addEventListener("keydown", (event) => {
  const termo = campoBusca.value.trim();
  if (event.key === "Enter" && termo !== "") {
    salvarBusca(termo);
    campoBusca.value = "";
    esconderSugestoes();
    renderizarLivros();
  }
});

campoBusca.addEventListener("input", renderizarLivros);
campoBusca.addEventListener("focus", mostrarSugestoes);
filtroCategoria.addEventListener("change", renderizarLivros);
filtroAutor.addEventListener("change", renderizarLivros);
filtroAno.addEventListener("change", renderizarLivros);

document.addEventListener("click", (event) => {
  if (!event.target.closest(".topbar")) esconderSugestoes();
});

preencherFiltros();
renderizarLivros();
