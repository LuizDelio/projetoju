const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/feedback", (req, res) => {

    const { opiniao, comentario } = req.body;

    let respostas = [];

    try {
        respostas = JSON.parse(
            fs.readFileSync("respostas.json")
        );
    } catch {
        respostas = [];
    }

    respostas.push({
        data: new Date().toLocaleString(),
        opiniao,
        comentario
    });

    fs.writeFileSync(
        "respostas.json",
        JSON.stringify(respostas, null, 2)
    );

    res.json({
        sucesso: true
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando");
});