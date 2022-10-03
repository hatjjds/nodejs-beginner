import express from "express";
import homeController from "../controller/homeController";

let router=express.Router();

const initWebRoute = (app )=>{
    router.get('/',homeController.getHomePage);
    router.get('/detail/user/:userId',homeController.getDetailPage);
    router.post('/create/user',homeController.getCreateUserPage);
    router.post('/delete-user',homeController.getDeletePage);

    return app.use('/',router);
}

export default initWebRoute;