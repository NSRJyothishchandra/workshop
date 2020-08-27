var express = require('express');
var app = express();
var Razorpay = require('razorpay')
var Userdata = require('./models/userdata');
var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/Razor"
var connect = mongoose.connect(url);
connect.then((db) => {
    console.log('succesfully linked to the database')
})
var instance = new Razorpay({
    key_id: 'rzp_live_IaapVsaBh8MIfi',
    key_secret: 'AsY3J8uOr3GFSH13xG7BWDIH',

});

var options = {
    amount: 500, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
    payment_capture: '0',

};

var fs = require('fs')

app.get('/check', (req, res, next) => {

    fs.createReadStream(__dirname + '/public/checkout.html').pipe(res)
    instance.orders.create(options, function(err, order) {
        console.log(order);
    });

})
app.post("/payment/success/", (req, res, next) => {
    Userdata.create(res)
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user)
        }, err => next(err))
        .catch((err) => next(err))
})
app.listen(3000, () => {
    console.log("server started")
})