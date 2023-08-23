const { default: slugify } = require('slugify')
const categoryModel = require('../models/categoryModel')

const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: 'Name is required' })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category Already Exisits'
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(200).send({
            success: true,
            message: 'new category created',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error is category',
        });
    }
}

const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) },
            { new: true });
        res.status(200).send({
            success: true,
            message: 'category is updated',
            category,
        });
    } catch (error) {
        console.log(error)
        req.send(500).send({
            success: false,
            error,
            message: 'error while updating category',
        })
    }

}
const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: 'All categories :',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: ' error while getting all categories',
        });
    }
};


const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: 'Get single category successfully',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: ' error while getting single category',
        });
    }
};


const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: ' category deleted successfully',

        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: ' error while deleting category',
        });
    }
};

module.exports = { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController }