const db= require("../database/db.json")

const getProducts = (req, res) => {
    return res.json(db);
}

const getProductById = (req, res) => {
    const id = req.params.id;
    const filteredProducts = db.filter((product) => product.id === id)
    if (filteredProducts.length > 0) {
        return res.status(200).json({
            product: filteredProducts[0].name,
            success: "Producto encontrado con éxito"
        });
    } else {
        return res.status(404).json({
            error: "Producto no encontrado"
        })
    }
}

const getProductByName = (req, res) => {
    const name = req.params.name;
    const filteredProducts = db.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()))
    if (filteredProducts.length > 0) {
        return res.status(200).json(
            filteredProducts
        );
    } else {
        return res.status(404).json({
            error: "Producto no encontrado"
        })
    }
}

const postProduct = (req, res) => {
    const ids = db.map(product => product.id)
    const id = Math.max(...ids) + 1
    const name = req.body.name
    const filteredProducts = db.filter((product) => product.name.toLowerCase() === name.toLowerCase())

    if (filteredProducts.length > 0) {
        return res.status(400).json({
            error: "Producto ya existe"
        })
    } else if (name === "") {
        return res.status(400).json({
            error: "No se admiten nombres vacíos"
        })
    } else {
        db.push({
            id: id,
            name: name
        })
        return res.status(201).json({
            id: id,
            name: name,
            succes: "Producto creado con éxito"
        })
    }
}

const patchProductById = (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = db.findIndex((product) => product.id === id)
    const name = req.body.name

    if (productIndex > -1) {
        const currentName = db[productIndex].name
        db.splice(productIndex, 1, {
            id: id,
            name: name
        })
        return res.status(201).json({
            id: id,
            name: name,
            succes: `Producto ${id} cambia de ${currentName} a ${name}`
        })
    } else if (id === "") {
        return res.status(400).json({
            error: "No se admiten ids vacíos"
        })
    } else {
        return res.status(400).json({
            error: "Producto no existe"
        })
    }
}

const deleteProductById = ('/product/:id', (req, res) => {
    return res.status(200)
}

module.exports = {
    getProducts,
    getProductById,
    getProductByName,
    postProduct,
    patchProductById,
    deleteProductById
}