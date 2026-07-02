document.addEventListener("DOMContentLoaded", () => {
    inicializarCronometro();
    inicializarCriacaoDePosts();
    inicializarInteracoesDoFeed();
    inicializarEnquetes();
});

function inicializarCronometro() {
    const dataCopa = new Date("June 11, 2026 00:00:00").getTime();
    const elementoContador = document.getElementById("contador-tempo");

    if (!elementoContador) return;

    function atualizarTempo() {
        const agora = new Date().getTime();
        const diferenca = dataCopa - agora;

        if (diferenca < 0) {
            elementoContador.innerHTML = "A COPA COMEÇOU! ⚽";
            return;
        }

        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        elementoContador.innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }

    setInterval(atualizarTempo, 1000);
    atualizarTempo();
}

function inicializarCriacaoDePosts() {
    const btnPublicar = document.getElementById("btn-publicar");
    const feed = document.getElementById("feed-posts");

    if (!btnPublicar || !feed) return;

    btnPublicar.addEventListener("click", () => {
        const textoInput = document.getElementById("novo-post-texto").value;
        const urlInput = document.getElementById("novo-post-url").value;

        if (textoInput.trim() === "") {
            alert("Por favor, escreva uma legenda para o seu post!");
            return;
        }

        const imagemUrl = urlInput.trim() !== "" ? urlInput : "https://unsplash.com";

        const novoPostCard = document.createElement("div");
        novoPostCard.classList.add("post-card");
        novoPostCard.innerHTML = `
            <div class="post-imagem">
                <img src="${imagemUrl}" alt="Post do Usuário">
            </div>
            <div class="post-texto">
                ${textoInput}
            </div>
            <div class="botoes-interacao">
                <button class="btn btn-curtir">❤️ Curtir (<span class="num-curtidas">0</span>)</button>
                <button class="btn btn-comentar">💬 Comentar</button>
                <button class="btn btn-salvar">💾 Salvar</button>
                <button class="btn btn-repostar">🔄 Repostar</button>
            </div>
            <div class="comentarios-area">
                <input type="text" placeholder="Escreva um comentário...">
                <button class="btn-enviar">Enviar</button>
                <div class="lista-comentarios"></div>
            </div>
        `;

        feed.insertBefore(novoPostCard, feed.firstChild);
        document.getElementById("novo-post-texto").value = "";
        document.getElementById("novo-post-url").value = "";
    });
}

function inicializarInteracoesDoFeed() {
    const feed = document.getElementById("feed-posts");
    if (!feed) return;

    feed.addEventListener("click", (event) => {
        const alvo = event.target;

        if (alvo.classList.contains("btn-curtir")) {
            const numSpan = alvo.querySelector(".num-curtidas");
            let curtidasAtuais = parseInt(numSpan.textContent);

            alvo.classList.toggle("curtido");

            if (alvo.classList.contains("curtido")) {
                numSpan.textContent = curtidasAtuais + 1;
                alvo.childNodes[0].textContent = "❤️ Curtido (";
            } else {
                numSpan.textContent = curtidasAtuais - 1;
                alvo.childNodes[0].textContent = "❤️ Curtir (";
            }
        }

        if (alvo.classList.contains("btn-comentar")) {
            const card = alvo.closest(".post-card");
            const areaComentarios = card.querySelector(".comentarios-area");
            areaComentarios.style.display = areaComentarios.style.display === "block" ? "none" : "block";
        }

        if (alvo.classList.contains("btn-enviar")) {
            const areaComentarios = alvo.closest(".comentarios-area");
            const input = areaComentarios.querySelector("input");
            const lista = areaComentarios.querySelector(".lista-comentarios");

            if (input.value.trim() !== "") {
                const novoComentario = document.createElement("p");
                novoComentario.style.margin = "5px 0";
                novoComentario.innerHTML = `<strong>Você:</strong> ${input.value}`;
                lista.appendChild(novoComentario);
                input.value = "";
            }
        }

        if (alvo.classList.contains("btn-salvar")) {
            alert("Post salvo na sua coleção! 💾");
        }

        if (alvo.classList.contains("btn-repostar")) {
            alert("Post compartilhado no seu perfil! 🔄");
        }
    });
}

function inicializarEnquetes() {
    document.querySelectorAll(".opcao-btn-larga").forEach(botao => {
        botao.addEventListener("click", () => {
            const enquete = botao.closest(".enquete");
            const resultadoDiv = enquete.querySelector(".resultado");
            const votoSelecionado = botao.getAttribute("data-voto");
            
            resultadoDiv.innerHTML = `🎉 Voto computado: ${votoSelecionado}`;
        });
    });
}
