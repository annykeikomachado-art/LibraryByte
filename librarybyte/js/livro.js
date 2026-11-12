const detalhe = document.getElementById("livro-detalhe");
const capa = document.getElementById("livro-capa");

function criar(tag, texto, classe) {
  const el = document.createElement(tag);
  if (texto) el.textContent = texto;
  if (classe) el.className = classe;
  return el;
}

function criarInfo(rotulo, valor) {
  const bloco = criar("div", null, "info");
  bloco.append(criar("dt", rotulo), criar("dd", valor));
  return bloco;
}

function mostrarCapa(livro) {
  if (livro.capa) {
    const img = criar("img");
    img.src = livro.capa;
    img.alt = `Capa do livro ${livro.titulo}`;
    capa.append(img);
  } else {
    capa.classList.add("sem-imagem");
    capa.append(criar("span", livro.titulo));
    capa.setAttribute("role", "img");
    capa.setAttribute("aria-label", `Capa do livro ${livro.titulo}`);
  }
  capa.hidden = false;
}

function mostrarLivro(livro) {
  document.title = `LibraryByte - ${livro.titulo}`;
  mostrarCapa(livro);

  const autores = autoresDoLivro(livro);
  const infos = criar("dl", null, "livro-infos");
  infos.append(
    criarInfo(autores.length > 1 ? "Autores" : "Autor", autores.map((autor) => autor.nome_autor).join(", ")),
    criarInfo("Publicação", livro.publicacao),
    criarInfo("Área de estudo", livro.categoria || "Não informada")
  );

  const botaoFavoritos = criar("button", "Adicionar aos favoritos", "botao-favoritos");
  botaoFavoritos.type = "button";
  botaoFavoritos.disabled = true;
  const mensagemFavoritos = criar("p", "", "mensagem-favoritos");
  mensagemFavoritos.setAttribute("role", "status");
  mensagemFavoritos.setAttribute("aria-live", "polite");

  LibraryByteFavorites.getIds()
    .then((ids) => {
      if (ids.includes(livro.id)) {
        botaoFavoritos.textContent = "Ver nos favoritos";
        botaoFavoritos.classList.add("favorito-adicionado");
      }
      botaoFavoritos.disabled = false;
    })
    .catch((error) => {
      console.error("Não foi possível verificar os favoritos.", error);
      mensagemFavoritos.textContent = "Não foi possível carregar seus favoritos.";
      botaoFavoritos.disabled = false;
    });

  botaoFavoritos.addEventListener("click", async () => {
    if (botaoFavoritos.classList.contains("favorito-adicionado")) {
      window.location.href = "favoritos.html";
      return;
    }

    botaoFavoritos.disabled = true;
    try {
      await LibraryByteFavorites.add(livro.id);
      window.location.href = "favoritos.html";
    } catch (error) {
      console.error("Não foi possível salvar este favorito.", error);
      mensagemFavoritos.textContent = "Não foi possível salvar este livro nos favoritos. Tente novamente.";
      botaoFavoritos.disabled = false;
    }
  });

  detalhe.append(
    criar("h1", livro.titulo),
    infos,
    criar("h2", "Resumo"),
    criar("p", livro.resumo, "livro-resumo"),
    botaoFavoritos,
    mensagemFavoritos
  );
}

function mostrarNaoEncontrado() {
  document.title = "LibraryByte - Livro não encontrado";
  detalhe.append(
    criar("h1", "Livro não encontrado"),
    criar("p", "Não encontramos o livro que você procura. Volte para a lista e escolha outro título.")
  );
}

// grava a abertura do livro na tabela g02_historico_acesso
function registrarLeitura(livro) {
  LibraryByteAPI.post("historico.php", { acao: "registrar", id_ebook: livro.id_ebook })
    .catch((erro) => console.warn("Não foi possível registrar este livro no histórico de leitura.", erro));
}

const id = new URLSearchParams(window.location.search).get("id");
const livro = buscarLivroPorId(id);

if (livro) {
  mostrarLivro(livro);
  registrarLeitura(livro);
} else {
  mostrarNaoEncontrado();
}