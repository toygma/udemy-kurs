import { Router } from "express";
import reviewController from "../controllers/review.controller"; 
import { isAuthenticatedUser } from "../middlewares/auth.middleware"; 

const reviewRouter = Router();


reviewRouter.get("/:doctorId", reviewController.getAllReviews);

reviewRouter.post("/:doctorId", isAuthenticatedUser, reviewController.createReview);

reviewRouter.delete("/:reviewId", isAuthenticatedUser, reviewController.deleteReview);

reviewRouter.put("/:reviewId", isAuthenticatedUser, reviewController.updateReview);


export default reviewRouter;