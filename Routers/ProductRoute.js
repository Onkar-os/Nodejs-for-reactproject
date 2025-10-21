const express = require('express');
 const app = express();
 const route = express.Router();
 const pc = require('../Controller/ProductContoller');


route.post("/",pc.addproduct);
route.get("/",pc.getproducts);
route.delete("/:_id",pc.deleteproduct);
 route.put("/:_id",pc.updateproduct);
route.get("/:_id",pc.getproductById);
route.get("/getcategory/:category",pc.getproductByCategory)

 module.exports = route;