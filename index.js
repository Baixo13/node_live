const express = require('express');
const http = require('http');
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT

//Routes
const productRoutes = require("./routes/products")

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

//Routes
const prefix = "/api/v1/"
app.use(prefix,productRoutes);

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`El servidor esta en el puerto ${PORT}`);
});