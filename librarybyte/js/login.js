const loginCard = document.getElementById("login-card");
const registerCard = document.getElementById("register-card");
const msgLogin = document.getElementById("msg-login");
const msgRegistro = document.getElementById("msg-registro");
const API = window.LibraryByteAPI;

function perfilPorEmail(email) {
  const dominio = email.trim().toLowerCase().split("@").pop();
  if (/^prof(?:\.|$)/.test(dominio)) return "professor";
  if (/^aluno(?:\.|$)/.test(dominio)) return "aluno";
  return null;
}

function mostrarMensagem(el, texto, ok = false) {
  el.textContent = texto;
  el.classList.toggle("form-msg-ok", ok);
}

async function realizarLogin() {
  const email = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value;

  if (!email || !senha) {
    mostrarMensagem(msgLogin, "Preencha e-mail e senha antes de continuar.");
    return;
  }

  const botao = document.getElementById("login-btn");
  botao.disabled = true;
  try {
    const resposta = await API.post("login.php", { email, senha });
    localStorage.setItem("librarybyte-user-role", resposta.tipo === "professor" ? "teacher" : "student");
    localStorage.setItem("librarybyte-user-name", resposta.nome);
    window.location.href = "pages/dashboard.html";
  } catch (erro) {
    mostrarMensagem(msgLogin, erro.message);
  } finally {
    botao.disabled = false;
  }
}

async function realizarRegistro() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha-registro").value;
  const tipo = perfilPorEmail(email);
  const nascimento = document.getElementById("nascimento").value;

  if (!tipo) {
    mostrarMensagem(msgRegistro, "Use um e-mail cujo domínio comece com prof. ou aluno.");
    return;
  }
  if (!nome || !email || !senha || (tipo === "aluno" && !nascimento)) {
    mostrarMensagem(msgRegistro, "Preencha todos os campos.");
    return;
  }

  const botao = document.getElementById("register-btn");
  botao.disabled = true;
  try {
    await API.post("registrar.php", { nome, email, senha, data_nascimento: nascimento });
    mostrarLogin();
    document.getElementById("usuario").value = email;
    document.getElementById("senha").value = "";
    mostrarMensagem(msgLogin, "Cadastro realizado! Entre com seu e-mail e senha.", true);
  } catch (erro) {
    mostrarMensagem(msgRegistro, erro.message);
  } finally {
    botao.disabled = false;
  }
}

function mostrarRegistro() {
  loginCard.style.display = "none";
  registerCard.style.display = "flex";
  mostrarMensagem(msgRegistro, "");
}

function mostrarLogin() {
  registerCard.style.display = "none";
  loginCard.style.display = "flex";
}

document.getElementById("login-btn").addEventListener("click", realizarLogin);
document.getElementById("register-btn").addEventListener("click", realizarRegistro);

["usuario", "senha"].forEach((id) => {
  document.getElementById(id).addEventListener("keydown", (event) => {
    if (event.key === "Enter") realizarLogin();
  });
});
["nome", "email", "senha-registro", "nascimento"].forEach((id) => {
  document.getElementById(id).addEventListener("keydown", (event) => {
    if (event.key === "Enter") realizarRegistro();
  });
});

document.getElementById("show-register").addEventListener("click", (event) => {
  event.preventDefault();
  mostrarRegistro();
});

document.getElementById("show-login").addEventListener("click", (event) => {
  event.preventDefault();
  mostrarLogin();
});
