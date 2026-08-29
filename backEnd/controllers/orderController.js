import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// @desc     Create new order
// @method   POST
// @endpoint /api/v1/orders
// @access   Private
const addOrderItems = async (req, res, next) => {
  try {
    const {
      cartItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    } = req.body;

    if (!cartItems || cartItems.length === 0) {
      res.statusCode = 400;
      throw new Error('No order items.');
    }

    // Check stock availability before creating order
    for (const item of cartItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        res.status(404);
        throw new Error(`${item.name} not found.`);
      }

      if (product.countInStock < item.qty) {
        res.status(400);
        throw new Error(
          `${product.name} has only ${product.countInStock} item(s) left in stock.`
        );
      }
    }

    const order = new Order({
      user: req.user._id,

      orderItems: cartItems.map(item => ({
        ...item,
        product: item.product
      })),

      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);

  } catch (error) {
    next(error);
  }
};


// @desc     Get logged-in user orders
// @method   GET
// @endpoint /api/v1/orders/my-orders
// @access   Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    if (!orders || orders.length === 0) {
      res.statusCode = 404;
      throw new Error('No orders found for the logged-in user.');
    }

    res.status(200).json(orders);

  } catch (error) {
    next(error);
  }
};


// @desc     Get order by ID
// @method   GET
// @endpoint /api/v1/orders/:id
// @access   Private
const getOrderById = async (req, res, next) => {
  try {
    const { id: orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate('user', 'name email');

    if (!order) {
      res.statusCode = 404;
      throw new Error('Order not found!');
    }

    res.status(200).json(order);

  } catch (error) {
    next(error);
  }
};


// @desc     Update order to paid
// @method   PUT
// @endpoint /api/v1/orders/:id/pay
// @access   Private
const updateOrderToPaid = async (req, res, next) => {
  try {
    const { id: orderId } = req.params;

    const order = await Order.findById(orderId);

    if (order.isPaid) {
    res.status(400);
    throw new Error('Order already marked as paid.');
}

    if (!order) {
      res.statusCode = 404;
      throw new Error('Order not found!');
    }

    order.isPaid = true;
    order.paidAt = new Date();
    for (const item of order.orderItems) {

    const product = await Product.findById(item.product);

    if (!product) continue;

    product.countInStock -= item.qty;

    if (product.countInStock < 0) {
        product.countInStock = 0;
    }

    await product.save();
}

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);

  } catch (error) {
    next(error);
  }
};


// @desc     Update order to delivered
// @method   PUT
// @endpoint /api/v1/orders/:id/deliver
// @access   Private/Admin
const updateOrderToDeliver = async (req, res, next) => {
  try {
    const { id: orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      res.statusCode = 404;
      throw new Error('Order not found!');
    }

    order.isDelivered = true;
    order.deliveredAt = new Date();

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);

  } catch (error) {
    next(error);
  }
};


// @desc     Get all orders
// @method   GET
// @endpoint /api/v1/orders
// @access   Private/Admin
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('user', 'id name');

    if (!orders || orders.length === 0) {
      res.statusCode = 404;
      throw new Error('Orders not found!');
    }

    res.status(200).json(orders);

  } catch (error) {
    next(error);
  }
};


export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliver,
  getOrders
};