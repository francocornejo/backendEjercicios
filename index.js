const express = require('express')
const app = express()
const puerto = 8080
const productos = require('./productos.txt')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/productos', (req, res) => {
    res.json(productos)
})

app.get('/productos/:id', (req, res) =>{
    const id = Number(req.params.id)

    if(isNaN(id)) {
        res.status(400).json({ error: "El parámetro no es un número" })
        return
    }

    const product = productos.filter(producto => {
        return producto.id === id
    })

    if(!product.length) {
        res.status(404).send({ error: "El contenido que solicito no existe" })
        return
    }
    res.status(200).json(product)
})

app.listen(puerto, err => {
    if(err) {
        console.log(`Hubo un error al inciar el servidor ${err}`)
    } else {
        console.log(`Servidor escuchando el puerto: ${puerto}`)
    }
})

