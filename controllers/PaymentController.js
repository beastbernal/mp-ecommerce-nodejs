class PaymentController {
    constructor(paymentService) {
      this.paymentService = paymentService;
    }
  
    async getMercadoPagoLink(req, res) {
      const { name, price, unit, img } = req.query;
  
      try {
        const checkout = await this.paymentService.createPaymentMercadoPago(
          name,
          price,
          unit,
          img
        );
        console.log(checkout, "checkout response");
        return res.redirect(checkout.init_point);
      } catch (err) {
        res.redirect("/");
        return res.status(500).json({
          error: true,
          msg: "Se produjo un error al usar Mercado Pago"
        });
      }
    }
  
    async webhook(req, res) {
      if (req.method === "POST") {
        let body = "";
        req.on("data", chunk => {
          body += chunk.toString();
        });
        req.on("end", () => {
          console.log("----->", body, "Webhook Success");
          res.end("ok");
        });
      }
      return res.status(201);
    }
  }
  
  module.exports = PaymentController;