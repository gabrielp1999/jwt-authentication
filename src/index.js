const express = require("express")
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send({message: "Api ok"})
})

app.get("/clientes", (req, res) => {
    const customers = [
        { id:3, name: "Souza"},
        { id:7, name: "Edilson"}
    ]
    res.status(200).send(customers);
})


app.post("/login", (req, res) => {
    const { user, password } = req.body;
    if(user === "Souza" && password === "92024080"){
        return res.end();
    }

    return res.status(401).end();
})

app.listen(3001, () => console.log("Server Running 3001"))
