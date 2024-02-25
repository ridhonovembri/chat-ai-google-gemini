const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const appRoutes = require('./routes/AppRoutes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({ origin: "*" }))
app.use(appRoutes)

app.get('/', (req, res) => {
  res.status(200).send('Hi Vercel...!!')
})

dotenv.config()

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server is running ${port}`);
})
