(() => {
  const API = window.LibraryByteAPI;
  const classList = document.getElementById("class-list");
  const classCount = document.getElementById("class-count");
  const message = document.getElementById("classroom-message");
  const joinForm = document.getElementById("join-class-form");
  const createForm = document.getElementById("create-class-form");
  const details = document.getElementById("class-details");
  let classrooms = [];
  let selectedClassId = null;
  let activeRole = "student";

  function showMessage(text, isError = false) {
    message.textContent = text;
    message.classList.toggle("is-error", isError);
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }

  function renderDetails(classroom) {
    details.replaceChildren();
    if (!classroom) {
      details.hidden = true;
      return;
    }

    const heading = createElement("h3", "", classroom.name);
    const professor = createElement("p", "", `Professor(a): ${classroom.teacher}`);
    const semester = createElement("p", "", `Semestre: ${classroom.semester}`);
    const studentsLabel = createElement("p", "", `Alunos matriculados (${classroom.students.length})`);
    const students = createElement("ul", "student-list");

    classroom.students.forEach((student) => {
      students.appendChild(createElement("li", "", student.name));
    });

    if (classroom.students.length === 0) {
      students.appendChild(createElement("li", "", "Nenhum aluno entrou nesta turma ainda."));
    }

    details.append(heading, professor, semester);
    if (classroom.code) {
      details.append(
        createElement("p", "", "Código de acesso"),
        createElement("span", "class-code", classroom.code)
      );
    }
    details.append(studentsLabel, students);
    details.hidden = false;
  }

  function renderClassrooms() {
    classList.replaceChildren();
    classCount.textContent = `${classrooms.length} ${classrooms.length === 1 ? "turma" : "turmas"}`;

    if (classrooms.length === 0) {
      const empty = createElement(
        "p",
        "empty-classes",
        activeRole === "teacher"
          ? "Você ainda não criou turmas. Use o formulário ao lado para começar."
          : "Você ainda não entrou em nenhuma turma. Use o código fornecido pelo professor."
      );
      classList.appendChild(empty);
      renderDetails(null);
      return;
    }

    classrooms.forEach((classroom) => {
      const card = createElement("button", "class-card");
      card.type = "button";
      card.setAttribute("aria-pressed", String(classroom.id === selectedClassId));
      card.append(
        createElement("span", "class-subject", classroom.semester),
        createElement("strong", "", classroom.name),
        createElement("small", "", `Professor(a): ${classroom.teacher}`),
        createElement("small", "", `${classroom.students.length} ${classroom.students.length === 1 ? "aluno" : "alunos"}`)
      );
      card.addEventListener("click", () => {
        selectedClassId = classroom.id;
        renderClassrooms();
      });
      classList.appendChild(card);
    });

    const selected = classrooms.find((classroom) => classroom.id === selectedClassId);
    if (selected) renderDetails(selected);
    else renderDetails(null);
  }

  async function loadClassrooms() {
    const data = await API.get("turmas.php");
    classrooms = data.turmas;
    renderClassrooms();
  }

  function setRole() {
    const isTeacher = activeRole === "teacher";
    joinForm.hidden = isTeacher;
    createForm.hidden = !isTeacher;
    selectedClassId = null;
    showMessage("");
    renderClassrooms();
  }

  joinForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const codigo = String(new FormData(joinForm).get("code")).trim().toUpperCase();
      const data = await API.post("turmas.php", { acao: "entrar", codigo });
      selectedClassId = data.id;
      await loadClassrooms();
      joinForm.reset();
      showMessage(`Você entrou na turma "${data.nome}".`);
    } catch (error) {
      console.error("Não foi possível entrar na turma.", error);
      showMessage(error.message, true);
    }
  });

  createForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(createForm);
    try {
      const data = await API.post("turmas.php", {
        acao: "criar",
        nome: String(formData.get("className")).trim(),
        semestre: String(formData.get("semester")).trim()
      });
      selectedClassId = data.id;
      await loadClassrooms();
      createForm.reset();
      showMessage(`Turma criada! Compartilhe o código ${data.codigo} com seus alunos.`);
    } catch (error) {
      console.error("Não foi possível criar a turma.", error);
      showMessage(error.message, true);
    }
  });

  (async () => {
    joinForm.querySelector("button").disabled = true;
    createForm.querySelector("button").disabled = true;
    try {
      const sessao = await API.get("sessao.php");
      if (!sessao.logado) {
        window.location.replace(`${API.base}index.html`);
        return;
      }
      activeRole = sessao.tipo === "professor" ? "teacher" : "student";
      setRole();
      await loadClassrooms();
      showMessage("");
      joinForm.querySelector("button").disabled = false;
      createForm.querySelector("button").disabled = false;
    } catch (error) {
      console.error("Não foi possível carregar as turmas.", error);
      showMessage(error.message, true);
    }
  })();
})();
