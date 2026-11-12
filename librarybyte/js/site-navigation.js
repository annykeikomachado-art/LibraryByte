(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const isPagesDirectory = window.location.pathname.toLowerCase().includes("/pages/");
  const pagesPrefix = isPagesDirectory ? "" : "pages/";
  const rootPrefix = isPagesDirectory ? "../" : "";
  const favoritesLink = header.querySelector('.site-navigation a:last-child');

  if (favoritesLink) {
    favoritesLink.href = `${pagesPrefix}favoritos.html`;
  }

  const profile = document.createElement("div");
  profile.className = "profile-menu";

  const name = localStorage.getItem("librarybyte-user-name") || "Meu perfil";
  const role = localStorage.getItem("librarybyte-user-role");
  const roleName = role === "teacher" ? "Professor(a)" : "Aluno(a)";

  const button = document.createElement("button");
  button.className = "profile-button";
  button.type = "button";
  button.textContent = name;
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "profile-panel");

  const panel = document.createElement("div");
  panel.className = "profile-panel";
  panel.id = "profile-panel";
  panel.hidden = true;

  const identity = document.createElement("p");
  identity.className = "profile-identity";
  identity.textContent = name;

  const userRole = document.createElement("p");
  userRole.className = "profile-role";
  userRole.textContent = roleName;

  const logout = document.createElement("a");
  logout.href = `${rootPrefix}index.html`;
  logout.textContent = "Sair";
  logout.addEventListener("click", async (event) => {
    event.preventDefault();
    localStorage.removeItem("librarybyte-user-name");
    localStorage.removeItem("librarybyte-user-role");
    try {
      await LibraryByteAPI.post("logout.php", {});
    } catch (erro) {
      console.warn("Não foi possível encerrar a sessão no servidor.", erro);
    }
    window.location.href = logout.href;
  });

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;
  });

  document.addEventListener("click", (event) => {
    if (!profile.contains(event.target)) {
      button.setAttribute("aria-expanded", "false");
      panel.hidden = true;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      button.setAttribute("aria-expanded", "false");
      panel.hidden = true;
    }
  });

  panel.append(identity, userRole, logout);
  profile.append(button, panel);
  header.appendChild(profile);
})();
