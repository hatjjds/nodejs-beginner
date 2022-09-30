import express from 'express';
import configviewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
require('dotenv').config()

const app = express();
const port = process.env.port || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configviewEngine(app);
initWebRoute(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})