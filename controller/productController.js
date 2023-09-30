const { default: slugify } = require('slugify');
const productModel = require('../models/productModel')
const orderModel = require('../models/orderModel')
const fs = require('fs');
const { error } = require('console');
const categoryModel = require('../models/categoryModel')
const braintree = require("braintree");
const dotenv = require("dotenv");
const mongoose = require('mongoose')
dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' })
            case !description:
                return res.status(500).send({ error: 'description is required' })
            case !price:
                return res.status(500).send({ error: 'price is required' })
            case !category:
                return res.status(500).send({ error: 'category is required' })
            case !quantity:
                return res.status(500).send({ error: 'quantity is required' })
            case photo:
                return res.status(500).send({ error: 'photo is required and size should be less than 1 mb' })
        }
        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "product creates successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: " error in creating product",
            error,
        })
    }
}


const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            count: products.length,
            message: 'All products :',
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: ' error while getting all products',
        });
    }
};

const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate('category');

        res.status(200).send({
            success: true,

            message: 'single product got :',
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: ' error while getting single product',
        });
    }
};

const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: ' error while getting single product',
        });
    }
}


const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");

        res.status(200).send({
            success: true,

            message: 'product deleted successfully :',

        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: ' error while getting deleting product',
        });
    }
};


const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' })
            case !description:
                return res.status(500).send({ error: 'description is required' })
            case !price:
                return res.status(500).send({ error: 'price is required' })
            case !category:
                return res.status(500).send({ error: 'category is required' })
            case !quantity:
                return res.status(500).send({ error: 'quantity is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'photo is required and size should be less than 1 mb' })
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid, {
            ...req.fields, slug: slugify(name)
        }, { new: true }
        )
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "product updated successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: " error in updating product",
            error,
        })
    }
}
// filters
const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Filtering Products",
            error,
        });
    }
};
const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total,
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: " error in product count",
            error,
        })
    }
}
const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: " error in product list",
            error,
        })
    }
}

//search product
const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const resutls = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        })
            .select("-photo");
        res.json(resutls);

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: " error in product list",
            error,
        })
    }
}

//for related products
const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel.find({
            category: cid, _id: { $ne: pid }
        }).select("-photo").limit(3).populate("category")
        res.status(200).send({
            success: true,
            products,
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: " error in similar products ",
            error,
        })
    }
}

//for get products by cate
const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate("category");

        res.status(200).send({
            success: true,
            category,
            products,
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: " error in category products ",
            error,
        })
    }
}

//token of payment
const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(200).send(err);
            } else {
                res.send(response);
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// payment
const brainTreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id
                    }).save()
                    res.json({ ok: true })
                } else {
                    res.status(500).send(error)
                }
            }
        )
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    createProductController, getProductController, getSingleProductController,
    productPhotoController, deleteProductController, updateProductController,
    productFiltersController, productCountController, productListController,
    searchProductController, relatedProductController, productCategoryController,
    braintreeTokenController, brainTreePaymentController
}