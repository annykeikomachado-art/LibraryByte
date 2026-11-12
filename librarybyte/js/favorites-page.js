const favoritesList = document.getElementById("favorites-list");
const favoritesMessage = document.getElementById("favorites-message");

function createFavoriteElement(tag, text, className) {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.className = className;
  return element;
}

async function renderFavorites() {
  let favoriteIds;
  try {
    favoriteIds = await LibraryByteFavorites.getIds();
  } catch (error) {
    console.error("Não foi possível carregar os favoritos.", error);
    favoritesMessage.textContent = "Não foi possível carregar seus favoritos. Tente novamente.";
    return;
  }

  favoritesList.replaceChildren();

  const favorites = favoriteIds
    .map((id) => buscarLivroPorId(id))
    .filter(Boolean);

  if (favorites.length === 0) {
    favoritesMessage.textContent = "Você ainda não adicionou livros aos favoritos.";
    return;
  }

  favoritesMessage.textContent = `${favorites.length} ${favorites.length === 1 ? "livro favorito" : "livros favoritos"}`;

  favorites.forEach((book) => {
    const card = createFavoriteElement("article", null, "favorite-card");
    const cover = createFavoriteElement("div", null, "favorite-cover");

    if (book.capa) {
      const image = createFavoriteElement("img");
      image.src = book.capa;
      image.alt = `Capa do livro ${book.titulo}`;
      image.loading = "lazy";
      cover.appendChild(image);
    } else {
      cover.classList.add("favorite-cover-empty");
      cover.textContent = book.titulo;
    }

    const details = createFavoriteElement("div", null, "favorite-details");
    details.append(
      createFavoriteElement("p", book.categoria || "Sem categoria", "favorite-category"),
      createFavoriteElement("h2", book.titulo),
      createFavoriteElement(
        "p",
        `${autoresDoLivro(book).length > 1 ? "Autores" : "Autor"}: ${autoresDoLivro(book).map((author) => author.nome_autor).join(", ")}`
      ),
      createFavoriteElement("p", `Publicação: ${book.publicacao}`)
    );

    const actions = createFavoriteElement("div", null, "favorite-actions");
    const openBook = createFavoriteElement("a", "Ver livro", "welcome-link");
    openBook.href = `livro.html?id=${encodeURIComponent(book.id)}`;

    const removeButton = createFavoriteElement("button", "Remover dos favoritos", "favorite-remove");
    removeButton.type = "button";
    removeButton.addEventListener("click", async () => {
      try {
        await LibraryByteFavorites.remove(book.id);
        await renderFavorites();
      } catch (error) {
        console.error("Não foi possível remover este favorito.", error);
        favoritesMessage.textContent = "Não foi possível remover este livro dos favoritos.";
      }
    });

    actions.append(openBook, removeButton);
    details.appendChild(actions);
    card.append(cover, details);
    favoritesList.appendChild(card);
  });
}

renderFavorites();
