
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 7000;

const AssitantV1 = require('ibm-watson/assistant/v1');
const assistant = new AssitantV1({ version: '2019-06-01' });


app.use(bodyParser.json());
app.use(express.static(__dirname ));

app.post('/conversation/', (req, res) => {
    const { text, context = {} } = req.body;
  
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

app.get('/conversation/:text*?', (req, res) => {
    console.log(req)
    const { text } = req.params;

    res.json(text);
});
app.get('/home', (req,res)=>{
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(port, () => console.log(`Running on port ${port}`));

