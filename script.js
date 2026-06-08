/**
 * Includo Math - Sistema de Estado de Acessibilidade e Componentes Dinâmicos
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. GESTÃO DE ESTADO DE ACESSIBILIDADE (FONTE, CONTRASTE, LEITURA)
    // ==========================================================================
    let currentFontSize = 16;
    const bodyEl = document.body;

    // Botões de Acessibilidade
    const btnContrast = document.getElementById("btn-contrast");
    const btnFontIncrease = document.getElementById("btn-font-increase");
    const btnFontDecrease = document.getElementById("btn-font-decrease");
    const btnReaderMode = document.getElementById("btn-reader-mode");

    // Alternar Alto Contraste
    btnContrast.addEventListener("click", () => {
        bodyEl.classList.toggle("high-contrast");
    });

    // Alternar Modo Leitura Limpa
    btnReaderMode.addEventListener("click", () => {
        bodyEl.classList.toggle("reader-mode");
    });

    // Controle de Tamanho de Fonte Limpo (Range 12px a 24px)
    btnFontIncrease.addEventListener("click", () => {
        let novaFonte = currentFontSize + 2;
        if (novaFonte >= 12 && novaFonte <= 24) {
            currentFontSize = novaFonte;
            document.documentElement.style.setProperty('--font-base', `${currentFontSize}px`);
        }
    });

    btnFontDecrease.addEventListener("click", () => {
        let novaFonte = currentFontSize - 2;
        if (novaFonte >= 12 && novaFonte <= 24) {
            currentFontSize = novaFonte;
            document.documentElement.style.setProperty('--font-base', `${currentFontSize}px`);
        }
    });


    // ==========================================================================
    // 2. SIMULADOR EM TEMPO REAL DE PERFIS NEURODIVERGENTES (CADASTRO)
    // ==========================================================================
// ==========================================================================
    // 2. SIMULADOR EM TEMPO REAL DE PERFIS NEURODIVERGENTES (CADASTRO)
    // ==========================================================================
    const signupForm = document.getElementById("dynamic-signup-form");
    const selectProfile = document.getElementById("neuro-profile");
    const feedbackMessage = document.getElementById("demo-feedback-message");

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Opcional: Salva o perfil escolhido para lembrar dele depois
        const selectedValue = selectProfile.value;
        localStorage.setItem('perfilNeuro', selectedValue);
        
        // Feedback visual imediato antes de mudar de página
        feedbackMessage.style.display = "flex";
        feedbackMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Aguarda 1,5 segundos (1500 milissegundos) para o usuário ver o feedback e muda de página
        setTimeout(() => {
            window.location.href = "painel.html";
        }, 1500);
    });


    // ==========================================================================
    // 3. COMPONENTE 1: RENDERIZAÇÃO DO CARROSSEL VIA ARRAY DE OBJETOS
    // ==========================================================================
    const carrosselDados = [
        {
            titulo: "Geometria Visual Adaptada",
            descricao: "Adequado para alunos com TEA e TDAH. Cores limpas, formas isoladas e instruções diretas sem poluição visual ou enunciados ambíguos.",
            exemplo: "Calcule a área do quadrado verde ao lado sabendo que cada lado mede exatamente 4cm. Use o grid auxiliar."
        },
        {
            titulo: "Operações com Suporte Numérico Progressivo",
            descricao: "Perfeito para o tratamento pedagógico da Discalculia. Números e algarismos associados a barras de blocos lógicos estruturados digitais.",
            exemplo: "Se você juntar 3 blocos azuis com 5 blocos amarelos, quantos blocos teremos no total?"
        },
        {
            titulo: "Problemas com Frases de Comando Único",
            descricao: "Desenhado especificamente para facilitação de leitura (Dislexia). Fontes limpas de alta legibilidade com quebras de linha lógicas.",
            exemplo: "Pedro tem 10 maçãs.\nEle deu 4 maçãs para sua irmã.\nQuantas maçãs Pedro tem agora?"
        }
    ];

    const carouselContainer = document.getElementById("dynamic-carousel");

    // Injetar dados no HTML do Carrossel
    carrosselDados.forEach(item => {
        const itemHtml = `
            <div class="carousel-item">
                <div class="carousel-card">
                    <div class="carousel-item-content">
                        <h3>${item.titulo}</h3>
                        <p>${item.descricao}</p>
                    </div>
                    <div class="carousel-example-box">
                        <strong>Exemplo Prático na Plataforma:</strong>
                        <p>${item.exemplo}</p>
                    </div>
                </div>
            </div>
        `;
        carouselContainer.innerHTML += itemHtml;
    });

    // Lógica de Movimentação do Carrossel
    let currentIndex = 0;
    const nextBtn = document.getElementById("carousel-next");
    const prevBtn = document.getElementById("carousel-prev");

    function updateCarouselPosition() {
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
        if (currentIndex < carrosselDados.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Volta ao início
        }
        updateCarouselPosition();
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = carrosselDados.length - 1; // Vai ao final
        }
        updateCarouselPosition();
    });


    // ==========================================================================
    // 4. COMPONENTE 2: RENDERIZAÇÃO DO ACORDEÃO (FAQ) VIA ARRAY DE OBJETOS
    // ==========================================================================
    const faqDados = [
        {
            pergunta: "Como o site se ajusta automaticamente após o login?",
            resposta: "Ao se cadastrar, o estudante ou professor indica as necessidades específicas (ex: TDAH, Dislexia, Baixa Visão). Imediatamente, nossa folha de estilos reconfigura o contraste, tamanho padrão de fontes, espaçamento entre linhas e elimina distrações visuais da tela de matemática."
        },
        {
            pergunta: "A plataforma cobre quais matérias escolares?",
            resposta: "Atualmente, a plataforma foca exclusivamente na matéria de Matemática, oferecendo atividades estruturadas do ensino fundamental ao médio de forma simplificada e direta."
        },
        {
            pergunta: "Como os professores acompanham e criam os exercícios?",
            resposta: "Os professores possuem um painel exclusivo onde conseguem recomendar tarefas padrão ou customizar novos enunciados de matemática, definindo o nível de suporte visual necessário para cada grupo de alunos especiais."
        }
    ];

    const accordionContainer = document.getElementById("dynamic-accordion");

    // Injetar dados no FAQ
    faqDados.forEach((item, index) => {
        const faqHtml = `
            <div class="faq-item">
                <button class="faq-trigger" data-index="${index}" aria-expanded="false">
                    <span>${item.pergunta}</span>
                    <i class="fa-solid fa-chevron-down faq-icon-state"></i>
                </button>
                <div class="faq-content">
                    <div class="faq-content-inner">
                        <p>${item.resposta}</p>
                    </div>
                </div>
            </div>
        `;
        accordionContainer.innerHTML += faqHtml;
    });

    // Lógica de Ativação do Acordeão
    const triggers = document.querySelectorAll(".faq-trigger");

    triggers.forEach(trigger => {
        trigger.addEventListener("click", function() {
            const parent = this.parentElement;
            const content = this.nextElementSibling;
            const isOpen = parent.classList.contains("active");

            // Fecha todos os outros abertos antes
            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".faq-content").style.maxHeight = null;
                item.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
            });

            if (!isOpen) {
                parent.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
                this.setAttribute("aria-expanded", "true");
            }
        });
    });
});