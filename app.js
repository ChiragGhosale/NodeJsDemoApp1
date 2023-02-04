const path=require('path');
const express=require('express');
const ejs=require('ejs');
const bodyParser = require('body-parser');
const mysql=require('mysql');
const app=express();

const connection=mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'admin',
    database:'testlinqdatabase' 
})
connection.connect(function(error){
if(error)console.log(error);
else console.log("database connected");

})
//Set view file
app.set('views',path.join(__dirname,'views'));

// set view engine
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/',(req,res)=>{

    let sql="SELECT * FROM  teacher";
    let querry=connection.query(sql,function(err,rows){
        if(err)
        {
        throw err;

        }
   else
         {
    res.render('user_index',{
        title:'Crud Operation',
        action:'list',
        sampledata:rows
        });
         }   
    });
});

app.get('/add',(req,res)=>{
    res.render('user_add',{
        title:'Crud Operation'
        });
});

app.post('/save',(req,res)=>{
let data={SrNo : req.body.SrNo, TeacherId : req.body.TeacherId, TeacherName : req.body.name, Qualification : req.body.Qualification, subject: req.body.Subject};
let sql="Insert Into teacher SET ?";
let query=connection.query(sql,data,(err,results)=>{
    if(err)throw err;   
});
res.redirect('/');
});

//server listening
app.listen(3000,()=>{

    console.log('server is running at port 3000');

}); 


