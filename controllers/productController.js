import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.find({}).populate("reviews");
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

export const insertProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

export const getProduct = (req, res) => {
  res.status(StatusCodes.OK).json({ product: {} });
};

export const updateProduct = (req, res) => {
  res.status(StatusCodes.OK).json({ product: {} });
};

export const deleteProduct = (req, res) => {
  res.status(StatusCodes.OK).json({ product: {} });
};
