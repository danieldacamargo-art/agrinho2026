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
    document.getElementById("btn-