//now here I am going to crate schema 
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let Book=new Schema({
    name:{
        type:String
    },
    price:{
        type:String
    },
    description:{
        type:String
    }
}, { collation: { locale: 'en_US', strength: 1 }}
/* {
    collation:'books'
} */
)


// dont forget to export module...
module.exports=mongoose.model('Books',Book)