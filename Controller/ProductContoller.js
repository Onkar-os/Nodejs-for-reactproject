const connect = require("../config");
const product = require("../Models/ProductModule")

connect()

exports.addproduct = async(req,res)=>{
    try
    {
        const obj = new product(req.body);
        await obj.save()
        res.status(201).json({message:"Product Created Successfull"})
    }
    catch(error)
    {
        console.error("VALIDATION ERROR:", error.message); 
        res.status(500).json({ message: "Not created", error: error.message });    }
}

exports.getproducts=async(req,res)=>{
    try{
        const allProducts=await product.find({})
        res.status(200).json({allProducts})
    }
    catch(error)
    {
        res.status(404).json({message:error.message})
    }
}


exports.deleteproduct = async(req,res)=>{
    try{
        console.log("hello")
        const p = await product.findByIdAndDelete(req.params._id);
        if(!p)
        {
            res.status(404).json({message:"product not founnd"});
        }
        res.status(200).json({message:"Product Deleted succefully"})
    }
    catch(error)
    {
        res.status(500).json({error:error.message})
    }
}


exports.updateproduct = async(req,res)=>{
    try{
        const p = await product.findByIdAndUpdate(req.params._id,req.body);
        if(!p)
        {
            res.status(404).json({message:"product not founnd"});
        }
        res.status(200).json({message:"Product updated  succefully"})
    }
    catch(error)
    {
        res.status(500).json({error:error.message})
    }
}
exports.getproductById =async(req,res)=>{
    try{
        const p=await product.findById(req.params._id)
        if(!p){
            res.status(404).json({message:"product not found"})
        }
        res.status(200).json({p})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

exports.getproductByCategory =async(req,res)=>{
    try{
        const p=await product.find({category:req.params.category})
        if(!p){
            res.status(404).json({message:"product not found"})
        }
        res.status(200).json({p})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}
