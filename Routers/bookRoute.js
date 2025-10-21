const express=require('express')
const app=express()
const route=express.Router()
const pc=require('../Controller/bookController')

route.post("/",pc.addbook);

route.get("/",pc.getbooks)
route.delete("/:_id",pc.deletebook);
route.get("/maxprice",pc.getMaxPrice)
route.get("/minprice",pc.getMinPrice)
route.put("/:_id",pc.updatebook)
route.get("/:_id",pc.getbookById)
route.get("/getauthor/:author",pc.getbookByAuthor)
route.get("/gettitle/:title",pc.getbookByTitle)

route.get("/ascprice",pc.getPriceByascending)

module.exports=route