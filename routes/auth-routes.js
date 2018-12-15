import express from 'express';
import { login,register,loginRequired } from '../controllers/usercontrollers';


const routes = (app) => {
    //app.route('/user')
    //.get(allusers);

    app.route('/user')
    .post(register);

    app.route('/login')
    .post(login);
}
   

export default routes;
