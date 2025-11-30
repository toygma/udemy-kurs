import { Router } from "express";
import reviewController from "../controllers/review.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";

const reviewsRoute = Router();

reviewsRoute.get("/:doctorId", reviewController.getAllReviews);

reviewsRoute.post(
  "/:doctorId",
  isAuthenticatedUser,
  reviewController.createReview
);

reviewsRoute.delete(
  "/:reviewId",
  isAuthenticatedUser,
  reviewController.deleteReview
);

reviewsRoute.put(
  "/:reviewId",
  isAuthenticatedUser,
  reviewController.updateReview
);


export default reviewsRoute;
