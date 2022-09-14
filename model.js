const mongoose = require('mongoose')

const BrandName = mongoose.Schema({
    brandname: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const userdetails = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    }
})

const login = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const brandname = mongoose.model('brandname', BrandName)
const userdetailss = mongoose.model('userdetails', userdetails)
const Login = mongoose.model('Login', login)


module.exports = {
    brandname, userdetailss, Login
}