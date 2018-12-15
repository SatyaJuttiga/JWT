import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import routes from './routes/auth-routes';
import jwt from 'jsonwebtoken';
import User from './models/user';
//import rjwt from 'restify-jwt-community';
 const app=express();

const PORT=process.env.PORT || 5000;
 //const JWT_SECRET='secret1';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/jwt');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use((req,res,next) =>{
    if(req.headers && req.headers.authorization && req.headers.authorization.split('')[0] === 'JWT')
    {
        jsonwentoken.verify(req.headers.authorization.split('')[1],'RESTFULAPIs',(err,decode) => {
            if(err)req.user = undefined;
            req.user =decode;
            next();
        });
    }else{
        req.user = undefined;
        next();
    }
});

//app.use(rjwt({ secret : JWT_SECRET }).unless({ path: ['/auth-routes']} ));


routes(app);

app.listen(PORT,function(req,res){
    console.log(`server started on port  ${PORT}`);
});
