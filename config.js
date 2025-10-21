const mongoose = require('mongoose');


const connect = async()=>{
    
  try
  {
    mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Connected!'));
  }
  catch(error)
  {
    console.log("somthing went wrong...");
  }
}


module.exports = connect