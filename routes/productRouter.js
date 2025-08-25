import express from "express";
import {
  deleteProduct,
  getAllProducts,
  getProduct,
  insertProduct,
  updateProduct,
} from "../controllers/productController.js";
import { authenticateUser } from "../middleware/authentication.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(getAllProducts)
  .post(authenticateUser, insertProduct);

productRouter
  .route("/:productId")
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default productRouter;
