document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;

    try {
        const resposta = await fetch("http://localhost:3000/auth", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        console.log("Status:", resposta.status);

        let dados;
        try {
            dados = await resposta.json();
        } catch {
            dados = {};
        }

        if (resposta.ok) {
            alert("Login realizado!");
            window.location.href = "Site.html";
        } else {
            alert(dados.erro || "Erro no login");
        }
    } catch (erro) {
        console.error(erro);
        alert("Erro ao conectar ao servidor.");
    }
});
