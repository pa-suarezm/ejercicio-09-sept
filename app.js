const MongoClient = require("mongodb").MongoClient;
const express = require("express");

const app = express();
var conn = MongoClient.connect("mongodb://localhost:27017",
{useNewUrlParser: true, useUnifiedTopology: true});

function getStudents(cllBack){
    conn.then((client) => {
        client.db("poblaciones").collection("paises").find({}).toArray((err, data) => {
            cllBack(data);
        });
    });
}

app.get("/countries", (req, res) => {
    getStudents((data) => {
        res.json(data)
    });
});

app.get("/countries", (req, res) => {

});

app.listen(8080);