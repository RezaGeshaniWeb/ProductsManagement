const products = require('./../data/products.json')

async function get() {
    return new Promise((res, rej) => res(products))
}

async function getById(id) {
    return new Promise((res, rej) => res(products.find(p => p.id == id)))
}

async function create(product) {
    return new Promise((res, rej) => {
        products.push(product)
        res()
    })
}

const ProductModel = { get, getById, create }

module.exports = ProductModel