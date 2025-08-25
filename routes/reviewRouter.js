import express from "express";
import {
  deleteReview,
  getAllReviews,
  getReview,
  insertReview,
  updateReview,
} from "../controllers/reviewController.js";
import { authenticateUser } from "../middleware/authentication.js";

const reviewRouter = express.Router();

reviewRouter.route("/").get(getAllReviews).post(authenticateUser, insertReview);

reviewRouter
  .route("/:id")
  .get(authenticateUser, getReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

export default reviewRouter;
