const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
app.use(bodyParser.json());

//routes
const user = require('./routes/user');
// app.use('/employee',employee);
app.use(cors());
app.use('/user',user);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    });
}


const uri = 'mongodb+srv://sukhman:Demo@123@cluster0-01umk.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri,
{
    useNewUrlParser: true,
    useFindAndModify: false
},(err)=>{
    if(err){
        process.exit(1);
        console.log('unable to connect to database');
    }
    else
        console.log('successfully connected to the database');
});

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('app is running');
});