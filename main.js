import express from 'express';
import path from 'node:path';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(import.meta.dirname, 'views', 'index.html'));
});

app.post('/submit', (req, res) => {
  const wgt = Number(req.body.weight);  
  const hgt = Number(req.body.height);

  if (
    req.body.weight === '' || 
    req.body.height === '' || 
    isNaN(wgt) || 
    isNaN(hgt)
  ) {
    return res.status(400).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="/static/css/styles.css">
    </head>
    <body>
      <h1>Please enter valid numbers.</h1>
    </body>
    </html>
    `);
  }

  const cal = (wgt, hgt) => (wgt/(hgt**2)) *10000;
  const bmi = cal(wgt,hgt).toFixed(1);
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="/static/css/styles.css">
    </head>
    <body>
      <h1>Hello, Your BMI is... ${bmi}</h1>
    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
