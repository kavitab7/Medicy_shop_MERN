const express = require('express')
const dotenv = require("dotenv")
const routes = require("./routes/rout")
const morgan = require('morgan')
const connectDB = require('./config/db')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const path = require('path')
dotenv.config();

const app = express()

//db conn
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))

//routes
app.use('/api/v1/auth', routes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`

    );
});