const express = require('express')
const path = require("path");
const app = express()
const port = 3000
app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get('/', function(req, res){
    const filePath = path.join(__dirname, 'views', 'index.html')
    res.sendFile(filePath);
});

app.get('/hello-contract', function(req, res){
  const filePath = path.join(__dirname, 'views', 'hello-contract.html')
  res.sendFile(filePath);
})

app.get('/hellopage', function(req, res){
    const filePath = path.join(__dirname, 'views', 'hellopage.html')
    res.sendFile(filePath);
})

app.get('/agriculture', function(req, res){
  const filePath = path.join(__dirname, 'views', 'agriculture.html')
  res.sendFile(filePath);
})

// app.get('/newpage', function(req, res){
//     const filePath = path.join(__dirname, 'views', 'hellopage.html')
//     res.sendFile(filePath);
// })

app.listen(port, () => {
  console.log(`My First Dapp listening on port ${port}`)
})