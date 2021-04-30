const mercadopago = require("mercadopago");

const PaymentController = require("./controllers/PaymentController");
const PaymentService = require("./services/PaymentService");
const PaymentInstance = new PaymentController(new PaymentService());

var express = require("express");
var exphbs = require("express-handlebars");
var port = process.env.PORT || 3000;

var app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("assets"));

app.use("/assets", express.static(__dirname + "/assets"));

/**
 * GET
 */

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/error", (req, res) => {
  res.render("error");
});

app.get("/pending", (req, res) => {
  res.render("pending");
});

app.get("/success", (req, res) => {
  res.render("success", req.query);
});

/**
 * POST
 */

app.post("/payment/new", (req, res) =>
  PaymentInstance.getMercadoPagoLink(req, res)
);

app.post("/webhook", (req, res) => PaymentInstance.webhook(req, res));

app.listen(port);
