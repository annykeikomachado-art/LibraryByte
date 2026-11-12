// Protege as páginas internas: sem sessão no servidor, volta para o login.
(async () => {
  const API = window.LibraryByteAPI;
  try {
    const sessao = await API.get("sessao.php");
    if (!sessao.logado) {
      window.location.replace(`${API.base}index.html`);
      return;
    }
    // mantém nome/perfil do cabeçalho em dia com o que está no servidor
    localStorage.setItem("librarybyte-user-name", sessao.nome);
    localStorage.setItem("librarybyte-user-role", sessao.tipo === "professor" ? "teacher" : "student");
  } catch (erro) {
    console.error("Não foi possível verificar a sessão.", erro);
  }
})();
