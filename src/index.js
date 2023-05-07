const express = require("express")
const app = express();
const jwt = require("jsonwebtoken");
const { secret } = require("./config/config");

app.use(express.json());

app.get("/", (req, res) => {
    res.send({message: "Api ok"});
})

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    jwt.verify(token, secret, (err, decoded) => {
        if(err){
            return res.status(401).end();
        }
        req.userId = decoded.userId;
        next();
    });
}


app.get("/clientes", verifyToken ,(req, res) => {
    console.log(req.userId + "fez a chamada");
    const customers = [
        { id:3, name: "Souza"},
        { id:7, name: "Edilson"}
    ]
    res.status(200).send(customers);
})


app.post("/login", (req, res) => {
    const { user, password } = req.body;
    if(user === "Souza" && password === "92024080"){
        const token = jwt.sign({userId: 3},secret , { expiresIn: 300 });
        return res.send({ auth: true, token });
    }

    return res.status(401).end();
})

app.post("/logout", (req, res) => {
    res.end();
})

app.listen(3001, () => console.log("Server Running 3001"))
