const express=require('express');
const app=express();
const path=require('path');
const{v4:uuid}=require('uuid')
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}));
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const cars=
[
    {    id:uuid(),
        brand:'lambo',
    color:'red'
    },

   { id:uuid(),
    brand:'ferrari',
   color:'blue'
    },
]

app.get('/',(req,res)=>
{
    res.send("connected");
});
app.get('/cars',(req,res)=>{
    res.render('home',{cars});
});
app.get('/cars/new',(req,res)=>
{
    res.render('new');
});

app.post('/cars',(req,res)=>
{
        const newcar= 
        {
            id:uuid(),
        ...req.body
        
}
cars.push(newcar);
res.redirect('/cars');
console.log(req.body);
});
 app.get('/sonal/:age/:iphone',(req,res)=>
{
   
    console.log(req.params);
    console.log(req.query);
    const {q}=req.query;
    res.send(`you searched for ${q}`);
})
app.get('/cars/:id',(req,res)=>
{
    const{id}=req.params;
    const fcar=cars.find((c)=>c.id===(id));
    res.render('show',{fcar});
})
app.get('/cars/edit/:id',(req,res)=>
{
    const{id}=req.params;
    const ecar=cars.find((e)=>e.id===(id));
    res.render('edit',{eb:ecar.brand,ec:ecar.color,eid:ecar.id});
})
app.patch('/cars/:id',(req,res)=>{
    const{id}=req.params;
    const updb=req.body.brand;
    const updc=req.body.color;
    const pcar=cars.find((e)=>e.id===(id));
    pcar.brand=updb;
    pcar.color=updc;
    res.redirect('/cars');
   

})
app.listen(3002,(req,res)=>
{
    console.log("server started at 3002");
});
