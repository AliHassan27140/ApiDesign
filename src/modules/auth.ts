import jwt from 'jsonwebtoken'
//bcrypt is used to hash passwords 
//and compare them to the hashed password in the database
//bcrypt is a one way encryption
//meaning that the hashed password cannot be decrypted
//to get the original password
import bcrypt from 'bcrypt'

export const comparePassword =  (password, hash) => {
    return  bcrypt.compare(password, hash)
}

export const hashPassword =  (password) => {
    return  bcrypt.hash(password, 5)
    // 10 is the number of rounds
    // the more rounds the more secure the password
    // but the more time it takes to hash the password
    // salt is a random string that is added to the password
}

export const createJWT = (user) => {
    const token = jwt.sign({id: user.id, username: user.name},
        process.env.JWT_SECRET,
        )
        return token 
}

export const protect = (req, res, next) => {
    //header are the things that are coming from the client
    //to the server
    //Authorization: Bearer <token>
    //header includes the token, cache, etc and lot of other things
    const bearer = req.headers.authorization

    if(!bearer){
        res.status(401)
        res.send('not authorized')
        return
    }
    // console.log("bearer: ",bearer);
    
    const [, token] = bearer.split(' ');

    if(!token){
        res.status(401)
        res.send('Token not found')
        return
    }
//this try catch is going to catch the error if the token is not valid
//if the token is not valid, it will throw an error
//and if we not use try catch, the server will crash
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
       //user is the payload that we passed to the createJWT function
       //user = {id: user.id, username: user.name}
       //we are adding the user to the request object
         //so that we can use it in the routes
        req.user = user
        next()
    } catch (error) {
        console.error(error); 
        res.status(401)
        res.send('Token not valid')
        return
    }

}