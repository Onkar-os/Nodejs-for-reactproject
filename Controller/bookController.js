const { json } = require("express");
const connect = require("../config");
const book = require("../Models/bookModule")

connect()

exports.addbook=async(req,res)=>{
     try
        {
            const obj = new book(req.body);
            await obj.save()
            res.status(201).json({message:"book Created Successfull"})
        }
        catch(error)
        {
            res.status(500).json({message:error.message});
        }
}


exports.getbooks=async(req,res)=>{
    try{
        const allbooks=await book.find({})
        res.status(200).json({allbooks})
    }
    catch(error)
    {
        res.status(404).json({message:error.message})
    }
}

exports.deletebook = async(req,res)=>{
    try{
        const p = await book.findByIdAndDelete(req.params._id);
        if(!p)
        {
            res.status(404).json({message:"book not founnd"});
        }
        res.status(200).json({message:"book Deleted succefully"})
    }
    catch(error)
    {
        res.status(500).json({error:error.message})
    }
}

exports.updatebook = async(req,res)=>{
    try{
        const p = await book.findByIdAndUpdate(req.params._id,req.body);
        if(!p)
        {
            res.status(404).json({message:"book not founnd"});
        }
        res.status(200).json({message:"book updated  succefully"})
    }
    catch(error)
    {
        res.status(500).json({error:error.message})
    }
}
exports.getbookById =async(req,res)=>{
    try{
        const p=await book.findById(req.params._id)
        if(!p){
            res.status(404).json({message:"book not found"})
        }
        res.status(200).json({p})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

exports.getbookByAuthor =async(req,res)=>{
    try{
        const p=await book.find({author:req.params.author})
        if(!p){
            res.status(404).json({message:"book not found"})
        }
        res.status(200).json({p})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}
exports.getbookByTitle=async(req,res)=>{
    try{
        const p=await book.find({title:req.params.title})
        if(!p){
            res.status(404).json({message:"book with this title not found"})
        }
        res.status(200).json({p})
    }
    catch(error){
        res.status(500),json({error:error.message})
    }
}

exports.getMaxPrice = async (req, res) => {
  try {
    const p = await book.findOne().sort({ price: -1 }).limit(1);

    if (!p) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json(p);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.getMinPrice = async (req, res) => {
  try {
    const p = await book.findOne().sort({ price: 1 }).limit(1);

    if (!p) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json(p);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getPriceByascending = async (req, res) => {
  try {
    const p = await book.find().sort({ price: -1 })

    if (!p) {
      return res.status(404).json({ message: "No books found" })
    }

    res.status(200).json(p)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

