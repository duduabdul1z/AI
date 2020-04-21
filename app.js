const express = require('express');

const app = express();   


app.set('view engine' , 'ejs');
app.use(express.static(__dirname + '/public'));
app.use (express.json());
app.use (express.urlencoded({extended:false}));


//my root route
app.use('/', require ('./routes/'));

//Serve application on port 5500

const port = 5500;
app.listen(port, ()=>{
    console.log(`Server has started on port ${port}`);
});