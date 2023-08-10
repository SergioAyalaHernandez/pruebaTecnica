var express = require("express");
var hotelController = require("../controllers/HotelController");

var router = express.Router();

router.post("/save",hotelController.save);
router.put("/update/:id",hotelController.update);
router.delete("/delete/:id",hotelController.eliminar);
router.get("/list",hotelController.listarHoteles);
router.get("/mostrarId/:id",hotelController.mostrarHotel)

module.exports = router;