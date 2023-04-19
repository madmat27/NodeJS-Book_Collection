import express from 'express'
import { engine } from 'express-handlebars'
import { router } from './routes.mjs'


const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}))
app.engine('hbs', engine({ extname: ".hbs"}))
app.set('view engine', 'hbs')

app.use("/", router)

app.use((req,res) => {
    res.redirect("/books")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => { console.log("Application started at port " + PORT)} ) 
// server listens to port 3000
