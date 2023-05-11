const express = require('express');
const app = express();
// require('dotenv').config();
const PORT = process.env.PORT || 3000;
// enable CORS for FCC
const cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/', (req, res, next) => {

  date = new Date();
  unix = Date.parse(date);
  utc = date.toUTCString();

  res.json({ unix: Date.parse(date), utc: date.toUTCString() })
})

app.get('/api/:date', (req, res, next) => {

  if(new Date(req.params.date) == "Invalid Date"){
    if(!req.params.date.includes("-")){
      let unix=parseInt(req.params.date);
      res.json({
        unix: unix,
        utc: new Date(unix).toUTCString()
    })
    }else{
          res.json({ error: "Invalid Date" })
    }
  }else{
        res.json({
      unix: Date.parse(new Date(req.params.date)),
      utc: new Date(req.params.date).toUTCString()
    })
  }
})


// listen for requests :)
app.listen(PORT, function () {
  console.log('Your app is listening on port ' + process.env.PORT);
});
