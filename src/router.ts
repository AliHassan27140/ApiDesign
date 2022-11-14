import {Router} from 'express'
import {body, oneOf, validationResult} from 'express-validator'
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product'
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update'
import { handleInputError } from './modules/middleware'

const router = Router()
//get is used to get data from the server
//get parameters are the url and the callback function
router.get('/product', getProducts)
//:id is a parameter(route parameter)
router.get('/product/:id', getOneProduct)
//put is used to update a resource
router.put('/product/:id',body('name').isString(),handleInputError ,(req, res) => { })
//post is used to create a resource
router.post('/product',body('name').isString(),handleInputError , createProduct)
router.delete('/product/:id', deleteProduct)

/**
 * Update 
 */
 router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id',
    body('title').optional(),
    body('body').optional(), 
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(),
    updateUpdate)
router.post('/update', 
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate)
router.delete('/update/:id', deleteUpdate)

/**
 * Update point
 * 
 */
 router.get('/updatepoint', () => {})
 router.get('/updatepoint/:id', () => {})
 router.put('/updatepoint/:id',
    body('name').optional, 
    body('description').optional().isString() ,
 () => {}
 )
 router.post('/updatepoint', 
    body('name').optional, 
    body('description').optional().isString(),
    body('updateId').exists().isString(),   
    () => {}
)
 router.delete('/updatepoint/:id', () => {})

 router.use((error, req, res, next) => {
    console.log('error: ',error);
    res.status(500).json({error: "Something went wrong in router"})
 })

 export default router