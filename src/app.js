import express from 'express';
import configviewEngine from './configs/viewEngine';
const path = require('path');
require('dotenv').config()

const app = express();
const port = process.env.port || 3000 ;

configviewEngine(app);

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/profile', (req, res) => {
	res.send('I`m Quang')
  })
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})