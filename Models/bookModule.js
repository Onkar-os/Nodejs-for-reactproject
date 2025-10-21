const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    title :{type:String,unique:true},
    author :{type:String,required:true},
    genere :{type:String,required:true},
    price :{type:Number,required:true},
    stock :{type:Number,required:true},
    published_year:{type:Number,required:true}
})
module.exports=mongoose.model("book",productSchema)