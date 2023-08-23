const express = require('express')
const dotenv = require("dotenv")
const routes = require("./routes/rout")
const morgan = require('morgan')
const connectDB = require('./config/db')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
dotenv.config();

const app = express()

//db conn
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use('/api/v1/auth', routes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`

    );
});