import express from "express";
import homeController from "../controller/homeController";

let router=express.Router();

const initWebRoute = (app )=>{
    router.get('/',homeController.getHomePage);
    router.get('/profile',(req,res)=>{
        res.send('Hi Quang')
    });
    router.get('/detail/user/:userId',homeController.getDetailPage);
    router.post('/create/user',homeController.getCreateUserPage);

      return app.use('/',router);
}

export default initWebRoute;