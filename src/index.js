const express = require("express")
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send({message: "Api ok"})
})

app.listen(3001, () => console.log("Server Running 3001"))