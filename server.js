import express from 'express'
import  dotenv  from'dotenv'
import cors from 'cors'
import connectDB from './config/db.js';
import userRoutes from "./routes/userRoutes.js"
 
dotenv.config()

connectDB()

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running......')
})

app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }
