const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const db = require("./models");
const authMiddleware = require("./middlewares/auth.middlewares");


const app = express();
app.use(cors());
app.use(express.json());


app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use(authMiddleware);


const PORT = 3000;

async function startServer() {
    try{
        await db.sequelize.authenticate();
        console.log('banco conectado');

        await db.sequelize.sync({alter: true });

        app.listen(PORT, ()=>{
            console.log(`Servidor rodando na porta http://localhost:${PORT}`)
        });
    }catch (error) {
        console.log('erro ao conectar no banco', error);
    }
}
startServer();

app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
    db.query(sql, [email, senha], (err, result) => {
        if (err) return res.status(500).json({ erro: "Erro no servidor" });

        if (result.length > 0) {
            res.json({ mensagem: "Login OK" });
        } else {
            res.status(401).json({ erro: "Email ou senha incorretos" });
        }
    });
});
