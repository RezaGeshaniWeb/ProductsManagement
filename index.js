const http = require('http')
const ProductsControllers = require('./controllers/product.controllers')
const PORT = 3000

const server = http.createServer((req, res) => {
    if (req.url == '/api/products' && req.method == 'GET') {
        ProductsControllers.get(req, res)
    } else if (req.url.match(/\/api\/products\/[0-9]+/) && req.method == 'GET') {
        ProductsControllers.getById(req, res)
    }
    else if (req.url == '/api/products' && req.method == 'POST') {
        ProductsControllers.create(req, res)
    } else {
        res.writeHead(404, { 'content-type': 'application/json' })
        res.write(JSON.stringify({ message: 'route not found' }))
        res.end()
    }
})

server.listen(PORT, () => console.log(`http://localhost:${PORT}`))