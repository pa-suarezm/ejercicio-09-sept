const MongoClient = require("mongodb").MongoClient;
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var conn = MongoClient.connect("mongodb://localhost:27017",
{useNewUrlParser: true, useUnifiedTopology: true});

function getCountries(cllBack){
    conn.then((client) => {
        client.db("poblaciones").collection("paises").find({}).toArray((err, data) => {
            cllBack(data);
        });
    });
}

function getCountry(nombre, cllBack){
    conn.then((client) => {
        client.db("poblaciones").collection("paises").find({country: `${nombre}`}).toArray((err, data) => {
            cllBack(data);
        });
    });
}

function postCountry(datosJSON, cllBack){
    conn.then((client) => {
        client.db("poblaciones").collection("paises").insertOne(datosJSON, cllBack());
    });
}

function putCountry(nombre, datosJSON, cllBack){
    conn.then((client) => {
        client.db("poblaciones").collection("paises").updateOne({country: `${nombre}`}, { $set: datosJSON}, cllBack());
    });
}

function deleteCountry(nombre, cllBack){
    conn.then((client) => {
        client.db("poblaciones").collection("paises").deleteOne({country: `${nombre}`}, (err, obj) => {
            if(err)
                throw err;
            console.log(`Deleted ${nombre}`);
            cllBack();
        });
    });
}

app.get("/countries", (req, res) => {
    console.log("GET all countries");
    getCountries((data) => {
        res.json(data);
    });
});

app.get("/countries/:id", (req, res) => {
    var id = req.params.id;
    console.log(`GET country ${id}`);
    getCountry(id, (data) => {
        res.json(data);
    });
});

app.post("/countries", (req, res) => {
    var rawBody = req.body;
    console.log(`POST country ${rawBody.country}`);
    postCountry(rawBody, () => {
        getCountry(rawBody.country, (data) => {
            res.json(data);
        })
    });
});

app.put("/countries/:id", (req, res) => {
    var id = req.params.id;
    var rawBody = req.body;
    console.log(`PUT country ${id}`);
    putCountry(id, rawBody, () => {
        getCountry(id, (data) => {
            res.json(data);
        })
    });
});

app.delete("/countries/:id", (req, res) => {
    var id = req.params.id;
    console.log(`DELETE country ${id}`);
    deleteCountry(id, () => {
        getCountries((data) => {
            res.json(data);
        });
    });
});

app.listen(8080);