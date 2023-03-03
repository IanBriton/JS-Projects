const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const reviewRoutes = require("./routes/reviewRoutes");
//Express App
const app = express();

//Connect to MongoDB
const dbURI =
    "mongodb+srv://Dantez:123Dan45@cluster0.kfxupxp.mongodb.net/User-Reviews?retryWrites=true&w=majority";

mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err);
    });
//register view engines
app.set("view engine", "ejs");

//Middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//Routes
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

//review routes
app.use(reviewRoutes);

//404
app.use((req, res) => {
    // res.sendFile("./views/404.html", { root: __dirname });
    res.status(404).render("404", { title: "Not Found" });
});