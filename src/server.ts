import express from 'express';
import router  from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';
const app = express()
//cors is a middleware that allows us to make
//requests from the frontend to the backend
app.use(cors())
// This morgan is a middleware that is going to.. 
// log all the requests that are coming to the server  
app.use(morgan('dev'))
// This is going to parse the body of the request
app.use(express.json())
// This is going to parse the urlencoded data 
// that is allowing the user to query string like
// google.com?name=John&age=20
app.use(express.urlencoded({ extended: true }))

//my first middleware
//now req.hello = 'hello' is available in all the routes
//that are registered after this middleware
// app.use((req, res, next) => {
//     res.status(401)
//     res.send('nope')
//     next()
// })

app.get('/',(req, res, next)=>{
    res.json({message: "Congratulation: Server is now live"})
})

app.use("/api",protect, router)
app.post('/user', createNewUser)
app.post('/signin', signin)

app.use((err, req, res, next) => {
    if (err.type === "auth") {
      res.status(401).json({ message: "unauthorized" });
    }
    else if(err.type === "input"){
        res.status(400 ).json({ message:"invalid input"})
    } else {
        res.status(500).json({ message: "something went wrong" });
        }

  });

export default app;