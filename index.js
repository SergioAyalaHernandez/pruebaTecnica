const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const hotel_routes = require("./routes/Hotel");
const port = 8080;
const bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);

app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

const mongoURL = 'mongodb://localhost:27017/hotel';

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error))
.then(() => {
    app.use(express.json())
    app.use("/api/hotel",hotel_routes);
    app.listen(port, () =>{
        console.log("Init in the ", port , "port");
    });
})
.catch(err => console.log(err));
