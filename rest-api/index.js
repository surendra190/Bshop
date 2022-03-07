//Now I am going to create Connection code...

//const bodyParser = require('body-parser');
let express=require('express');
//const { default: mongoose } = require('mongoose');
path= require('path');
mongoose=require('mongoose');
cors=require('cors');
const bodyParser = require('body-parser');
mongoDb=require('./database/db');


mongoose.Promise=global.Promise;
mongoose.connect(mongoDb.db,{ 
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(()=>{
     console.log("Database successfully connected..")
},
error=>{
    console.log('Databse Error : '+error)
}
)


const bookRoute=require("./node-backend/model/routes/book.routes");
const app =express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(cors());
app.use(express.static(path.join(__dirname,'dist/Bookstore')));
app.use('/api',bookRoute);
const port=process.env.port || 8000;
app.listen(port,()=>{
    console.log("Listening Port On: "+port);
})


app.use((req,res,next)=>{
    next(createError(404));
});

app.get('/',(req,res)=>{
    res.send('Invalid Endpoint');
});

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/Bookstore/index.html'));

});

app.use(function(err,req,res,next){
    console.error(err.message);
    if(!err.statusCode)err.statusCode=500;
    res.status(err.statusCode).send(err.message);
});



