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

app.get('/restaurants', function(req, res){
    const filePath = path.join(__dirname, 'views', 'restaurants.html')
    res.sendFile(filePath);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})