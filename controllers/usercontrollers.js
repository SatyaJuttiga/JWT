import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/user';

const user= mongoose.model('User',UserSchema);

export const register=(req,res) => {
  const newUser = new user(req.body);
  newUser.hashPassword=bcrypt.hashSync(req.body.password,10);
  console.log(newUser);
  newUser.save((err,user) => {
      if(err){
          return res.status(400).send({
              message: err
          });
      }else{
          user.hashPassword = undefined;
          return res.json(user);
      }
  });
}

export const login=(req,res) => {
     user.findOne({
         email:req.body.email
     },(err,user) => {
         if(err) throw err;
         if(!user){
             res.status(401).json({ message:'Authentication failed.No User found!!!'});
         } else if (user){
             if(!user.comparePassword(req.body.password,user.hashPassword)){
                 res.status(401).json({ message:'Authentication failed.Wrong password'});          
         }else {
             return res.json({ token :jwt.sign({ email: user.email,firstname: user.firstname,_id:user.id},'RESTFULAPIs')});
         }
        }
     });
}

/*
export const loginRequired = (req,res,next) => {
    if(req.user){
        next();
    }else{
        return res.status(401).json({ message:'Unauthorized user!!!'});
    }
}
*/
/*
export const partiuser = (req,res,next) => {

    //verify the JWT token generated for the user
    jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
        if(err){
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can send the autorized data 
            res.json({
                message: 'Successful log in',
                authorizedData
            });
            console.log('SUCCESS: Connected to protected route');
        }
   });
}


const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}


export const edit = (req,res,next) => {

    router.delete("/:userId", (req, res, next) => {
        User.remove({ _id: req.params.userId })
          .exec()
          .then(result => {
            res.status(200).json({
              message: "User deleted"
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      });
   
});

*/
