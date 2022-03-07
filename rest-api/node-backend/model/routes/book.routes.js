const express=require('express');
const app=express();
const bookRoute=express.Router();
let Book=require('../Book');

bookRoute.route('/add-book').post((req,res,next)=>{
    Book.create(req.body,(error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    });
});


//get all Books from store
bookRoute.route('/').get((req,res)=>{
    Book.find((error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    });
});

//find book by id
bookRoute.route('/read-book/:id').get((req,res)=>{
    Book.findById(req.params.id,(error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    });
});


//update book by id
bookRoute.route('/update-book/:id').put((req,res)=>{
    Book.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },(error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
            console.log("Book updated successfully")
        }
    });
});

//delete by Id
bookRoute.route('/delete-book/:id').delete((req,res)=>{
    Book.findByIdAndRemove(req.params.id,(error,data)=>{
        if(error){
            return next(error)
        }else{
            res.status(200).json({
                msg:data})
            console.log("Book updated successfully")
        }
    });
});

module.exports=bookRoute;