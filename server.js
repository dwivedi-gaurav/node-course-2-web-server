const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000;    //PORT used by heroku

var app=express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{       // methods registered as helper can be accessed from all views without passing it from the route
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
app.set('view engine','hbs');

//Middlewares
app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('Unable to log the details.');
    }
  });
  next();
});
// app.use((req,res,next)=>{
//   res.render('maintenance');
// });
app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
  res.render('home',{
    pageTitle:'Home Page',
    msg:'Welcome...Welcome'
  });
});

app.get('/about',(req,res)=>{
  res.render('about',{
    pageTitle:'About Page',
  });
});



app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
