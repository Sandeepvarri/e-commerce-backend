import express from "express";
import {
  deleteProduct,
  getAllProducts,
  getProduct,
  insertProduct,
  updateProduct,
} from "../controllers/productController.js";
import {
  adminAuthorization,
  authenticateUser,
} from "../middleware/authentication.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(getAllProducts)
  .post(authenticateUser, adminAuthorization, insertProduct);

productRouter
  .route("/:id")
  .get(getProduct)
  .patch(authenticateUser, adminAuthorization, updateProduct)
  .delete(authenticateUser, adminAuthorization, deleteProduct);

export default productRouter;
