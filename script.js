const audio = document.getElementById("bgMusic");

// começa a tocar após interação
document.addEventListener("click", () => {
    audio.play();
}, { once: true });

// salva o tempo antes de sair
window.addEventListener("beforeunload", () => {
    localStorage.setItem("musicTime", audio.currentTime);
});

window.addEventListener("load", () => {
    const audio = document.getElementById("bgMusic");

    const savedTime = localStorage.getItem("musicTime");

    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    audio.play();
});



const text = document.querySelector("#cartaMsg");
const ass = document.querySelector("#assi");
const ponyo = document.querySelector("#ponyoCarta");

window.onload = () => {
    if (text) {
        text.style.opacity = 0;

        setTimeout(() => {
            text.style.transition = "2s";
            text.style.opacity = 1;
        }, 300);
    }

    if (ass) {
        ass.style.opacity = 0;

        setTimeout(() => {
            ass.style.transition = "5s";
            ass.style.opacity = 1;
        }, 800);
    }
    if (ponyo) {
        ponyo.style.opacity = 0;

        setTimeout(() => {
            ponyo.style.transition = "5s";
            ponyo.style.opacity = 1;
        }, 800)

    }
};

const abrir = document.getElementById("abrirCarta");

abrir.addEventListener("click", (e) => {
    e.preventDefault();

    document.getElementById("cartao")
        .classList.add("abrindo");

    setTimeout(() => {
        window.location.href = "carta.html";
    }, 800);
});

const enviar = document.getElementById("enviar");

if (enviar) {

    enviar.addEventListener("click", async () => {

        const opcao =
            document.querySelector(
                'input[name="opiniao"]:checked'
            );

        const comentario =
            document.getElementById("comentario").value;

        if (!opcao) {
            alert("Escolha uma opção.");
            return;
        }

        try {

            const resposta = await fetch(
                "/feedback",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        opiniao: opcao.value,
                        comentario
                    })
                }
            );

            if (resposta.ok) {

                alert(
                    "Resposta enviada 😄"
                );

            } else {

                alert(
                    "Erro ao enviar."
                );

            }

        } catch {

            alert(
                "Falha na conexão."
            );

        }

    });

}