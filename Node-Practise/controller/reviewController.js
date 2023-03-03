const Review = require("../model/review");
// review_index, review_details. review_create_get, review_create_post, review_delete

const review_index = (req, res) => {
    Review.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render("myusers", { title: "All Reviews", users: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

const review_details = (req, res) => {
    const id = req.params.id;
    Review.findById(id)
        .then((result) => {
            res.render("details", { review: result, title: "User Reivews" });
        })
        .catch((err) => {
            res.status(404).render("404", { title: "Review not found" });
        });
};

const review_create_get = (req, res) => {
    res.render("contact-us", { title: "Contact-us" });
};

const review_create_post = (req, res) => {
    const review = new Review(req.body);

    review
        .save()
        .then((result) => {
            res.redirect("/");
            // res.json(result);
        })
        .catch((err) => {
            res.json({ msg: err });
        });
};

const review_delete = (req, res) => {
    const id = req.params.id;
    Review.findByIdAndDelete(id)
        .then((result) => {
            res.json({
                redirect: "/users/myusers",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = {
    review_index,
    review_details,
    review_create_get,
    review_create_post,
    review_delete,
};