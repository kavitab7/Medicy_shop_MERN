const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.ObjectId,
            ref: "Products",
        },
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: "user",
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "delivered", "cancel"],
    },
},
    { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);