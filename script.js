// Aguarda a renderização completa da árvore DOM
document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. INTERATIVIDADE DO ACCORDION (CARDS EXPANSÍVEIS)
       ========================================================================== */
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", () => {
            const itemAtual = header.parentElement;
            const estaAtivo = itemAtual.classList.contains("ativo");

            // Fecha todos os accordions ativos antes de abrir o novo (Efeito Sanfona)
            document.querySelectorAll(".accordion-item").forEach(item => {
                item.classList.remove("ativo");
                item.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
            });

            // Se o item clicado não estava ativo, abre ele
            if (!estaAtivo) {
                itemAtual.classList.add("ativo");
                header.setAttribute("aria-expanded", "true");
            }
        });
    });

    /* ==========================================================================
       2. REQUISITO DE ACESSIBILIDADE DINÂMICA
       ========================================================================== */
    let escalaFonte = 100; // Percentual inicial da fonte do sistema
    const htmlElement = document.documentElement;

    // Aumentar Fonte
    document.getElementById("btn-aumentar").addEventListener("click", () => {
        if (escalaFonte < 140) { // Trava de segurança visual
            escalaFonte += 10;
            htmlElement.style.fontSize = `${escalaFonte}%`;
        }
    });

    // Diminuir Fonte
    document.getElementById("btn-diminuir").addEventListener("click", () => {
        if (escalaFonte > 80) { // Trava de segurança visual
            escalaFonte -= 10;
            htmlElement.style.fontSize = `${escalaFonte}%`;
        }
    });

    // Alternar Modo Claro / Escuro
    document.getElementById("btn-tema").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    /* ==========================================================================
       3. SINTETIZADOR DE VOZ (SPEECH SYNTHESIS API)
       ========================================================================== */
    const btnFalar = document.getElementById("btn-falar");
    const btnParar = document.getElementById("btn-parar");
    let sinteseVoz = window.speechSynthesis;
    let expressaoUterance = null;

    btnFalar.addEventListener("click", () => {
        // Se já houver áudio rodando, cancela
        if (sinteseVoz.speaking) {
            sinteseVoz.cancel();
        }

        // Seleciona estritamente o conteúdo do escopo principal prescrito
        const conteudoParaLer = document.getElementById("conteudo-principal").innerText;

        expressaoUterance = new SpeechSynthesisUtterance(conteudoParaLer);
        expressaoUterance.lang = "pt-BR";
        expressaoUterance.rate = 1.1; // Velocidade levemente otimizada

        // Gerenciamento de estado dos botões da interface
        expressaoUterance.onstart = () => {
            btnFalar.innerText = "Tocando... 🎙️";
            btnParar.disabled = false;
        };

        expressaoUterance.onend = () => {
            btnFalar.innerText = "Ouvir Conteúdo 🔊";
            btnParar.disabled = true;
        };

        sinteseVoz.speak(expressaoUterance);
    });

    btnParar.addEventListener("click", () => {
        if (sinteseVoz.speaking) {
            sinteseVoz.cancel();
            btnFalar.innerText = "Ouvir Conteúdo 🔊";
            btnParar.disabled = true;
        }
    });

    /* ==========================================================================
       4. GESTÃO DE FORMULÁRIO E INTERAÇÃO DE COMENTÁRIOS
       ========================================================================== */
    const formSeminario = document.getElementById("form-seminario");
    formSeminario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        alert(`Inscrição de ${document.getElementById("nome").value} realizada com sucesso para o Seminário 2026!`);
        formSeminario.reset();
    });

    const formComentario = document.getElementById("form-comentario");
    const listaComentarios = document.getElementById("lista-comentarios");

    formComentario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const textoInput = document.getElementById("texto-comentario").value;

        // Cria dinamicamente a estrutura do card de feedback
        const novoCard = document.createElement("div");
        novoCard.classList.add("card-comentario-usuario");
        
        // Formata data e hora em tempo real de inserção
        const dataAtual = new Date().toLocaleDateString('pt-BR');
        novoCard.innerHTML = `<p>"${textoInput}"</p><small style="color:var(--cor-azul-celeste); font-weight:bold;">Enviado anonimamente em: ${dataAtual}</small>`;

        listaComentarios.prepend(novoCard); // Insere sempre no topo da listagem
        document.getElementById("texto-comentario").value = ""; // Limpa a text area
    });
});



