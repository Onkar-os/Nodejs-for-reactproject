const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({


    pname :{type:String,unique:true},
    price :{type:Number,required:true,minlength:50},
    category :{type:String,required:true},
    stock :{type:Boolean,required:true},
   orderDate: { type: Date, default: Date.now },
    image:{ type: String ,required:true},
    description :{type:String,required:true}

})

module.exports = mongoose.model("products815",productSchema);