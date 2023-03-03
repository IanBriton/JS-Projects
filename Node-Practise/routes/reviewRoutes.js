const express = require("express");
const Review = require("../model/review");
const router = express();
const reviewController = require("../controller/reviewController");

router.get("/users/contact-us", reviewController.review_create_get);
router.get("/users/myusers", reviewController.review_index);
router.get("/myusers/:id", reviewController.review_details);
router.post("/myusers", reviewController.review_create_post);
router.delete("/myusers/:id", reviewController.review_delete);

module.exports = router;