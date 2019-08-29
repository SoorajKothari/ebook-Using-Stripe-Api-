const express = require('express');
const stripe = require('stripe')('st_test key here put yours sk_test stripe key here');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();


//handle bar middleware

app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine','handlebars');

//Body parser middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



//set static folder
app.use(express.static(`${__dirname}/public`));

//index route

app.get('/', (req,res)=>{
    res.render('index');
});


//charge route
app.post('/charge', (req,res) => {
    const amount = 1500;
    stripe.customers.create({
        email:req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description:'Sooraj ebook',
        currency :'usd',
        customer:customer.id
    }))
    .then(charge => res.render('success'));
});

const port = process.env.Port || 3000;


app.listen(port, ()=>{
    console.log('Server start on port ${port}');
});