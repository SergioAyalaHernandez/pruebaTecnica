const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HotelSchema = Schema({
    nameHotel: String,
    roomsVip: String,
    roomsPremium: String,
    roomsEstandar: String,
    dateIn: Date,
    dateOut: Date,
    season:String,
    cantPeople: String
});

module.exports = mongoose.model("reservas",HotelSchema);