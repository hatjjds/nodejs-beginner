import express from 'express';
import configviewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRouter from './route/api';
var morgan = require('morgan')
require('dotenv').config()

const app = express();
const port = process.env.port || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined'))

configviewEngine(app);
initWebRoute(app);
initAPIRouter(app);


app.use((req,res)=>{
  return res.render('404.ejs');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})