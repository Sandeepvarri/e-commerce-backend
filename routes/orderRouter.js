import express from "express";
import {
  cancelOrder,
  createOrder,
  getAllOrders,
  getCurrentUserOrders,
  getSingleOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import {
  adminAuthorization,
  authenticateUser,
} from "../middleware/authentication.js";

const orderRouter = express.Router();

orderRouter
  .route("/")
  .get(authenticateUser, adminAuthorization, getAllOrders)
  .post(authenticateUser, createOrder);

orderRouter.route("/my-orders").get(authenticateUser, getCurrentUserOrders);
orderRouter
  .route("/:id")
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, adminAuthorization, updateOrderStatus);

orderRouter.route("/:id/cancel").patch(authenticateUser, cancelOrder);

export default orderRouter;
