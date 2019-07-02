
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 4000;

const AssitantV1 = require('ibm-watson/assistant/v1');
const assistant = new AssitantV1({ version: '2019-06-01' });

const corsOptions = {
  origin: '*'
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.json());
app.use(express.static(__dirname ));
app.use(cors());

app.post('/conversation/', (req, res) => {
    const { text, context = {} } = req.body;
	res.header("Access-Control-Allow-Origin", "*");
  
    const params = {
        input: { text },
        workspace_id: '1be85fad-abbf-47f2-a479-96b0a1cff1aa',
        context,
    };
  
    assistant.message(params, (err, response) => {
        if (err) {
            console.error(err);
            res.status(500).json(err);
        } else {
            res.json(response);
        }
    });
});

app.get('/conversation/:text*?',(req, res) => {
    console.log(req)
    const { text } = req.params;
	res.header("Access-Control-Allow-Origin", "*");

    res.json(text);
});
app.get('/home', (req,res)=>{
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(port, () => console.log(`Running on port ${port}`));

