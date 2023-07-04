const ProductModel = require("./../models/Product");
const addProductValidator = require("./../validators/products/addProduct");

exports.getAll = async (req , res) => {
    const products = await ProductModel.find({}).lean()
    if(products){
        res.status(200).send(products)
    }else {
        res.status(400).send({ message : "something went wrong!!"})
    }
}
exports.getOne = async (req, res) => {
    const { productId } = req.params 
    const product = await ProductModel.findById(productId)

    if(product){
        res.status(200).send(product)
    }else {
        res.status(404).send({ message : "product not found"})
    }
}
exports.addOne = (req, res) => {
    const { title, name, discription, price, color, size } = req.body;
    const validationResult = addProductValidator({
        title,
        name,
        discription,
        price,
        color,
        size,
    });

    if (validationResult !== true) {
        return res.status(422).send({ message: "invalid data" });
    }

    ProductModel.create({
        title,
        name,
        discription,
        price,
        color,
        size,
    });

    res.status(201).send({ message: "product created" });
};
exports.updateOne = async (req, res) => {
    const { productId } = req.params;
    const { title, name, discription, price, color, size } = req.body;

    const validationResult = addProductValidator({
        title,
        name,
        discription,
        price,
        color,
        size,
    })

    if(validationResult !== true) {
        return res.status(422).send({ message: "invalid data" });
    }
    const product = await ProductModel.findByIdAndUpdate(productId, {
        $set: {
            title,
            name,
            discription,
            price,
            color,
            size
        },
    });

    if(product) {
        res.status(201).send({ message : `${product.name} informations has changed`})
    }else {
        res.status(402).send({ message : "prduct not found"})
    }
};
exports.removeOne = async (req, res) => {
    const { productId } = req.params

    const product = await ProductModel.findByIdAndDelete(productId)

    if(product) {
        res.status(200).send({ message : `${product.name} has deleted`})
    }else {
        res.status(402).send({ message : "prduct not found"})
    }
};
