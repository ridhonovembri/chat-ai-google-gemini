const express = require("express")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const ai = require("./controllers/index")
const cors = require('cors')


dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors({
    credentials: true,
    origin: '*'
}));

app.post("/response", ai.generateResponse)
app.post("/chat", ai.generateChat)


const port = process.env.PORT

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
