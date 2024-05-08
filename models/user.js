const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: String,
    cart: [{
        id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref:"products"
        },
        quantity: Number
    }],
    address: {
        house:String, 
        street: String,
        city: String,
        zipcode: String,
        phone: String
    }
})

module.exports = mongoose.model('user',  userSchema);

let users = [
    {
        "name": "John Doe",
        "email": "john@gmail.com",
        "password": "123456789",
        "cart": []
    },
        {
        "name": "Dave Wells",
        "email": "dave@gmail.com",
        "password": "123456789",
        "cart": []
    },
    {
        "name": "Salman",
        "email": "salman@gmail.com",
        "password": "123456789",
        "cart": []
    }
]