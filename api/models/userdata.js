const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Userdata = new Schema({
    razorpay_user_id: {
        type: String,
        required: true,
        unique: true
    },
    razorpay_mail_id: {
        type: String,
        required: true,
        unique: true
    },
    razorpay_order_id: {
        type: String,
        required: true,
        unique: true
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },




}, {
    timestamps: true
})
module.exports = mongoose.model('use', Userdata)