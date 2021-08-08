const express = require("express");
const router = express.Router();

router.post("/product", postProduct);
router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.patch("/product/:id", patchProductById);
router.delete("/product/:id", deleteProductById);

module.exports = router;