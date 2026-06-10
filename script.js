const audio = document.getElementById("bgMusic");

if (audio) {

    document.addEventListener("click", () => {
        audio.play();
    }, { once: true });

    window.addEventListener("beforeunload", () => {
        localStorage.setItem("musicTime", audio.currentTime);
    });

    window.addEventListener("load", () => {

        const savedTime = localStorage.getItem("musicTime");

        if (savedTime) {
            audio.currentTime = parseFloat(savedTime);
        }

        audio.play().catch(() => { });
    });
}


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

if (abrir) {
    abrir.addEventListener("click", (e) => {
        e.preventDefault();

        document.getElementById("cartao")
            .classList.add("abrindo");

        setTimeout(() => {
            window.location.href = "carta.html";
        }, 800);
    });
}

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
                "https://formspree.io/f/xojzlddr",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        opiniao: opcao.value,
                        comentario: comentario
                    })
                }
            );

            if (resposta.ok) {

                alert("Resposta enviada 😄");

                document.getElementById("comentario").value = "";

                document
                    .querySelectorAll('input[name="opiniao"]')
                    .forEach(r => r.checked = false);

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