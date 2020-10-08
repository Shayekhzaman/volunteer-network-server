const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors');
const MongoClient = require('mongodb').MongoClient;
require ('dotenv').config();
const ObjectId=require('mongodb').ObjectId;

const port=3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.csq51.mongodb.net/volunteerdb?retryWrites=true&w=majority`;


app.get('/', (req, res) => {
    res.send("hello maybe its work yaa")
})


const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true});
client.connect(err => {
  const registration = client.db("volunteerdb").collection("task");
 console.log("database connected");
  
app.post('/addRegistration', (req, res) =>{
    const newRegistration= req.body;
    registration.insertOne(newRegistration)
    .then(result =>{
        res.send(result.insertedCount > 0);
    })
    console.log(newRegistration);
})

app.get('/registration', (req, res) =>{
    registration.find({email: req.query.email})
    .toArray( (err, documents) =>{
        res.send(documents);
    })

})

app.get('/volunteerList', (req, res) => {
    registration.find({})
    .toArray( (err, documents) => {
        res.send(documents);
    })
})

app.delete('/delete/:id', (req, res) =>{
    registration.deleteOne({ _id: ObjectId (req.params.id)})
    .then((result) =>{
        console.log(result);
    })
})
 

});


app.listen(process.env.PORT || port);