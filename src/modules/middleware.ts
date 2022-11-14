import { validationResult } from "express-validator"



export const handleInputError = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        // 400 is the status code for bad request
        res.status(400)
        res.json({errors: errors.array()})
    }
    else{
        next()
    }
}