import asyncHandler from "../middleware/asyncHandler.js";
import Cart from "../models/cartModel.js";
import Product from '../models/productModel.js';


// @desc    Get logged in user's cart
// @route   GET /api/v1/cart
// @access  Private

const getCart = asyncHandler(async (req, res) => {

    let cart = await Cart.findOne({
        user: req.user._id,
    });

    if (!cart) {

        cart = await Cart.create({
            user: req.user._id,
            cartItems: [],
        });

    }

    res.json(cart);

});



// @desc    Add item to cart
// @route   POST /api/v1/cart
// @access  Private

const addToCart = asyncHandler(async (req, res) => {

    const { product,name, image, price,countInStock, qty, } = req.body;
   
    const dbProduct = await Product.findById(product);

if (!dbProduct) {
    res.status(404);
    throw new Error('Product not found');
}

if (dbProduct.countInStock === 0) {
    res.status(400);
    throw new Error('Product is sold out');
}

if (qty > dbProduct.countInStock) {
    res.status(400);
    throw new Error(
        `Only ${dbProduct.countInStock} item(s) left in stock`
    );
}

    let cart = await Cart.findOne({ user: req.user._id, });

    if (!cart) {

        cart = await Cart.create({
            user: req.user._id,
            cartItems: [],
        });

    }

    const existItem = cart.cartItems.find(
        item => item.product.toString() === product
    );

    if (existItem) {

        existItem.qty = qty;

    } else {

        cart.cartItems.push({
            product,
            name,
            image,
            price,
          countInStock: dbProduct.countInStock,
            qty,
        });

    }

    await cart.save();

    res.status(200).json(cart);

});



// @desc Remove item
// @route DELETE /api/v1/cart/:id
// @access Private

const removeCartItem = asyncHandler(async (req, res) => {

    const cart = await Cart.findOne({
        user: req.user._id,
    });

    if (!cart) {

        res.status(404);
        throw new Error("Cart not found");

    }

    cart.cartItems = cart.cartItems.filter(
        item => item.product.toString() !== req.params.id
    );

    await cart.save();

    res.json(cart);

});




// @desc Clear cart
// @route DELETE /api/v1/cart
// @access Private

const clearCart = asyncHandler(async (req, res) => {

    const cart = await Cart.findOne({
        user: req.user._id,
    });

    if (cart) {

        cart.cartItems = [];

        await cart.save();

    }

    res.json({
        message: "Cart cleared",
    });

});


export {
    getCart,
    addToCart,
    removeCartItem,
    clearCart,
};