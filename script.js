/**
 * Includo Math - Sistema de Estado de Acessibilidade e Componentes Dinâmicos
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. GESTÃO DE ESTADO DE ACESSIBILIDADE (FONTE, CONTRASTE, LEITURA)
    // ==========================================================================
    let currentFontSize = 16;
    const bodyEl = document.body;

    const btnContrast = document.getElementById("btn-contrast");
    const btnFontIncrease = document.getElementById("btn-font-increase");
    const btnFontDecrease = document.getElementById("btn-font-decrease");
    const btnReaderMode = document.getElementById("btn-reader-mode");

    if (btnContrast) {
        btnContrast.addEventListener("click", () => {
            bodyEl.classList.toggle("high-contrast");
        });
    }

    if (btnReaderMode) {
        btnReaderMode.addEventListener("click", () => {
            bodyEl.classList.toggle("reader-mode");
        });
    }

    if (btnFontIncrease) {
        btnFontIncrease.addEventListener("click", () => {
            let novaFonte = currentFontSize + 2;
            if (novaFonte >= 12 && novaFonte <= 24) {
                currentFontSize = novaFonte;
                document.documentElement.style.setProperty('--font-base', `${currentFontSize}px`);
            }
        });
    }

    if (btnFontDecrease) {
        btnFontDecrease.addEventListener("click", () => {
            let novaFonte = currentFontSize - 2;
            if (novaFonte >= 12 && novaFonte <= 24) {
                currentFontSize = novaFonte;
                document.documentElement.style.setProperty('--font-base', `${currentFontSize}px`);
            }
        });
    }

    // ==========================================================================
    // 2. CONTROLE DE ACESSO E ADAPTAÇÃO POR NEURODIVERGÊNCIA
    // ==========================================================================
    const signupForm = document.getElementById("dynamic-signup-form");
    const selectProfile = document.getElementById("neuro-profile");
    const selectRole = document.getElementById("user-role"); 
    const feedbackMessage = document.getElementById("demo-feedback-message");
    const bodyEl = document.body;

    // Ação ao enviar o formulário na index.html
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const selectedProfile = selectProfile.value;
            const selectedRole = selectRole.value;
            
            // Salva as escolhas do usuário
            localStorage.setItem('perfilNeuro', selectedProfile);
            localStorage.setItem('cargoUsuario', selectedRole);
            
            if (feedbackMessage) {
                feedbackMessage.style.display = "flex";
                feedbackMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            // Redireciona para o painel adaptado
            setTimeout(() => {
                window.location.href = "painel.html";
            }, 1500);
        });
    }

    // APLICAÇÃO AUTOMÁTICA DA ADAPTAÇÃO COGNITIVA (Executa em todas as páginas)
    const perfilSalvo = localStorage.getItem('perfilNeuro');
    
    if (perfilSalvo) {
        // Limpa classes antigas de perfil para não acumular
        bodyEl.classList.remove('profile-tea', 'profile-tdah', 'profile-discalculia', 'profile-dislexia');
        
        // Adiciona a classe do perfil atual (ex: profile-tdah)
        bodyEl.classList.add(`profile-${perfilSalvo}`);
        
        // Opcional: Atualiza o select da index para mostrar o que já estava salvo
        if (selectProfile) {
            selectProfile.value = perfilSalvo;
        }
    }

    // LÓGICA DE EXIBIÇÃO DO PAINEL (PROFESSOR / ALUNO)
    const areaProfessor = document.getElementById("area-professor");
    const areaAluno = document.getElementById("area-aluno");

    if (areaProfessor || areaAluno) {
        const cargoSalvo = localStorage.getItem('cargoUsuario');

        if (cargoSalvo === "professor") {
            if (areaProfessor) areaProfessor.style.display = "block";
            if (areaAluno) areaAluno.style.display = "none";
        } else {
            if (areaProfessor) areaProfessor.style.display = "none";
            if (areaAluno) areaAluno.style.display = "block";
        }
    }
    
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

    if (carouselContainer) {
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

        let currentIndex = 0;
        const nextBtn = document.getElementById("carousel-next");
        const prevBtn = document.getElementById("carousel-prev");

        function updateCarouselPosition() {
            carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener("click", () => {
                if (currentIndex < carrosselDados.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateCarouselPosition();
            });

            prevBtn.addEventListener("click", () => {
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = carrosselDados.length - 1;
                }
                updateCarouselPosition();
            });
        }
    }


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

    if (accordionContainer) {
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

        const triggers = document.querySelectorAll(".faq-trigger");

        triggers.forEach(trigger => {
            trigger.addEventListener("click", function() {
                const parent = this.parentElement;
                const content = this.nextElementSibling;
                const isOpen = parent.classList.contains("active");

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
    }
});