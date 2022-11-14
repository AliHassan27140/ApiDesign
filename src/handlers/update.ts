import prisma from "../db"


export const getOneUpdate = async (req, res) => {
    const update = await prisma.update.findUnique({
        where: {
            id : req.params.id
        }
    })

    res.json({data: update})
}

export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            update: true
        }
    })

    const updates = products.reduce((allUpdates, product) =>{
        console.log('allUpdates: ',allUpdates);
        console.log('product: ',product.update);
        
        return [...allUpdates, ...product.update]
    }, [])
    res.json({data: updates})
}

export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })
    if(!product){
        res.status(404)
        res.send('Product not found')
        return
    }
    const update = await prisma.update.create({
        data: req.body
    })


    res.json({data: update})
}

export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            update: true
        }
    })
    const updates = products.reduce((allUpdates, product) =>{
        return [...allUpdates, ...product.update]
    }, [])

    const match = updates.find(update => update.id === req.params.id)
    if(!match){
        res.status(404)
        res.send('Update not found')
        return
    }
    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({data: updatedUpdate})

}


export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            update: true
        }
    })
    const updates = products.reduce((allUpdates, product) =>{
        return [...allUpdates, ...product.update]
    }, [])

    const match = updates.find(update => update.id === req.params.id)
    if(!match){
        res.status(404)
        res.send('Update not found')
        return
    }
    const deletedUpdate = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })
    res.json({data: deletedUpdate})

}
