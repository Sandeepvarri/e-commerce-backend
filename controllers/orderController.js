import { StatusCodes } from "http-status-codes";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import BadRequestError from "../errors/badRequestError.js";
import { checkPermissions } from "../utils/checkPermissions.js";

export const createOrder = async (req, res) => {
  const { orderItems = [] } = req.body;

  if (!orderItems || orderItems.length < 1) {
    throw new BadRequestError("No order items provided");
  }

  let finalOrderItems = [];
  let finalTotalAmount = 0;

  for (const order of orderItems) {
    const { product: productId, quantity } = order;
    if (!productId) {
      throw new BadRequestError(
        `Product is not present for one of the order item`
      );
    }
    if (quantity < 1) {
      throw new BadRequestError(`Quantity should be atleast one`);
    }
    const dbproduct = await Product.findOne({ _id: productId });
    if (!dbproduct) {
      throw new BadRequestError(`No product found with Id ${productId}`);
    }
    if (!dbproduct.stock) {
      throw new BadRequestError(
        `Product ${dbproduct.name} is out of stock, please remove to continue`
      );
    }
    const totalAmount = dbproduct.price * quantity;
    const orderItem = {
      ...order,
      productName: dbproduct.name,
      productPrice: dbproduct.price,
      totalAmount,
      imageUrl: dbproduct.imageUrl,
    };
    finalOrderItems = [...finalOrderItems, orderItem];
    finalTotalAmount += totalAmount;
  }

  const finalOrder = {
    user: req.user.userId,
    orderItems: finalOrderItems,
    totalAmount: finalTotalAmount,
  };

  const dbOrder = await Order.create(finalOrder);

  res.status(StatusCodes.CREATED).json({ order: dbOrder });
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find({});

  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

export const getSingleOrder = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("Please provide order id");
  }

  const order = await Order.find({ _id: id });

  checkPermissions(req.user, order.user);

  if (!order) {
    throw new BadRequestError(`No order found with Id ${id}`);
  }

  res.status(StatusCodes.OK).json({ order });
};

export const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });

  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findOne({ _id: id });

  if (!order) {
    throw new BadRequestError(`No order found with Id ${id}`);
  }

  const { status } = req.body;

  order.status = status;
  await order.save();

  res.status(StatusCodes.OK).json({ order });
};

export const cancelOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findOne({ _id: id });

  if (!order) {
    throw new BadRequestError(`No order found with Id ${id}`);
  }

  checkPermissions(req.user, order.user);

  order.status = "cancelled";
  await order.save();

  res.status(StatusCodes.OK).json({ order });
};
