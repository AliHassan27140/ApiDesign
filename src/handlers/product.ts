import prisma from "../db"

//Get all products from the database
export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })

    res.json({data: user.products})
}

//Get a single product from the database
export const getOneProduct = async (req, res) => {
    // const id = req.params.id
    console.log('req.id: ',req.params.id);
    console.log('req.user.id: ',req.user.id);
    
    const product = await prisma.product.findFirst({
        where: {
            id: req.params.id,
            belongsToId: req.user.id
        }
    })

    res.json ({data: product})
}

//Create a new product
export const createProduct = async (req, res, next) => {
    try{

        const product = await prisma.product.create({
            data:{
                name: req.body.name,
                belongsToId: req.user.id
            }
        })
    
        res.json({data: product})
    } catch(error){
        console.log('error: ',error);
        next(error);
    }
}

//Update a product
export const updateProduct = async (req, res) => {
    const id = req.params.id
      const updated = await prisma.product.update({
        //where is used to find the product to update
        where: {
            id,
            id_belongsToId: req.user.id
        },
        //data is used to update the product with the new data
        data: {
            name: req.body.name
        }
    })

    res.json({data: updated})
}

//Delete a product
export const deleteProduct = async (req, res) => {
    // const id = req.params.id
    const deleted = await prisma.product.delete({
        where: {
            id: req.params.id,
            id_belongsToId: req.user.id
    },
    })

    res.json({data: deleted})
}