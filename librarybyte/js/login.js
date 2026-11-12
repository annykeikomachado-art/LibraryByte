const loginCard = document.getElementById("login-card");
const registerCard = document.getElementById("register-card");
const msgLogin = document.getElementById("msg-login");
const msgRegistro = document.getElementById("msg-registro");
const tipoRegistro = document.getElementById("tipo-registro");
const campoNascimento = document.getElementById("campo-nascimento");
const API = window.LibraryByteAPI;

function mostrarMensagem(el, texto, ok = false) {
  el.textContent = texto;
  el.classList.toggle("form-msg-ok", ok);
}

async function realizarLogin() {
  const email = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value;
  const perfil = document.getElementById("tipo-usuario").value;   // student | teacher

  if (!email || !senha) {
    mostrarMensagem(msgLogin, "Preencha e-mail e senha antes de continuar.");
    return;
  }

  const botao = document.getElementById("login-btn");
  botao.disabled = true;
  try {
    const resposta = await API.post("login.php", {
      email,
      senha,
      tipo: perfil === "teacher" ? "professor" : "aluno"
    });
    localStorage.setItem("librarybyte-user-role", perfil);
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
  const tipo = tipoRegistro.value;
  const nascimento = document.getElementById("nascimento").value;

  if (!nome || !email || !senha || (tipo === "aluno" && !nascimento)) {
    mostrarMensagem(msgRegistro, "Preencha todos os campos.");
    return;
  }

  const botao = document.getElementById("register-btn");
  botao.disabled = true;
  try {
    await API.post("registrar.php", { tipo, nome, email, senha, data_nascimento: nascimento });
    mostrarLogin();
    document.getElementById("usuario").value = email;
    document.getElementById("senha").value = "";
    document.getElementById("tipo-usuario").value = tipo === "professor" ? "teacher" : "student";
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

function atualizarCampoNascimento() {
  campoNascimento.style.display = tipoRegistro.value === "aluno" ? "" : "none";
}

document.getElementById("login-btn").addEventListener("click", realizarLogin);
document.getElementById("register-btn").addEventListener("click", realizarRegistro);
tipoRegistro.addEventListener("change", atualizarCampoNascimento);

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

atualizarCampoNascimento();
