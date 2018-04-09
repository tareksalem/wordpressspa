const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
var upload = multer({dest: "uploads"});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/blogs", function (req, res) {
    console.log(req.url);
});
app.post("/about", upload.single("userImg"), function (req, res) {
    // if (req.headers.ajax) {
    //     console.log(req.headers);
    //     res.json({msg: "hello"});
    // } else {
    //     res.sendFile(path.join(__dirname, "public/html/index.html"));
    // }
    console.log(req.headers);
    console.log(req.body);
    console.log(req.file);
});
app.use("*", function (req, res) {
    if (!req.headers.ajax) {
        res.sendFile(path.join(__dirname, "public/html/index.html"));
    } else {
        res.status(404).send("error");
    }
});
app.listen(port);
