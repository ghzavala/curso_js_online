const express = require('express')
const easyDB = require('easydb-io')

const server = express()

const docs = express.static(__dirname + "/docs")
const urlencoded = express.urlencoded({extended: true}) // convierte de FormData a Object
const json = express.json() // Convierte de JSON a Object

const baseDeProductos = easyDB({
    database: '32ffbbfd-1f9f-4015-afe5-2594bdd8a845',
    token: '11060569-9681-4360-bdf0-b2f1354e8b53'
})

server.use(docs) // que es lo que va a mostrar por defecto
server.use(urlencoded)
server.use(json)

server.listen(2000)

server.post("/agregar", async function(request, response){
    
    // Acá se colocan las comprobaciones de datos antes de guardarlos

    const ID = Math.random().toString(36).slice(2) // ej: "xfjlpmo7vli"
    
    await baseDeProductos.put( ID, request.body )
    
    response.end("Mirá la consola...")
})

server.get("/mostrar", async (req, res) => {
    
    const productos = await baseDeProductos.list()
    res.json(productos);

})
