import express from 'express'
import cors from 'cors'
import bookstore from './routes/books.js'

const app = express()
app.use(express.json())
app.use(cors({origin:'*'}))

app.use('/books', bookstore )

//for only health check 
app.get('/', (req, res)=>res.json({status:'healthy'}));

const PORT =4000
app.listen(PORT, ()=>console.log(`backend is running on ${PORT}`) );
