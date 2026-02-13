const ProductModel = require("../model/product.model")

async function get(req, res) {
    try {
        const products = await ProductModel.get()
        res.writeHead(200, { 'content-type': 'application/json' })
        res.write(JSON.stringify(products))
        res.end()
    } catch (error) {
        console.log(error)
    }
}

async function getById(req, res) {
    try {
        const [, , , id] = req.url.split('/')
        const product = await ProductModel.getById(Number(id))
        if (!product) {
            res.writeHead(404, { 'content-type': 'application/json' })
            res.write(JSON.stringify({ message: 'not found any product' }))
            res.end()
        } else {
            res.writeHead(200, { 'content-type': 'application/json' })
            res.write(JSON.stringify(product))
            res.end()
        }
    } catch (error) {
        console.log(error)
    }
}

async function create(req, res) {
    try {
        await ProductModel.create({
            id: Date.now(),
            title: 'new product',
            category: 'man',
            price: 2_000_000,
            quantity: 1
        })
        res.writeHead(201, { 'content-type': 'application/json' })
        res.write(JSON.stringify({ message: 'product created !' }))
        res.end()
    } catch (error) {
        console.log(error)
    }
}

const ProductControllers = { get, getById, create }

module.exports = ProductControllers