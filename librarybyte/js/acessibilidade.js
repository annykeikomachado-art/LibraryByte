(function () {
  const html = document.documentElement;
  const btnAbrir = document.getElementById("abrir");
  const painel = document.getElementById("painel");
  const chave = "pcd-acessibilidade";

  if (!btnAbrir || !painel) {
    throw new Error("O painel de acessibilidade não foi encontrado nesta página.");
  }

  const modosDalt = [
    { classe: "", texto: "Modo daltônico: desligado" },
    { classe: "dalt-protanopia", texto: "Modo daltônico: protanopia" },
    { classe: "dalt-deuteranopia", texto: "Modo daltônico: deuteranopia" },
    { classe: "dalt-tritanopia", texto: "Modo daltônico: tritanopia" }
  ];

  function estadoPadrao() {
    return { fonte: 100, toggles: {}, dalt: 0 };
  }

  function carregarEstado() {
    try {
      const salvo = JSON.parse(localStorage.getItem(chave));
      if (!salvo || typeof salvo !== "object") return estadoPadrao();

      const fonte = Number(salvo.fonte);
      const dalt = Number(salvo.dalt);

      return {
        fonte: Number.isFinite(fonte) ? Math.min(Math.max(fonte, 80), 150) : 100,
        toggles: salvo.toggles && typeof salvo.toggles === "object" ? salvo.toggles : {},
        dalt: Number.isInteger(dalt) && dalt >= 0 && dalt < modosDalt.length ? dalt : 0
      };
    } catch (erro) {
      console.warn("Não foi possível carregar as preferências de acessibilidade.", erro);
      return estadoPadrao();
    }
  }

  let estado = carregarEstado();

  function salvarEstado() {
    try {
      localStorage.setItem(chave, JSON.stringify(estado));
    } catch (erro) {
      console.warn("Não foi possível salvar as preferências de acessibilidade.", erro);
    }
  }

  function aplicarEstado() {
    html.style.fontSize = `${estado.fonte}%`;

    painel.querySelectorAll("[data-toggle]").forEach((botao) => {
      const nome = botao.dataset.toggle;
      const ativo = Boolean(estado.toggles[nome]);
      html.classList.toggle(nome, ativo);
      botao.setAttribute("aria-pressed", String(ativo));
    });

    modosDalt.forEach((modo) => {
      if (modo.classe) html.classList.remove(modo.classe);
    });

    const modo = modosDalt[estado.dalt];
    if (modo.classe) html.classList.add(modo.classe);

    const btnDalt = painel.querySelector('[data-acao="daltonismo"]');
    btnDalt.textContent = modo.texto;
    btnDalt.setAttribute("aria-pressed", String(estado.dalt !== 0));
  }

  btnAbrir.addEventListener("click", () => {
    const aberto = painel.hidden;
    painel.hidden = !aberto;
    btnAbrir.setAttribute("aria-expanded", String(aberto));
    btnAbrir.setAttribute(
      "aria-label",
      aberto ? "Fechar painel de acessibilidade" : "Abrir painel de acessibilidade"
    );
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !painel.hidden) {
      painel.hidden = true;
      btnAbrir.setAttribute("aria-expanded", "false");
      btnAbrir.setAttribute("aria-label", "Abrir painel de acessibilidade");
      btnAbrir.focus();
    }
  });

  painel.addEventListener("click", (evento) => {
    if (!(evento.target instanceof Element)) return;

    const botao = evento.target.closest("button");
    if (!botao) return;

    if (botao.dataset.toggle) {
      const nome = botao.dataset.toggle;
      estado.toggles[nome] = !estado.toggles[nome];
    }

    switch (botao.dataset.acao) {
      case "fonte-mais":
        estado.fonte = Math.min(estado.fonte + 10, 150);
        break;
      case "fonte-menos":
        estado.fonte = Math.max(estado.fonte - 10, 80);
        break;
      case "daltonismo":
        estado.dalt = (estado.dalt + 1) % modosDalt.length;
        break;
      case "reset":
        estado = estadoPadrao();
        break;
    }

    salvarEstado();
    aplicarEstado();
  });

  aplicarEstado();
})();
