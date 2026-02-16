const products = require('./../data/products.json')
const fs = require('fs')

async function get() {
    return new Promise((res, rej) => res(products))
}

async function getById(id) {
    return new Promise((res, rej) => res(products.find(p => p.id == id)))
}

async function create(product) {
    return new Promise((res, rej) => {
        products.push(product)
        fs.writeFile(`${process.cwd()}/data/products.json`, JSON.stringify(products), err => {
            if (err) rej(err)
            else res({ message: 'new product created !', data: product })
        })
    })
}

async function update(id, payload) {
    return new Promise((res, rej) => {
        products.map(p => {
            if (p.id == id) {
                Object.assign(p, payload)
            }
            return p
        })

        fs.writeFile(`${process.cwd()}/data/products.json`, JSON.stringify(products), err => {
            if (err) rej(err)
            else res({ message: 'product updated !' })
        })
    })
}

const ProductModel = { get, getById, create, update }

module.exports = ProductModel