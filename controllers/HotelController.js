var validator = require("validator");
var Hotel = require("../models/hotel");

var controller ={
    save:function(req,res){
        console.log(req);
        var params = req.body;
        var validateName = !validator.isEmpty(params.nameHotel);
        var validatedateIn = !validator.isEmpty(params.dateIn);
        var validatedateOut = !validator.isEmpty(params.dateOut);
        var validateSeason = !validator.isEmpty(params.season);
        var validateCantPeople = !validator.isEmpty(params.cantPeople);
        
        
        if(validateName && validatedateIn && validatedateOut && validateCantPeople && validateSeason){
            var hotel = new Hotel();
            hotel.nameHotel = params.nameHotel;
            hotel.roomsVip = params.roomsVip;
            hotel.roomsPremium = params.roomsPremium;
            hotel.roomsEstandar = params.roomsEstandar;
            hotel.dateIn = params.dateIn;
            hotel.dateOut = params.dateOut;
            hotel.season = params.season;
            hotel.cantPeople = params.cantPeople;
            hotel.save((err,hotelStored)=>{
                if(err || !hotelStored){
                    return res.status(404).send({
                        message:"Error al guardar el hotel",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"hotel guardado"
                });
            });
        }else{
            return res.status(404).send({
                message:"faltan parametros"
            });
        }
    },

    update:function(req,res){
        var params = req.body;
        var hotelId = req.params.id;
        var validateName = !validator.isEmpty(params.nameHotel);
        var validatedateIn = !validator.isEmpty(params.dateIn);
        var validatedateOut = !validator.isEmpty(params.dateOut);
        var validateSeason = !validator.isEmpty(params.season);
        var validateRates = !validator.isEmpty(params.rates);
        var validateCantPeople = !validator.isEmpty(params.cantPeople);
        
        if(validateName && validatedateIn && validatedateOut && validateRates && validateCantPeople && validateSeason){
            var update = {
                nameHotel:params.nameHotel,
                dateIn:params.dateIn,
                dateOut:params.dateOut,
                rates:params.rates,
                season:params.season,
                cantPeople:params.cantPeople
            }
            console.log(update);
            Hotel.findOneAndUpdate({_id:hotelId},update,{new:true},(err,hotelUpdate)=>{
                if(err){
                    return res.status(500).send({
                        message:"faltan parametros del hotel",
                        status:"error"
                        });
                }
                if(!hotelUpdate){
                    return res.status(400).send({
                        message:"hotel no actualizado",
                        status:"error"
                        });
                }
                return res.status(200).send({
                    message:"hotel actualizado",
                    status:"success",
                    hotelUpdate
                    });
            });          
            
        }else{
            return res.status(404).send({
            message:"faltan parametros"
            });

        }
        
    },

    eliminar:function(req,res){
        var hotelId = req.params.id;
        Hotel.findOneAndDelete({_id:hotelId},(err,hotelRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                });
            }

            if(!hotelRemoved){
                return res.status(404).send({
                    message:"hotel no eliminado",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"hotel Eliminado exitosamente"
            });
        })
        
    },

    listarHoteles:function(req,res){
        Hotel.find(function(err,hotel){
            return res.status(200).send({
                message:"Hoteles",
                hotel
            });        
        });
    },
    mostrarHotel:function(req,res){
        var params = req.body;
        var hotelId = req.params.id;
        console.log(hotelId);
        Hotel.findById(hotelId).exec((err,hotel)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en el id",
                    status:"error"
                    });
            }
            if(!hotel){
                return res.status(400).send({
                    message:"hotel no encontrado",
                    status:"error"
                    });
            }
            return res.status(200).send({
                message:"hotel solicitado",
                hotel
            });
        });
       
    },
}

module.exports = controller;