import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";
import BadRequestError from "../errors/badRequestError.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.find({}).populate("reviews");
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

export const insertProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  if (!product) {
    throw new BadRequestError(`No product exist with product id ${id}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new BadRequestError(`No product exist with product id ${id}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  if (!product) {
    throw new BadRequestError(`No product exist with product id ${id}`);
  }
  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Sucessfully product removed" });
};
